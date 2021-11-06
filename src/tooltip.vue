<template>
  <slot />

  <teleport v-if="ready" to="#v-overlay">
    <transition appear>
      <div class="v-tooltip" v-if="visible" :style="style" ref="tooltip">
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
    top: { type: Boolean, default: null },
    left: { type: Boolean, default: null },
    right: { type: Boolean, default: null },
    bottom: { type: Boolean, default: null },
  },

  data() {
    nextTick(() => {
      this.ready = true;
    });

    return {
      style: {},
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
      } else if (this.top) {
        this.style = {
          'bottom': `${-box.top}px`,
          'left': `${box.left + box.width / 2}px`,
          'transform': `translateX(-50%)`,
          'margin-top': `0`,
          'margin-left': `0`,
          'margin-right': `0`,
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

      this.$nextTick(() => {
        const box = this.$refs.tooltip.getBoundingClientRect();

        if (this.left || this.right) {
          let fudge;
          if (box.top < 0) fudge = -box.top;
          else if (box.bottom > window.innerHeight) fudge = window.innerHeight - box.bottom;
          else return;

          this.style.transform += ` translateY(${fudge}px)`;
        } else {
          let fudge;
          if (box.left < 0) fudge = -box.left;
          else if (box.right > window.innerWidth) fudge = window.innerWidth - box.right;
          else return;

          this.style.transform += ` translateX(${fudge}px)`;
        }
      });
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
  background-color: fade-out(#555, 0.05);

  font-size: 1 * $text-unit;

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
