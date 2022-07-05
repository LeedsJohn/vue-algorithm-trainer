<template>
  <the-algset-selector v-if="active === 'algset-selector'" @selectSet="selectSet"></the-algset-selector>
  <the-scramble v-if="active === 'scramble'" :algSet="chosenSet"></the-scramble>
  <!-- <div v-if="!showAbout && !selectingAlgset && chosenSet">
    <the-scramble :algSet="chosenSet"></the-scramble>
    <base-button @click="toggleAbout" type="helpbutton" :mobile="helpMobileStyle"></base-button>
    <base-button @click="toggleSelectingAlgset" class="topLeft" type="menu"
      >Select Algorithm Set</base-button
    >
  </div>
  <base-button
    v-else-if="!chosenSet && !selectingAlgset"
    @click="toggleSelectingAlgset"
    >Select Algorithm Set</base-button
  >
  <base-foreground
    type="screen"
    v-else-if="showAbout && !selectingAlgset"
    @close="toggleAbout"
    ><the-about></the-about
  ></base-foreground>
  <the-algset-selector
    v-else-if="!showAbout && selectingAlgset"
    @selectSet="selectSet"
  ></the-algset-selector> -->
</template>

<script>
import TheScramble from "./components/scramble/TheScramble.vue";
// import TheAbout from "./components/about/TheAbout.vue";
import TheAlgsetSelector from "./components/select_algset/TheAlgsetSelector.vue";

export default {
  name: "App",
  components: {
    TheScramble,
    // TheAbout,
    TheAlgsetSelector,
  },
  data() {
    return {
      active: "algset-selector",
      chosenSet: "",
    };
  },
  computed: {
    helpMobileStyle() {
      if (this.isMobile()) {
        return 'mobile';
      }
      return '';
    }
  },
  methods: {
    setActive(page) {
      this.active = page;
    },
    selectSet(algSet) {
      this.setActive("scramble");
      this.chosenSet = algSet;
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
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
  font-size: calc(15px + 0.390625vw);
  overflow-x: hidden;
}

.topLeft {
  position: absolute;
  top: 1%;
  left: 1%;
}
</style>
