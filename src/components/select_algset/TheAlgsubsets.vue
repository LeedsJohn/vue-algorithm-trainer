<template>
  <h2>Select Algorithm Set</h2>
  <button type="menu" class="back" @click="back">Back</button>
  <div class="grid-container">
    <div
      v-for="algSet in algSubsets[subset]"
      :key="algSet"
      class="button-container"
    >
      <button class="algset" @click="selectSet(algSet)">{{ algSet }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["subset"],
  emits: ["selectSet", "back"],
  data() {
    return {
      algSubsets: {
        Ortega: ["Ortega OLL", "Ortega PBL"],
        WVLS: ["WVLS FL", "WVLS"],
        ZBLL: [
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
      let underscore = algSet.replace(" ", "_");
      underscore += "*";
      this.$emit("selectSet", underscore);
    },
    back() {
      this.$emit("back");
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 2.5rem;
  color: #30dfe9;
  padding: 0 5%;
  margin-top: 10vh;
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
  position: absolute;
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
