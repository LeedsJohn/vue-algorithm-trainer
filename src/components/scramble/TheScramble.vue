<template>
  <p>{{ algName }}</p>
  <p>{{ scramble }}</p>
  <button @click="newScramble">get alg</button>
  <button @click="correct">correct</button>
  <button @click="wrong">wrong</button>
</template>

<script>
import AlgTrainer from "../../js/scramble_generator/algtrainer.js";

export default {
  data() {
    return {
      algName: "",
      scramble: "",
      algTrainer: null,
    };
  },
  methods: {
    newScramble() {
      this.algTrainer.playRound();
      this.algName = this.algTrainer.curAlg.getName();
      this.scramble = this.algTrainer.curAlg.getScramble();
    },
    wrong() {
      this.algTrainer.wrongAnswer();
    },
    correct() {
      this.algTrainer.correctAnswer();
    },
  },
  mounted() {
    this.algTrainer = new AlgTrainer("../../assets/scrambles/WV.js");
    this.newScramble();
  },
};
</script>
