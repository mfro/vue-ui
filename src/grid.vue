<template>
  <div class="v-grid" :style="style" :class="classes">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'v-grid',

  props: {
    rows: { type: String },
    columns: { type: String },

    pos: { type: String },
    size: { type: String },
    area: { type: String },
  },

  setup(props) {
    const isContainer = computed(() => {
      return (props.rows || props.columns) != null;
    });

    const style = computed(() => {
      const style = {
        'grid-template-rows': props.rows ?? '',
        'grid-template-columns': props.columns ?? '',
      };

      if (props.pos || props.size || props.area) {
        let pos = props.pos?.split(',').map(c => parseInt(c.trim()))
          ?? props.area?.split('+')[0].split(',').map(c => parseInt(c.trim()))
          ?? [0, 0];

        let size = props.size?.split(',').map(c => parseInt(c.trim()))
          ?? props.area?.split('+')[1].split(',').map(c => parseInt(c.trim()))
          ?? [1, 1];

        style['grid-area'] = `${pos[1] + 1}/${pos[0] + 1}/${pos[1] + size[1] + 1}/${pos[0] + size[0] + 1}`
      }

      if (props.rows || props.columns) {
        style['display'] = 'grid';
      }

      return style;
    });

    const classes = computed(() => ({
      'container': isContainer.value,
    }));

    return { isContainer, style, classes };
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

.v-grid {
  display: grid;
}
</style>
