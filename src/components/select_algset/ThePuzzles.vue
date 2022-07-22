<template>
  <h2>Select Puzzle</h2>
  <div class="flex-container">
    <div
      v-for="puzzle in puzzles"
      :key="puzzle"
      class="button-container"
      @click="selectPuzzle(puzzle)"
    >
      <p>{{ puzzle }}</p>
      <img :src="require(`../../assets/scramble_icons/${files[puzzle]}`)" />
    </div>
  </div>
</template>

<script>
export default {
  emits: ["selectPuzzle"],
  data() {
    return {
      puzzles: ["2x2", "3x3"],
      files: {
        "2x2": "Ortega_OLL/OLL_7.png",
        "3x3": "PLL/H.png",
      },
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

.flex-container {
  display: flex;
  justify-content: center;
  column-gap: 2rem;
  padding: 0 5%;
}

@media screen and (min-width: 800px) {
  h2 {
    font-size: 3rem;
  }
}

@media screen and (min-width: 1250px) {
  h2 {
    font-size: 3.5rem;
  }
}

.button-container {
  border: #000 3px solid;
  border-radius: 16px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.5);
  width: 16rem;
}

p {
  text-align: center;
  font-size: 1.7rem;
  color: #222;
  font-weight: 500;
  padding: 0;
  margin: 0;
}

img {
  height: 6rem;
  width: 6rem;
}

.button-container:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
