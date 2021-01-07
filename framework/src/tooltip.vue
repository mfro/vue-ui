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
import { nextTick, watchEffect } from 'vue';

export default {
  name: 'v-tooltip',

  props: {
    text: { type: String, default: null },
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
      this.style = {
        top: `${box.bottom}px`,
        left: `${box.left + box.width / 2}px`,
      };
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
  margin-top: 2 * $unit;

  position: absolute;
  transform: translateX(-50%);

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
