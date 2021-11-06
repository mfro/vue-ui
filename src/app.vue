<template>
  <v-flex column class="v-app">
    <slot />

    <div id="v-overlay" />
  </v-flex>
</template>

<script>
export default {
  name: 'v-app',

  components: {
    vnodes: {
      props: ['vnodes'],
      render: (props) => {
        return props.vnodes;
      },
    },
  },

  data() {
    return {
      tooltip: {
        style: null,
        body: null,
      },
    }
  },

  provide() {
    return {
      tooltip: this.tooltip,
    };
  },
}
</script>

<style lang="scss" scoped>
@import "./style.scss";

div.v-app {
  color: lighten(black, 20%);
  font-size: $text-unit;
  font-family: Roboto, sans-serif;

  width: 100%;
  height: 100%;

  background-color: darken(white, 12%);

  #v-overlay {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
  }
}
</style>
