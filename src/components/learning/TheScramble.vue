<template>
  <div>
    <div v-if="isMobile()" class="stretch-screen"></div>
    <the-instructions></the-instructions>
    <the-suggestions
      v-if="showSuggestions"
      :algSet="algSet"
      :algNames="algTrainer.getAllAlgs(true)"
      @close="closeSuggestions"
      @useSuggestions="useSuggestions"
    ></the-suggestions>
    <base-button class="select-algset" type="menu" @click="selectAlgset"
      >Select Algorithm Set</base-button
    >
    <base-button class="select-algs" type="menu" @click="selectAlgs"
      >Select Algorithms</base-button
    >
    <alg-solutions
      v-if="showSolutions"
      @close="toggleSolutions"
      :solutions="solutions"
      :algName="algName"
    ></alg-solutions>
    <p class="scramble" @click="toggleSolutions">{{ scramble }}</p>
    <display-boxes
      v-if="started"
      :algTrainer="algTrainer"
      class="display-box"
    ></display-boxes>
    <div v-if="isMobile()">
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
  </div>
</template>

<script>
import AlgTrainer from "../../js/scramble_generator/algtrainer.js";
import DisplayBoxes from "./DisplayBoxes.vue";
import AlgSolutions from "./AlgSolutions.vue";
import TheInstructions from "./TheInstructions.vue";
import TheSuggestions from "./TheSuggestions.vue";

export default {
  components: {
    DisplayBoxes,
    AlgSolutions,
    TheInstructions,
    TheSuggestions,
  },
  created() {
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.correct();
      } else if (e.key.toLowerCase() === "x") {
        this.wrong();
      } else if (e.key === "Enter") {
        this.toggleSolutions();
      }
    });
  },
  mounted() {
    this.algTrainer = new AlgTrainer(this.algSet);
    this.getScramble();
    if (this.checkShowSuggestions()) {
      this.showSuggestions = true;
    }
    this.started = true;
  },
  props: ["algSet"],
  emits: ["selectAlgset", "selectAlgs", "finished"],
  data() {
    return {
      algName: "",
      scramble: "",
      solutions: [],
      started: false,
      algTrainer: null,
      finished: false,
      showSolutions: false,
      showSuggestions: false,
      timeTracker: { time: null, total: 0, count: 0, cutOff: 0, algs: {} },
    };
  },
  methods: {
    getScramble() {
      console.log(this.timeTracker);
      this.algTrainer.playRound();
      if (this.algTrainer.finished) {
        this.$emit("finished");
        this.finished = true;
        return;
      }
      this.algName = this.algTrainer.curAlg.getName();
      this.scramble = this.algTrainer.curAlg.getScramble();
      this.solutions = this.algTrainer.curAlg.getSolutions();
    },
    wrong() {
      if (
        this.selectAlgScreen ||
        this.finished ||
        this.showSolutions ||
        this.showSuggestions
      ) {
        return;
      }
      this.incrementTime();
      this.checkAlgTime();
      this.algTrainer.wrongAnswer();
      this.updateWrongAlg();
      this.getScramble();
    },
    correct() {
      if (
        this.selectAlgScreen ||
        this.finished ||
        this.showSolutions ||
        this.showSuggestions
      ) {
        return;
      }
      this.incrementTime();
      this.checkAlgTime();
      this.algTrainer.correctAnswer();
      this.getScramble();
    },
    selectAlgset() {
      this.finished = true;
      this.algTrainer = null;
      this.solutions = null;
      this.$emit("selectAlgset");
    },
    selectAlgs() {
      const data = { trainer: this.algTrainer, algset: this.algSet };
      this.$emit("selectAlgs", data);
    },
    toggleSolutions() {
      this.showSolutions = !this.showSolutions;
    },
    closeSuggestions() {
      this.showSuggestions = false;
      this.createLocalStorage();
    },
    useSuggestions(suggestions) {
      const allAlgs = this.algTrainer.getAllAlgs();
      for (const alg of allAlgs) {
        if (!suggestions.includes(alg.name)) {
          this.algTrainer.ignoreAlg(alg);
        }
      }
      this.getScramble();
      this.closeSuggestions();
    },
    checkShowSuggestions() {
      const algs = this.algTrainer.getAllAlgs(true);
      for (const alg of algs) {
        if (localStorage[`${this.algSet}${alg}Wrong`] === "1" || localStorage[`${this.algSet}${alg}Time`] === "0") {
          return true;
        }
      }
      return false;
    },
    createLocalStorage() {
      const algs = this.algTrainer.getAllAlgs(true);
      for (const alg of algs) {
        localStorage[`${this.algSet}${alg}Wrong`] = "0";
        localStorage[`${this.algSet}${alg}Time`] = "0";
      }
    },
    updateWrongAlg() {
      localStorage[`${this.algSet}${this.algName}Wrong`] = "1";
    },
    incrementTime() {
      const time = new Date();
      if (!this.timeTracker.time) {
        this.timeTracker.time = time;
        return;
      }
      const timeElapsed = time.getTime() - this.timeTracker.time.getTime();
      this.timeTracker.total += timeElapsed;
      this.timeTracker.count += 1;
      this.timeTracker.cutOff =
        (this.timeTracker.total / this.timeTracker.count) * 2;
      if (this.curAlg in this.timeTracker.algs) {
        this.timeTracker.algs[this.curAlg].total += timeElapsed;
        this.timeTracker.algs[this.curAlg].count += 1;
        this.timeTracker.algs[this.curAlg].avg +=
          this.timeTracker.algs[this.curAlg].total /
          this.timeTracker.algs[this.curAlg].count;
      } else {
        this.timeTracker.algs[this.curAlg] = {
          total: timeElapsed,
          count: 1,
          avg: timeElapsed,
        };
      }
    },
    checkAlgTime() {
      if (this.timeTracker.count === 0) {
        return; // ignore first algorithm
      }
      // Algorithms that are answered quickly enough
      if (this.timeTracker.algs[this.curAlg].avg < this.timeTracker.cutOff) {
        localStorage[`${this.curAlg}Time`] = "0";
      } else { // slow algorithms
        localStorage[`${this.curAlg}Time`] = "1";
      }
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
.stretch-screen {
  height: 110vh;
  width: 98%;
  z-index: -100;
  position: absolute;
}

p {
  color: #60ffff;
}

.name {
  font-size: 3.5rem;
  font-weight: 700;
}

.scramble {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 500;
  margin-top: 8vh;
  margin-bottom: 0;
  padding: 0 20px;
  display: inline-block;
  cursor: pointer;
}

.scramble:hover {
  color: #30dfe9;
}

.display-box {
  margin-top: 30vh;
}

@media (orientation: landscape) {
  .scramble {
    margin-top: 10vh;
    margin-bottom: 3%;
  }
}

.select-algset {
  position: absolute;
  top: 1%;
  left: 1%;
}

.select-algs {
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
