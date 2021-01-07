<template>
  <span
    class="v-icon material-icons"
    :class="{
      bold,
      small,
      'x-small': xSmall,
      large,
      'x-large': xLarge,
    }"
  >
    <slot />
  </span>
</template>

<script>
export default {
  name: 'v-icon',

  props: {
    bold: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    xLarge: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

span.v-icon {
  font-size: (1.5em / 0.875);

  vertical-align: middle;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.bold {
    font-weight: bold;
  }

  &.x-small {
    font-size: (0.875em / 0.875);
  }

  &.small {
    font-size: (1.3em / 0.875);
  }

  &.large {
    font-size: (1.75em / 0.875);
  }

  &.x-large {
    font-size: (2em / 0.875);
  }
}
</style>
