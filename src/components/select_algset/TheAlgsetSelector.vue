<template>
  <h2>Select Algorithm Set</h2>
  <ul>
    <li v-for="algSet in algSets" :key="algSet">
      <!-- {{ algSet }} -->
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
  font-size: 3.5rem;
}

ul {
  margin: 0 auto;
  text-align: center;
}

li {
  display: inline-block;
  vertical-align: top;
  margin: 1% 2%;
}

button {
  display: inline;
  background: none;
  border: 3px solid;
  text-align: center;
  height: 8vw;
  width: 16vw;
  font-size: 1.5rem;
  font-weight: 400;
  border-radius: 16px;
}

button:hover {
  cursor:pointer;
  background-color: rgba(0, 0, 0, 0.2);
}

</style>
