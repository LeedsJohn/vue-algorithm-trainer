<template>
  <p>{{ algName }}</p>
  <p>{{ scramble }}</p>
  <button @click="test">test</button>
</template>

<script>
import WV from "../../assets/scrambles/WV.json";
import AlgTrainer from '../../js/scramble_generator/algtrainer.js';

export default {
  data() {
    return {
      algNames: null,
      scrambles: WV,
      algName: "name",
      scramble: "scramble",
      testing: null,
    };
  },
  methods: {
    test() {
      this.testing.playRound();
      this.algName =
        this.algNames[Math.floor(Math.random() * this.algNames.length)];
      const scrambleList = this.scrambles[this.algName];
      this.scramble =
        scrambleList[Math.floor(Math.random() * scrambleList.length)];
    },
  },
  mounted() {
    const names = Object.keys(this.scrambles);
    this.algNames = names;
    this.testing = new AlgTrainer("../../assets/scrambles/WV.json");
  },
};
</script>
