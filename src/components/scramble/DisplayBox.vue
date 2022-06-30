<template>
  <div class="box-container">
    <div class="overflow-protection">
      <span v-for="i in algs.length" :key="this.algs[i-1].name">
        <span :class="getClass(this.algs[i-1])">{{
          fixName(this.algs[i - 1].getName())
        }}, </span>
      </span>
      </div>
  </div>
</template>

<script>
export default {
  props: ["algs", "algTrainer"],
  methods: {
    fixName(algName) {
      if (algName.slice(0, 4) === "CMLL" || algName.slice(0, 4) === "ZBLL") {
        return algName.slice(5);
      }
      return algName;
    },
    getClass(alg) {
      const classes = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
      ];
      const box = this.algTrainer._findAlgBox(alg);
      if (box < 3) {
        return classes[box];
      }
      if (box >= 4) {
        return classes[box + 2];
      }
      if (alg.getStreak() === 0) {
        return "three";
      }
      if (alg.getStreak() === 1) {
        return "four";
      }
      return "five";
    },
  },
};
</script>

<style scoped>
.box-container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  border: solid #000;
  border-radius: 10%;
  padding: 10px;
  overflow: hidden;
}

.overflow-protection {
  -webkit-column-width: 200vw;
  -moz-column-width: 200vw;
  column-width: 200vw;
  height: 100%;
}

.zero {
  color: #2c3e50;
}

.one {
  color: #d00;
}

.two {
  color: #a30;
}

.three {
  color: #860;
}

.four {
  color: #680;
}

.five {
  color: #3a0;
}

.six {
  color: #1c0;
}

.seven {
  color: #0f0;
}

</style>
