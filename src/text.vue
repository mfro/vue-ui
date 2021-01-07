<template>
  <span class="v-text" :class="{ title }">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'v-text',

  props: {
    title: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

span.v-text {
  &.title {
    font-size: 1.25 * $text-unit;

    font-weight: 500;
  }
}
</style>
