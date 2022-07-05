<template>
  <the-scramble v-show="active === 'scramble'"></the-scramble>
  <the-alg-selector v-if="active === 'alg-selector'" @selectAlgs="selectAlgs"></the-alg-selector>
</template>

<script>
import TheAlgSelector from "./select_algs/TheAlgSelector.vue";
import TheScramble from "./TheScramble.vue";

export default {
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