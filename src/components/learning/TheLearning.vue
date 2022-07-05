<template>
  <the-scramble v-show="active === 'scramble'" :algSet="algSet" @selectAlgs="selectAlgs"></the-scramble>
  <the-alg-selector v-if="active === 'alg-selector'"></the-alg-selector>
</template>

<script>
import TheAlgSelector from "./select_algs/TheAlgSelector.vue";
import TheScramble from "./TheScramble.vue";

export default {
  props: ["algSet"],
  components: {
    TheAlgSelector,
    TheScramble,
  },
  data() {
    return {
      active: "scramble",
    };
  },
  methods: {
    selectAlgs() {
      this.active = "alg-selector";
    }
  }
};
</script>