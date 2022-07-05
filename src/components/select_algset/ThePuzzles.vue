<template>
  <h2>Select Puzzle</h2>
  <div class="grid-container">
    <div v-for="puzzle in puzzles" :key="puzzle" class="button-container">
      <button @click="selectPuzzle(puzzle)">{{ puzzle }}</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["selectPuzzle"],
  data() {
    return {
      puzzles: ["2x2", "3x3"],
    };
  },
  methods: {
    selectPuzzle(puzzle) {
      this.$emit("selectPuzzle", puzzle);
    },
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
