<template>
  <the-scramble
    v-show="active === 'main'"
    :algSet="algSet"
    @selectAlgs="(data) => this.selectAlgs(data)"
    @selectAlgset="selectAlgset"
  ></the-scramble>
  <the-alg-selector
    v-if="active === 'alg-selector'"
    :algTrainer="algSelectData.trainer"
    :algset="algSelectData.algset"
  ></the-alg-selector>
</template>

<script>
import TheAlgSelector from "./select_algs/TheAlgSelector.vue";
import TheScramble from "./TheScramble.vue";

export default {
  props: ["algSet"],
  emits: ["selectAlgset"],
  components: {
    TheAlgSelector,
    TheScramble,
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
  },
};
</script>
