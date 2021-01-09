<template>
  <div
    class="v-flex"
    :class="[
      {
        grow: grow,
        wrap: wrap,
        row: row,
        column: column,
        'align-start': alignStart,
        'align-center': alignCenter,
        'align-baseline': alignBaseline,
        'align-end': alignEnd,
        'justify-start': justifyStart,
        'justify-center': justifyCenter,
        'justify-space-around': justifySpaceAround,
        'justify-space-between': justifySpaceBetween,
        'justify-end': justifyEnd,
      },
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'v-flex',

  props: {
    grow: { type: Boolean, default: false },
    wrap: { type: Boolean, default: false },
    row: { type: Boolean, default: false },
    column: { type: Boolean, default: false },
    alignStart: { type: Boolean, default: false },
    alignCenter: { type: Boolean, default: false },
    alignBaseline: { type: Boolean, default: false },
    alignEnd: { type: Boolean, default: false },
    justifyStart: { type: Boolean, default: false },
    justifyCenter: { type: Boolean, default: false },
    justifySpaceAround: { type: Boolean, default: false },
    justifySpaceBetween: { type: Boolean, default: false },
    justifyEnd: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-flex {
  display: flex;

  &.grow {
    flex: 1 0 0;
  }

  &.wrap {
    flex-wrap: wrap;
  }

  &.column {
    flex-direction: column;
  }

  &.row {
    flex-direction: row;
  }

  &.align-start {
    align-items: flex-start;
  }

  &.align-center {
    align-items: center;
  }

  &.align-baseline {
    align-items: baseline;
  }

  &.align-end {
    align-items: flex-end;
  }

  &.justify-start {
    justify-content: flex-start;
  }

  &.justify-center {
    justify-content: center;
  }

  &.justify-end {
    justify-content: flex-end;
  }

  &.justify-space-around {
    justify-content: space-around;
  }

  &.justify-space-between {
    justify-content: space-between;
  }
}
</style>
