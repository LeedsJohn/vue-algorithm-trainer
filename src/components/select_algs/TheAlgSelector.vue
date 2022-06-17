<template>
  <ul v-for="(value, key) in groupings" :key="key">
    <li @click="toggleSet(key, value)">
      <base-button class="test">
        {{ key }} 
      </base-button>
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
      groupings: require("../../assets/groupings.json")[this.algset],
      ignoredSets: [],
    };
  },
  methods: {
    addToIgnored(alg) {
      console.log(this.groupings);
      this.ignored.push(alg.name);
      this.algTrainer.ignoreAlg(alg);
    },
    removeFromIgnored(alg) {
      this.ignored = this.ignored.filter((e) => e !== alg.name);
      this.algTrainer.unignoreAlg(alg);
    },
    toggleSet(name, values) {
      if (values[0] === "all") {
          values = this.algTrainer.getAllAlgs(true);
        }
      if (this.ignoredSets.includes(name)) {
        this.ignoredSets = this.ignoredSets.filter((e) => e !== name);
        values.forEach((algName) => {
          const alg = this.algTrainer.getAlgFromName(algName);
          this.removeFromIgnored(alg);
        });
      } else {
        this.ignoredSets.push(name);
        values.forEach((algName) => {
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
