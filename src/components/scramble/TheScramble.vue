<template>
  <base-button
    v-if="!finished"
    @click="toggleSelectAlgScreen"
    class="topRight"
    :type="selectAlgScreen ? 'close' : 'menu'"
    >Select Algorithms
  </base-button>
  <div v-if="showSolutions">
    <alg-solutions @close="toggleSolutions" :solutions="solutions"></alg-solutions>
  </div>
  <div v-if="!selectAlgScreen && !finished">
    <p class="scramble" @click="toggleSolutions">{{ scramble }}</p>
  </div>
  <the-alg-selector
    v-else-if="selectAlgScreen"
    :algTrainer="algTrainer"
    :algset="algSet"
  ></the-alg-selector>
  <div v-else-if="finished">
    <p class="finished">Good job!</p>
    <base-button @click="restart" type="restart">Restart</base-button>
  </div>
  <base-foreground
    v-if="algCountWarning"
    @click="toggleAlgCountWarning"
    type="alert"
    >Please select at least one algorithm.</base-foreground
  >
  <display-boxes
    v-if="scramble && !selectAlgScreen && !algCountWarning && !finished"
    :algTrainer="algTrainer"
    class="display-box"
  ></display-boxes>
  <div v-if="!finished && !selectAlgScreen && isMobile()">
    <base-button
      @click="wrong"
      type="wrong"
      class="touchscreen wrong"
    ></base-button>
    <base-button
      @click="correct"
      type="correct"
      class="touchscreen correct"
    ></base-button>
  </div>
</template>

<script>
import AlgTrainer from "../../js/scramble_generator/algtrainer.js";
import TheAlgSelector from "../select_algs/TheAlgSelector.vue";
import DisplayBoxes from "./DisplayBoxes.vue";
import AlgSolutions from "./AlgSolutions.vue";

export default {
  components: {
    TheAlgSelector,
    DisplayBoxes,
    AlgSolutions,
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
      solutions: [],
      algTrainer: null,
      selectAlgScreen: false,
      finished: false,
      algCountWarning: false,
      showSolutions: false,
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
      this.solutions = this.algTrainer.curAlg.getSolutions();
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
      if (
        this.algTrainer.algsInCycle() ===
        0 + this.algTrainer.boxes[0].length()
      ) {
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
    toggleSolutions() {
      this.showSolutions = !this.showSolutions;
    },
    async restart() {
      this.finished = false;
      await this.algTrainer.reset();
      this.getScramble();
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
  },
};
</script>

<style scoped>
p {
  color: #30dfe9;
}

.name {
  font-size: 3.5rem;
  font-weight: 700;
}

.scramble {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 500;
  margin-top: 16vh;
  padding: 0 20px;
}

.display-box {
  margin-top: 30vh;
}

@media (orientation: landscape) {
  .scramble {
    margin-top: 20vh;
  }
}

.finished {
  font-size: 5rem;
  font-weight: 700;
  font-style: italic;
}

.topRight {
  position: absolute;
  top: 1%;
  right: 1%;
}

.display-box {
  margin-top: 0;
}

.touchscreen {
  display: inline;
  position: fixed;
  bottom: 0;
}

.wrong {
  left: 0;
}

.correct {
  right: 0;
}
</style>
