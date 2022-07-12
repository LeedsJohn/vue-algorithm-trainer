<template>
  <the-algset-selector
    v-if="active === 'algset-selector'"
    @selectSet="selectSet"
  ></the-algset-selector>
  <the-learning
    v-if="active === 'scramble'"
    :algSet="chosenSet"
    @selectAlgset="setActive('algset-selector')"
  ></the-learning>
</template>

<script>
import TheLearning from "./components/learning/TheLearning.vue";
// import TheAbout from "./components/about/TheAbout.vue";
import TheAlgsetSelector from "./components/select_algset/TheAlgsetSelector.vue";

export default {
  name: "App",
  components: {
    TheLearning,
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
        return "mobile";
      }
      return "";
    },
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
