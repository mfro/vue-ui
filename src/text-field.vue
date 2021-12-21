<template>
  <v-input
    @click="$refs.input.focus()"
    :label="label"
    :solo="solo"
    :small="small"
    :x-small="xSmall"
    :large="large"
    :x-large="xLarge"
    :error="error"
    :warning="warning"
    :disabled="disabled"
    style="cursor: text"
  >
    <template v-slot="{ id }">
      <input
        ref="input"
        type="text"
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      />
    </template>
  </v-input>
</template>

<script>
export default {
  name: 'v-text-field',

  emits: ['update:modelValue', 'focus', 'blur'],
  props: {
    label: String,
    modelValue: String,
    placeholder: String,

    disabled: Boolean,
    solo: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    xLarge: { type: Boolean, default: false },

    error: { type: Boolean, default: false },
    warning: { type: Boolean, default: false },
  },

  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value);
      this.$nextTick(() => e.target.value = this.modelValue)
    },

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
  flex: 1 1;

  font-weight: normal;
}
</style>
