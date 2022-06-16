<template>
  <div v-if="!chosenSet">
    <base-button v-if="!selectingAlgset" @click="toggleSelectingAlgset"
      >Select Algorithm Set</base-button
    >
    <the-algset-selector v-else @selectSet="selectSet"></the-algset-selector>
  </div>
  <div v-else-if="!showAbout">
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
import TheAlgsetSelector from "./components/select_algset/TheAlgsetSelector.vue";

export default {
  name: "App",
  components: {
    TheScramble,
    TheAbout,
    TheAlgsetSelector,
  },
  data() {
    return {
      showAbout: false,
      chosenSet: null,
      selectingAlgset: false,
    };
  },
  methods: {
    toggleAbout() {
      this.showAbout = !this.showAbout;
    },
    toggleSelectingAlgset() {
      this.selectingAlgset = !this.selectingAlgset;
    },
    selectSet(fileName) {
      this.chosenSet = fileName;
      console.log(this.chosenSet);
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
