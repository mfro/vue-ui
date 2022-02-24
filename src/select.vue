<template>
  <div class="v-select" v-ripple>
    <select :class="classes" :value="id(option(modelValue))" @input="onInput">
      <option v-for="option in options" :key="option" :value="id(option)">
        {{ text(option) }}
      </option>
    </select>

    <div class="icon-container">
      <v-icon>arrow_drop_down</v-icon>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'v-select',

  emits: ['update:modelValue'],
  props: {
    modelValue: {},
    options: Array,

    text: Function,
    value: Function,

    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    xLarge: { type: Boolean, default: false },
  },

  setup(props, { emit }) {
    const classes = computed(() => ({
      small: props.small,
      'x-small': props.xSmall,
      large: props.large,
      'x-large': props.xLarge,
    }));

    let id = (v) => {
      let i = props.options.indexOf(v);
      return i;
    };

    let text = (v) => {
      return props.text ? props.text(v) : v;
    };

    let value = (v) => {
      return props.value ? props.value(v) : v;
    };

    let option = (v) => {
      return props.options.find(o => value(o) == v);
    };

    let onInput = (e) => {
      let v = props.options[e.target.value];
      emit('update:modelValue', value(v));
    };

    return { classes, id, text, value, option, onInput };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-select {
  display: flex;
  position: relative;

  overflow: hidden;
  background-color: darken(white, 8%);
  margin-top: (4 * $unit);

  border-radius: 4px;

  select {
    flex: 1 1 auto;
    font-size: $text-unit;
    outline: none;

    font-weight: normal;

    pointer-events: all;

    padding-top: (2 * $unit);
    padding-left: (4 * $unit);
    padding-right: calc(3ch + 16px);
    padding-bottom: (2 * $unit);

    &.small {
      padding-top: (1 * $unit);
      padding-bottom: (1 * $unit);
      // width: 1.75 * $text-unit;
      // height: 1.75 * $text-unit;
    }

    &.large {
      padding-top: (3 * $unit);
      padding-bottom: (3 * $unit);
      // width: 2.5 * $text-unit;
      // height: 2.5 * $text-unit;
    }
  }

  .icon-container {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    pointer-events: none;
    justify-content: center;
  }
}
</style>
