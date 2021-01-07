<template>
  <v-flex column class="v-card">
    <v-flex align-center class="mt-4 mx-4" v-if="$slots.title">
      <slot name="title" />
    </v-flex>

    <slot />

    <v-flex class="ma-4" v-if="$slots.actions">
      <slot name="actions" />
    </v-flex>
  </v-flex>
</template>

<script>
export default {
  name: 'v-card',
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-card {
  border-radius: 4px;

  background-color: white;

  box-shadow: 1px 1px 4px fade-out(black, 0.75);
}
</style>
