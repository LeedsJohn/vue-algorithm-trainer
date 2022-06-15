<template>
  <ul v-for="alg in allAlgs" :key="alg.name">
    <li v-if="!ignored.includes(alg.name)" @click="addToIgnored(alg)">
      learning: {{ alg.name }}
    </li>
    <li v-else @click="removeFromIgnored(alg)">NOT learning: {{ alg.name }}</li>
  </ul>
</template>

<script>
export default {
  props: ["algTrainer"],
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
  },
};
</script>
