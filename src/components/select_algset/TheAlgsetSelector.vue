<template>
  <ul v-for="algSet in algSets" :key="algSet">
    <li>
      <base-button @click="selectSet(algSet)">{{ algSet }}</base-button>
    </li>
  </ul>
</template>

<script>
export default {
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
