<template>
  <div v-if="!showAbout">
    <the-scramble></the-scramble>
    <base-button @click="toggleAbout">About</base-button>
  </div>
  <base-foreground v-else @close="toggleAbout"
    ><the-about></the-about
  ></base-foreground>
</template>

<script>
import TheScramble from "./components/scramble/TheScramble.vue";
import TheAbout from "./components/about/TheAbout.vue";

export default {
  name: "App",
  components: {
    TheScramble,
    TheAbout,
  },
  data() {
    return {
      showAbout: false,
    };
  },
  methods: {
    toggleAbout() {
      this.showAbout = !this.showAbout;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

html {
  background-color: #0081a7;
}
</style>
