<template>
  <h2>Select Algorithm Set</h2>
  <ul class="grid-container">
    <li v-for="algSet in algSets" :key="algSet">
      <button @click="selectSet(algSet)">{{ algSet }}</button>
    </li>
  </ul>
</template>

<script>
export default {
  emits: ["selectSet"],
  data() {
    return {
      algSets: [
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
    };
  },
  methods: {
    selectSet(algSet) {
      const underscore = algSet.replace(" ", "_");
      this.$emit("selectSet", underscore);
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 2.5rem;
  color: #30dfe9;
  padding: 0 10px;
}

.grid-container {
  margin: 0 10% 5% 10%;
  display: grid;
  gap: 20px 20px;
  grid-template-columns: auto auto auto;
  grid-auto-rows: 5rem;
}

@media screen and (min-width: 800px) {
  .grid-container {
    grid-template-columns: auto auto auto auto;
  }
  h2 {
    font-size: 3rem;
  }
}

@media screen and (min-width: 1250px) {
  .grid-container {
    grid-template-columns: auto auto auto auto auto;
  }
  h2 {
    font-size: 3.5rem;
  }
}

ul {
  margin: 0 auto;
  text-align: center;
}

li {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 100%;
  margin: auto;
}

button {
  background: none;
  border: 3px solid;
  text-align: center;
  height: 100%;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 400;
  border-radius: 16px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.5);
}

button:hover {
  cursor:pointer;
  background-color: rgba(0, 0, 0, 0.2);
}

</style>
