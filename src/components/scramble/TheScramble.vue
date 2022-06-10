<template>
  <p @keyup.space="poo">{{ algName }}</p>
  <p>{{ scramble }}</p>
</template>

<script>
import AlgTrainer from "../../js/scramble_generator/algtrainer.js";

export default {
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.correct();
      } else {
        this.wrong();
      }
    });
  },
  mounted() {
    this.algTrainer = new AlgTrainer("../../assets/scrambles/WV.js");
    this.getScramble();
  },
  data() {
    return {
      algName: "",
      scramble: "",
      algTrainer: null,
    };
  },
  methods: {
    getScramble() {
      this.algTrainer.playRound();
      this.algName = this.algTrainer.curAlg.getName();
      this.scramble = this.algTrainer.curAlg.getScramble();
    },
    wrong() {
      this.algTrainer.wrongAnswer();
      this.getScramble();
    },
    correct() {
      this.algTrainer.correctAnswer();
      this.getScramble();
    },
  },
};
</script>
