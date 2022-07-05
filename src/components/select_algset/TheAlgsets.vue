<template>
  <h2>Select Algorithm Set</h2>
  <button
    type="menu"
    class="back"
    @click="back"
    >Back</button
  >
  <div class="grid-container">
    <div
      v-for="algSet in algSets[puzzle]"
      :key="algSet"
      class="button-container"
    >
      <button class="algset" @click="selectSet(algSet)">{{ algSet }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["puzzle"],
  emits: ["selectSet", "back"],
  data() {
    return {
      algSets: {
        "2x2": ["CLL", "EG-1", "EG-2", "Ortega OLL", "Ortega PBL"],
        "3x3": [
          "CMLL",
          "COLL",
          "ELL",
          "OLL",
          "PLL",
          "WVLS FL",
          "WVLS",
          "ZBLL AS",
          "ZBLL H",
          "ZBLL L",
          "ZBLL Pi",
          "ZBLL S",
          "ZBLL T",
          "ZBLL U",
        ],
      },
    };
  },
  methods: {
    selectSet(algSet) {
      const underscore = algSet.replace(" ", "_");
      this.$emit("selectSet", underscore);
    },
    back() {
      this.$emit("back");
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

.back {
  position: fixed;
  top: 2%;
  left: 2%;
  height: 4rem;
  width: 8rem;
  font-size: 1.3rem;
  background-color: rgba(255, 0, 0, 0.3);
  color: #000;
  border: #000 3px solid;
  border-radius: 1rem;
  box-shadow: 3px 3px;
}

.back:hover {
  background-color: rgba(255, 0, 0, 0.6);
}

.algset {
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
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
