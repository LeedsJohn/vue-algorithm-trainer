<template>
  <the-puzzles
    v-if="active === 'puzzles'"
    @selectPuzzle="selectPuzzle"
  ></the-puzzles>
  <the-algsets
    v-else-if="active === 'alg-sets'"
    :puzzle="puzzle"
    @selectSet="selectSet"
    @back="setActive('puzzles')"
  ></the-algsets>
  <the-algsubsets
    v-else-if="active === 'alg-subsets'"
    :subset="subset"
    @selectSet="selectSet"
    @back="setActive('alg-sets')"
  ></the-algsubsets>
</template>

<script>
import ThePuzzles from "./ThePuzzles.vue";
import TheAlgsets from "./TheAlgsets.vue";
import TheAlgsubsets from "./TheAlgsubsets.vue";

export default {
  components: {
    ThePuzzles,
    TheAlgsets,
    TheAlgsubsets,
  },
  emits: ["selectSet"],
  data() {
    return {
      active: "puzzles",
      puzzle: "",
      subset: "",
      subsets: ["Ortega", "WVLS", "ZBLL"],
    };
  },
  methods: {
    selectSet(algSet) {
      if (this.subsets.includes(algSet)) {
        this.subset = algSet;
        this.active = "alg-subsets";
        return;
      }
      let underscore = algSet.replace(" ", "_");
      if (underscore.slice(-1) === "*") {
        underscore = underscore.slice(0, -1);
      }
      this.$emit("selectSet", underscore);
    },
    selectPuzzle(puzzle) {
      this.puzzle = puzzle;
      this.active = "alg-sets";
    },
    setActive(page) {
      this.active = page;
    },
  },
};
</script>