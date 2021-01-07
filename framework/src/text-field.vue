<template>
  <v-flex column class="v-text-field mt-4" :class="{ solo }" v-ripple>
    <label :for="id" v-if="label" class="label">{{ label }}</label>

    <input
      class="px-4 py-2"
      type="text"
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
    />
  </v-flex>
</template>

<script>
let id_counter = 0;

export default {
  name: 'v-text-field',

  emits: ['input'],
  props: {
    label: String,
    modelValue: String,
    placeholder: String,

    solo: { type: Boolean, default: false },
  },

  data() {
    return {
      id: `input${++id_counter}`,
    };
  },

  methods: {
    onInput(e) {
      this.$emit('update:modelValue', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-text-field {
  position: relative;

  overflow: hidden;
  background-color: darken(white, 8%);

  &.solo {
    border-radius: 4px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  label {
    padding-top: 2 * $unit;
    padding-left: 4 * $unit;

    font-size: 0.75 * $text-unit;
    font-family: Roboto;
    color: lighten(black, 50%);
  }

  input {
    font-size: $text-unit;
    outline: none;

    font-family: Roboto;
    font-weight: normal;

    pointer-events: all;

    border-radius: 4px;
  }
}
</style>
