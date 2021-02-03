<template>
  <span class="v-text" :class="classes">
    <slot />
  </span>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'v-text',

  props: {
    bold: { type: Boolean, default: false },
    body: { type: Boolean, default: false },
    title: { type: Boolean, default: false },
    subtitle: { type: Boolean, default: false },
  },

  setup(props) {
    const classes = computed(() => ({
      bold: props.bold,
      body: props.body,
      title: props.title,
      subtitle: props.subtitle,
    }));

    return { classes };
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

  &.subtitle {
    font-size: 1 * $text-unit;
    font-weight: 500;
  }

  &.title {
    font-size: 1.25 * $text-unit;
    font-weight: 500;
  }

  &.bold {
    font-weight: 700;
  }
}
</style>
