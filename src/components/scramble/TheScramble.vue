<template>
  <button @click="toggleSelectAlgScreen">Select Algorithms</button>
  <div v-if="selectAlgScreen">
    <p>{{ algName }}</p>
    <p>{{ scramble }}</p>
  </div>
  <TheAlgSelector v-else :algTrainer="algTrainer"></TheAlgSelector>
</template>

<script>
import AlgTrainer from "../../js/scramble_generator/algtrainer.js";
import TheAlgSelector from "../select_algs/TheAlgSelector.vue"

export default {
  components: {
    TheAlgSelector
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.correct();
      } else if (e.key === "x") {
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
      selectAlgScreen: true,
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
    toggleSelectAlgScreen() {
      this.selectAlgScreen = !this.selectAlgScreen;
    },
  },
};
</script>
