<template>
  <the-scramble
    v-show="active === 'main'"
    :algSet="algSet"
    @selectAlgs="(data) => this.selectAlgs(data)"
    @selectAlgset="selectAlgset"
    @finished="changeScreen('restart')"
    ref="scramble"
  ></the-scramble>
  <the-alg-selector
    v-if="active === 'alg-selector'"
    :algTrainer="algSelectData.trainer"
    :algset="algSelectData.algset"
    @close="changeScreen('main')"
    @selectAlgset="selectAlgset"
  ></the-alg-selector>
  <the-restart
    v-if="active === 'restart'"
    @restart="restart"
    @selectAlgset="selectAlgset"
  ></the-restart>
</template>

<script>
import TheAlgSelector from "./select_algs/TheAlgSelector.vue";
import TheScramble from "./TheScramble.vue";
import TheRestart from "./TheRestart.vue";

export default {
  props: ["algSet"],
  emits: ["selectAlgset"],
  components: {
    TheAlgSelector,
    TheScramble,
    TheRestart,
  },
  data() {
    return {
      active: "main",
      algSelectData: null,
    };
  },
  methods: {
    changeScreen(page) {
      this.active = page;
    },
    selectAlgs(data) {
      this.algSelectData = data;
      this.active = "alg-selector";
    },
    selectAlgset() {
      this.$emit("selectAlgset");
    },
    restart() {
      this.$refs.scramble.restart();
      this.active = "main";
    },
  },
};
</script>
