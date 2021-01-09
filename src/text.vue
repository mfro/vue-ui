<template>
  <span class="v-text" :class="{ bold, body, title }">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'v-text',

  props: {
    bold: { type: Boolean, default: false },
    body: { type: Boolean, default: false },
    title: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

span.v-text {
  &.body {
    font-size: $text-unit;
    font-weight: normal;
  }

  &.title {
    font-size: 1.25 * $text-unit;
    font-weight: 500;
  }

  &.bold {
    font-weight: bold;
  }
}
</style>
