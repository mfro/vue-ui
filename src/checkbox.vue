<template>
  <input
    ref="input"
    type="checkbox"
    :checked="modelValue"
    :disabled="disabled"
    @change="$emit('update:modelValue', !modelValue)"
  />
</template>

<script>
export default {
  name: 'v-checkbox',

  emits: ['update:modelValue', 'focus', 'blur'],
  props: {
    modelValue: Boolean,

    disabled: { type: Boolean, default: false },
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

    toggle() {
      this.$refs.input.checked = !this.$refs.input.checked;
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

  flex: 0 0 auto;
}
</style>
