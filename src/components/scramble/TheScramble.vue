<template>
  <base-button @click="toggleSelectAlgScreen" class="topRight" type="menu"
    >Select Algorithms
  </base-button>
  <div v-if="!selectAlgScreen && !finished">
    <p class="scramble">{{ scramble }}</p>
  </div>
  <TheAlgSelector
    v-else-if="selectAlgScreen"
    :algTrainer="algTrainer"
    :algset="algSet"
  ></TheAlgSelector>
  <div v-else-if="finished">
    <p class="finished">Good job!</p>
    <base-button @click="restart">Restart</base-button>
  </div>
  <base-foreground
    v-if="algCountWarning"
    @click="toggleAlgCountWarning"
    type="alert"
    >Please select at least one algorithm.</base-foreground
  >
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
      if (e.key === " " && !this.selectAlgScreen && !this.finished) {
        this.correct();
      } else if (e.key === "x" && !this.selectAlgScreen && !this.finished) {
        this.wrong();
      }
    });
  },
  mounted() {
    this.algTrainer = new AlgTrainer(this.algSet);
    this.getScramble();
  },
  props: ["algSet"],
  data() {
    return {
      algName: "",
      scramble: "",
      algTrainer: null,
      selectAlgScreen: false,
      finished: false,
      algCountWarning: false,
    };
  },
  methods: {
    getScramble() {
      this.algTrainer.playRound();
      if (this.algTrainer.finished) {
        this.finished = true;
        return;
      }
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
      this.algTrainer.getAlgs();
      if (this.algTrainer.algsInCycle() === 0 + this.algTrainer.boxes[0].length()) {
        this.toggleAlgCountWarning();
        console.log("it should be showing");
        return;
      }
      this.getScramble();
      this.selectAlgScreen = !this.selectAlgScreen;
    },
    toggleAlgCountWarning() {
      this.algCountWarning = !this.algCountWarning;
      console.log(this.algCountWarning);
    },
    async restart() {
      this.finished = false;
      await this.algTrainer.reset();
      this.getScramble();
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
  margin-top: 10%;
}

.finished {
  font-size: 10vw;
  font-weight: 700;
  font-style: italic;
}

.topRight {
  position: absolute;
  top: 1%;
  right: 2%;
}
</style>
