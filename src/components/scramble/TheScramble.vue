<template>
  <p>{{ algName }}</p>
  <p>{{ scramble }}</p>
  <button @click="test">test</button>
  <button @click="wrong">wrong</button>
  <button @click="correct">correct</button>
</template>

<script>
import AlgTrainer from '../../js/scramble_generator/algtrainer.js';

export default {
  data() {
    return {
      algName: "",
      scramble: "",
      algTrainer: null,
    };
  },
  methods: {
    test() {
      this.algTrainer.playRound();
      this.algName = this.algTrainer.curAlgName;
      this.scramble = this.algTrainer.curScramble;
    },
    wrong() {
      console.log("hi");
    },
    correct() {
      console.log("bye");
    }
  },
  mounted() {
    this.algTrainer = new AlgTrainer("../../assets/scrambles/WV.js");
  },
};
</script>
