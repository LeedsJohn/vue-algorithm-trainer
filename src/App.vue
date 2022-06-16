<template>
  <div v-if="!showAbout && !selectingAlgset && chosenSet">
    <the-scramble></the-scramble>
    <base-button @click="toggleAbout">About</base-button>
    <base-button @click="toggleSelectingAlgset"
      >Select Algorithm Set</base-button
    >
  </div>
  <base-button
    v-else-if="!chosenSet && !selectingAlgset"
    @click="toggleSelectingAlgset"
    >Select Algorithm Set</base-button
  >
  <base-foreground
    v-else-if="showAbout && !selectingAlgset"
    @close="toggleAbout"
    ><the-about></the-about
  ></base-foreground>
  <the-algset-selector
    v-else-if="!showAbout && selectingAlgset"
    @selectSet="selectSet"
  ></the-algset-selector>
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
      this.toggleSelectingAlgset();
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
