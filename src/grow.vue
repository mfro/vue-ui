<template>
  <div class="v-grow">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'v-grow',
};
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-grow {
  flex: 1 0 0;
}
</style>
