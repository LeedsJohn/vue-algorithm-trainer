<template>
  <base-button @click="toggleSelectAlgScreen" class="topRight"
    >Select Algorithms
  </base-button>
  <div v-if="selectAlgScreen">
    <p class="name">{{ algName }}</p>
    <p class="scramble">{{ scramble }}</p>
  </div>
  <TheAlgSelector v-else :algTrainer="algTrainer"></TheAlgSelector>
</template>

<script>
import AlgTrainer from "../../js/scramble_generator/algtrainer.js";
import TheAlgSelector from "../select_algs/TheAlgSelector.vue";

export default {
  components: {
    TheAlgSelector,
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

<style scoped>
p {
  color: #30dfe9;
}

.name {
  font-size: 4vw;
  font-weight: 700;
}

.scramble {
  font-size: 3.5vw;
  font-weight: 500;
}

.topRight {
  position: absolute;
  top: 1%;
  right: 2%;
}
</style>
