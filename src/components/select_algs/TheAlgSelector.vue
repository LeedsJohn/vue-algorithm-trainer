<template>
  <ul v-for="set in groupings" :key="set.name">
    <li @click="toggleSet(set)">
      <base-button class="test">{{
        set.name
      }}</base-button>
    </li>
  </ul>
  <ul v-for="alg in allAlgs" :key="alg.name">
    <li v-if="!ignored.includes(alg.name)" @click="addToIgnored(alg)">
      <base-button class="test">learning: {{ alg.name }}</base-button>
    </li>
    <li v-else @click="removeFromIgnored(alg)">
      <base-button>NOT learning: {{ alg.name }}</base-button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["algTrainer", "algset"],
  mounted() {
    this.allAlgs = this.algTrainer.getAllAlgs();
    for (let i = 0; i < this.algTrainer.boxes[6].length(); i++) {
      this.ignored.push(this.algTrainer.boxes[6].algorithms[i].getName());
    }
  },
  data() {
    return {
      allAlgs: null,
      ignored: [],
      groupings: require("../../assets/scrambles/Groupings").groupings[this.algset],
      ignoredSets: [],
    };
  },
  methods: {
    addToIgnored(alg) {
      this.ignored.push(alg.name);
      this.algTrainer.ignoreAlg(alg);
    },
    removeFromIgnored(alg) {
      this.ignored = this.ignored.filter((e) => e !== alg.name);
      this.algTrainer.unignoreAlg(alg);
    },
    toggleSet(set) {
      if (this.ignoredSets.includes(set.name)) {
        this.ignoredSets = this.ignoredSets.filter((e) => e !== set.name);
        set.cases.forEach((algName) => {
          const alg = this.algTrainer.getAlgFromName(algName);
          this.removeFromIgnored(alg);
        });
      } else {
        this.ignoredSets.push(set.name);
        set.cases.forEach((algName) => {
          const alg = this.algTrainer.getAlgFromName(algName);
          this.addToIgnored(alg);
        });
      }
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
  float: left;
}

li .test {
  display: block;
}
</style>
