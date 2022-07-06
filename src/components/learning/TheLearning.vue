<template>
  <the-scramble
    v-show="active === 'main'"
    :algSet="algSet"
    @selectAlgs="changeScreen('alg-selector')"
    @selectAlgset="selectAlgset"
  ></the-scramble>
  <the-alg-selector v-if="active === 'alg-selector'"></the-alg-selector>
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
    };
  },
  methods: {
    changeScreen(page) {
      this.active = page;
    },
    selectAlgset() {
      this.$emit("selectAlgset")
    }
  },
};
</script>
