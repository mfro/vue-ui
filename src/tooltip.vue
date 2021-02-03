<template>
  <slot />

  <teleport v-if="ready" to="#v-overlay">
    <transition appear>
      <div class="v-tooltip" v-if="visible" :style="style">
        <span>{{ text }}</span>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { nextTick } from 'vue';

export default {
  name: 'v-tooltip',

  props: {
    text: { type: String, default: null },
    left: { type: Boolean, default: null },
    right: { type: Boolean, default: null },
    bottom: { type: Boolean, default: null },
  },

  data() {
    nextTick(() => {
      this.ready = true;
    });

    return {
      ready: false,
      visible: false,
    };
  },

  inject: ['tooltip'],

  mounted() {
    let node = this.$el;
    while (node.nodeType == Node.TEXT_NODE)
      node = node.nextSibling;

    node.addEventListener('mouseenter', e => {
      let box = node.getBoundingClientRect();

      this.visible = true;
      if (this.left) {
        this.style = {
          'top': `${box.top + box.height / 2}px`,
          'right': `${window.innerWidth - box.left}px`,
          'transform': `translateY(-50%)`,
          'margin-top': `0`,
          'margin-left': `0`,
          'margin-bottom': `0`,
        };
      } else if (this.right) {
        this.style = {
          'top': `${box.top + box.height / 2}px`,
          'left': `${box.right}px`,
          'transform': `translateY(-50%)`,
          'margin-top': `0`,
          'margin-right': `0`,
          'margin-bottom': `0`,
        };
      } else {
        this.style = {
          'top': `${box.bottom}px`,
          'left': `${box.left + box.width / 2}px`,
          'transform': `translateX(-50%)`,
          'margin-left': `0`,
          'margin-right': `0`,
          'margin-bottom': `0`,
        };
      }
    });

    node.addEventListener('mouseleave', () => {
      this.visible = false;
      this.style = null;
    });
  },

  beforeUnmount() {
    this.visible = false;
    this.tooltip.body = null;
    this.tooltip.style = null;
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-tooltip {
  z-index: 2;

  margin: 2 * $unit;

  position: absolute;

  padding: 2 * $unit 4 * $unit;
  border-radius: 4px;

  color: white;
  background-color: fade-out(#555, 0.15);

  font-size: 1 * $text-unit;
  font-family: Roboto;

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
  }

  &.v-enter-to,
  &.v-leave-from {
    opacity: 1;
  }

  &.v-enter-active,
  &.v-leave-active {
    transition: opacity 200ms;
  }
}
</style>
