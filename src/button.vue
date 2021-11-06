<template>
  <button
    class="v-button"
    v-ripple:ripple
    :class="['color-' + color, { active }, classes]"
    :disabled="disabled"
    @click.stop="$emit('click')"
  >
    <v-flex align-center justify-center>
      <slot />
    </v-flex>
  </button>
</template>

<script>
import { computed, shallowRef } from 'vue';

export default {
  name: 'v-button',

  emits: ['click'],
  props: {
    fab: { type: Boolean, default: false },
    text: { type: Boolean, default: false },
    tile: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    color: { type: String, default: 'default' },
    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false },
    large: { type: Boolean, default: false },
    xLarge: { type: Boolean, default: false },
  },

  setup(props) {
    const active = shallowRef(false);

    const classes = computed(() => ({
      fab: props.fab,
      text: props.text,
      tile: props.tile,
      icon: props.icon,
      disabled: props.disabled,
      small: props.small,
      'x-small': props.xSmall,
      large: props.large,
      'x-large': props.xLarge,
    }));

    return {
      active,
      classes,

      ripple(rippling) {
        active.value = rippling;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

$default-bg: #e8e8e8;
$default-text: rgba(0, 0, 0, 0.87);

button.v-button {
  box-shadow: 1px 1px 4px fade-out(black, 0.75);

  font-size: 0.875 * $text-unit;

  height: 2.25 * $text-unit;
  padding: 0 (4 * $unit);

  // padding: 0 1em 0 1em;
  position: relative;

  outline: none;
  border-radius: 4px;

  font-weight: 500;
  text-transform: uppercase;
  // text-indent: 0.0892857143em;
  letter-spacing: 0.0892857143em;

  pointer-events: all;

  white-space: nowrap;

  transition: background-color 160ms, color 160ms, box-shadow 160ms;

  &.tile {
    border-radius: 0;
  }

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

  &.disabled {
    pointer-events: none !important;
    color: darkgray !important;
    background-color: darken(white, 12%) !important;
    box-shadow: none !important;
  }

  &.color-default {
    color: $default-text;
    background-color: $default-bg;

    &:hover,
    &:focus {
      background-color: darken($default-bg, 10%);
    }
  }

  &.color-primary {
    color: white;
    background-color: $primary;

    &:hover,
    &:focus {
      background-color: lighten($primary, 10%);
    }
  }

  &.color-green {
    color: $green;
    background-color: $default-bg;

    &:hover,
    &:focus {
      background-color: lighten($default-bg, 10%);
    }
  }

  &.color-error {
    color: white;
    background-color: $error;

    &:hover,
    &:focus {
      background-color: lighten($error, 10%);
    }
  }

  &.icon {
    border-radius: 5000px;
    width: 2.125 * $text-unit;
    height: 2.125 * $text-unit;

    padding: 0;

    box-shadow: none;
    background-color: initial;

    &.disabled {
      color: darkgray !important;
    }

    &.x-small {
      width: 1.25 * $text-unit;
      height: 1.25 * $text-unit;

      font-size: 0.6 * $text-unit;
    }

    &.small {
      width: 1.5 * $text-unit;
      height: 1.5 * $text-unit;
    }

    &.large {
      width: 2.5 * $text-unit;
      height: 2.5 * $text-unit;
    }

    &.x-large {
      width: 3 * $text-unit;
      height: 3 * $text-unit;

      font-size: 1 * $text-unit;
    }

    &.color-default {
      color: $default-text;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: $default-bg;
      }
    }

    &.color-primary {
      color: $primary;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: fade-out($primary, 0.9);
      }
    }

    &.color-green {
      color: $green;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: fade-out($green, 0.9);
      }
    }

    &.color-error {
      color: $error;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: fade-out($error, 0.9);
      }
    }
  }

  &.fab {
    border-radius: 5000px;
    width: 2.5 * $text-unit;
    height: 2.5 * $text-unit;
    padding: 0;

    &.disabled {
      color: darkgray !important;
      background-color: darken(white, 12%) !important;
    }

    &.x-small {
      width: 1.75 * $text-unit;
      height: 1.75 * $text-unit;

      font-size: 0.75 * $text-unit;
    }

    &.small {
      width: 2.125 * $text-unit;
      height: 2.125 * $text-unit;
    }

    &.large {
      width: 3 * $text-unit;
      height: 3 * $text-unit;
    }

    &.x-large {
      width: 3.5 * $text-unit;
      height: 3.5 * $text-unit;

      font-size: 1 * $text-unit;
    }
  }

  &.text {
    box-shadow: none;
    background-color: initial;

    &.disabled {
      color: darkgray !important;
    }

    &.color-default {
      color: $default-text;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: $default-bg;
      }
    }

    &.color-primary {
      color: $primary;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: fade-out($primary, 0.9);
      }
    }

    &.color-error {
      color: $error;
      background-color: transparent;

      &:hover,
      &:focus {
        background-color: fade-out($error, 0.9);
      }
    }
  }

  &.active {
    box-shadow: none;
  }
}
</style>
