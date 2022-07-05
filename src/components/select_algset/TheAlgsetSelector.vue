<template>
  <the-puzzles v-if="active === 'puzzles'" @selectPuzzle="selectPuzzle"></the-puzzles>
  <the-algsets v-else-if="active === 'alg-sets'" :puzzle="puzzle" @selectSet="selectSet" @back="setActive('puzzles')"></the-algsets>
</template>

<script>
import ThePuzzles from "./ThePuzzles.vue";
import TheAlgsets from "./TheAlgsets.vue";

export default {
  components: {
    ThePuzzles,
    TheAlgsets,
  },
  emits: ["selectSet"],
  data() {
    return {
      active: "puzzles",
      puzzle: "",
    };
  },
  methods: {
    selectSet(algSet) {
      const underscore = algSet.replace(" ", "_");
      this.$emit("selectSet", underscore);
    },
    selectPuzzle(puzzle) {
      this.puzzle = puzzle;
      this.active = "alg-sets";
    },
    setActive(page) {
      this.active = page;
    }
  },
};
</script>

<style scoped>
h2 {
  font-size: 2.5rem;
  color: #30dfe9;
  padding: 0 5%;
}

.grid-container {
  display: grid;
  gap: 20px 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 5rem;
  justify-items: stretch;
  padding: 0 5%;
}

@media screen and (min-width: 800px) {
  .grid-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  h2 {
    font-size: 3rem;
  }
}

@media screen and (min-width: 1250px) {
  .grid-container {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  h2 {
    font-size: 3.5rem;
  }
}

button {
  background: none;
  border: #000 3px solid;
  text-align: center;
  height: 100%;
  width: 100%;
  font-size: 1.7rem;
  border-radius: 16px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
  color: #222;
  font-weight: 500;
}

button:hover {
  cursor:pointer;
  background-color: rgba(0, 0, 0, 0.2);
}

</style>
