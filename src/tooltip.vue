<template>
  <slot />

  <teleport v-if="ready" to="#v-overlay">
    <transition appear>
      <div class="v-tooltip" :class="{ plain }" v-if="style" :style="style" ref="tooltip">
        <span v-if="text">{{ text }}</span>
        <slot v-else name="tooltip" />
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
    plain: { type: Boolean, default: false },
    delay: { type: Number, default: 50 },
    visible: { type: Boolean, default: null },
  },

  data() {
    nextTick(() => {
      this.ready = true;
    });

    return {
      style: null,
      ready: false,
    };
  },

  inject: ['tooltip'],

  mounted() {
    this.timeout = -1;

    this.node = this.$el;
    while (this.node.nodeType == Node.TEXT_NODE)
      this.node = this.node.nextSibling;

    this.node.addEventListener('mouseenter', this.show);
    this.node.addEventListener('mouseleave', this.hide);
  },

  beforeUnmount() {
    this.style = null;
    this.tooltip.body = null;
    this.tooltip.style = null;
  },

  watch: {
    visible(v) {
      if (v) {
        this.show();
      } else {
        this.hide();
      }
    },
  },

  methods: {
    show(e) {
      if (e && typeof this.visible == 'boolean') return;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        let box = this.node.getBoundingClientRect();

        if (this.left) {
          this.style = {
            'top': `${box.top + box.height / 2}px`,
            'right': `${window.innerWidth - box.left}px`,
            'transform': `translateY(-50%) translate(0, 0)`,
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
      }, this.delay);
    },

    hide(e) {
      if (e && typeof this.visible == 'boolean') return;
      this.style = null;
      clearTimeout(this.timeout);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-tooltip {
  z-index: 2;

  position: absolute;
  pointer-events: none;

  font-size: 1 * $text-unit;

  &:not(.plain) {
    margin: 2 * $unit;
    padding: 2 * $unit 4 * $unit;
    border-radius: 4px;

    color: white;
    background-color: fade-out(#555, 0.05);
  }

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
