<template>
  <teleport v-if="doTeleport" to="#v-overlay">
    <transition :appear="!skipAnimation" @after-leave="doTeleport = false">
      <div v-if="modelValue" class="v-dialog" @click="onClick">
        <v-flex
          align-center
          justify-center
          class="dialog-container"
          ref="container"
        >
          <slot />
        </v-flex>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { shallowRef, watchEffect } from 'vue';

export default {
  name: 'v-dialog',

  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Boolean, default: false },
    persistent: { type: Boolean, default: false },
    skipAnimation: { type: Boolean, default: false },
  },

  setup(props) {
    let doTeleport = shallowRef(false);

    watchEffect(() => {
      if (props.modelValue) {
        doTeleport.value = true;
      }
    });

    return {
      doTeleport,
    };
  },

  methods: {
    onClick(e) {
      if (e.target == this.$refs.container?.$el) {
        this.$emit('update:modelValue', false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

.v-dialog {
  position: absolute;
  background-color: fade-out(#111111, 0.5);
  z-index: 1;
  width: 100vw;
  height: 100vh;

  .dialog-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;

    .dialog-container {
      transform: translate(0, -2%);
    }
  }

  &.v-enter-to,
  &.v-leave-from {
    opacity: 1;

    .dialog-container {
      transform: translate(0, 0%);
    }
  }

  &.v-enter-active,
  &.v-leave-active {
    transition: opacity 200ms;

    .dialog-container {
      transition: transform 200ms;
    }
  }
}
</style>
