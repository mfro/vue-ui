<template>
  <v-flex
    column
    class="v-input"
    :class="{ disabled, solo, ...inputClasses }"
    :v-ripple="!disabled"
  >
    <label :for="id" v-if="label" class="label">
      {{ label }}
    </label>

    <v-flex class="container" align-center :class="inputClasses">
      <v-flex grow>
        <slot :id="id" />
      </v-flex>

      <span style="margin: -2px 0" v-if="error">
        <v-icon small outlined color="error">error</v-icon>
      </span>

      <span style="margin: -2px 0" v-else-if="warning">
        <v-icon small outlined color="warning">warning</v-icon>
      </span>
    </v-flex>
  </v-flex>
</template>

<script>
import { computed } from 'vue';

let id_counter = 0;

export default {
  name: 'v-input',

  emits: ['update:modelValue'],
  props: {
    label: String,

    disabled: { type: Boolean, default: false },
    solo: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    xLarge: { type: Boolean, default: false },

    error: { type: Boolean, default: false },
    warning: { type: Boolean, default: false },
  },

  data() {
    return {
      id: `input${++id_counter}`,
    };
  },

  setup(props) {
    const inputClasses = computed(() => ({
      error: props.error,
      warning: props.warning,
      small: props.small,
      'x-small': props.xSmall,
      large: props.large,
      'x-large': props.xLarge,
    }));

    return { inputClasses };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-input {
  position: relative;

  overflow: hidden;
  background-color: darken(white, 8%);
  margin-top: (4 * $unit);

  &.disabled {
    cursor: default;
  }

  &.solo {
    border-radius: 4px;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &.primary label {
    color: $primary;
  }

  &.error label {
    color: $error;
  }

  &.warning label {
    color: $warning;
  }

  &.green label {
    color: $green;
  }

  label {
    padding-top: 2 * $unit;
    padding-left: 4 * $unit;

    font-size: 0.75 * $text-unit;
    color: lighten(black, 30%);
    cursor: inherit;
  }

  &.disabled label {
    cursor: default;
    opacity: 0.5;
  }

  .container {
    pointer-events: all;

    border-radius: 4px;

    padding: 0 (4 * $unit);
    height: 2.25 * $text-unit;

    &.x-small {
      height: 1.25 * $text-unit;
      padding: 0 (2 * $unit);

      font-size: 0.75 * $text-unit;
    }

    &.small {
      height: 1.5 * $text-unit;
      padding: 0 (3 * $unit);
    }

    &.large {
      height: 2.5 * $text-unit;
      padding: 0 (5 * $unit);
    }

    &.x-large {
      height: 3 * $text-unit;
      padding: 0 (8 * $unit);

      font-size: 1 * $text-unit;
    }

    // &.small {
    //   padding-top: (1 * $unit);
    //   padding-bottom: (1 * $unit);
    //   // width: 1.75 * $text-unit;
    //   // height: 1.75 * $text-unit;
    // }

    // &.large {
    //   padding-top: (3 * $unit);
    //   padding-bottom: (3 * $unit);
    //   // width: 2.5 * $text-unit;
    //   // height: 2.5 * $text-unit;
    // }

    &.primary {
      color: $primary;
    }

    &.error {
      color: $error;
    }

    &.warning {
      color: $warning;
    }

    &.green {
      color: $green;
    }
  }
}
</style>
