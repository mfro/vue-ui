<template>
  <input
    ref="input"
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', !modelValue)"
  />
</template>

<script>
export default {
  name: 'v-checkbox',

  emits: ['update:modelValue', 'focus', 'blur'],
  props: {
    modelValue: Boolean,

    solo: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    xLarge: { type: Boolean, default: false },

    error: { type: Boolean, default: false },
    warning: { type: Boolean, default: false },
  },

  methods: {
    blur() {
      this.$refs.input.blur();
    },

    focus() {
      this.$refs.input.focus();
    },

    select() {
      this.$refs.input.select();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

input {
  color: inherit;
  font-size: $text-unit;
  outline: none;

  font-weight: normal;

  width: (1.1875 * $text_unit);
  height: (1.1875 * $text_unit);
}
</style>
