<template>
  <div class="box-container">
    <div class="overflow-protection">
      <span v-for="i in algs.length" :key="this.algs[i-1].name">
        <span :class="getClass(this.algs[i-1])">{{
          fixName(this.algs[i - 1].getName())
        }}<span v-if="i < algs.length">, </span></span>
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
  width: 95%;
  height: 95%;
  border: 0.18rem solid #000;
  border-radius: 10%;
  padding: 2.5%;
  overflow: hidden;
}

.overflow-protection {
  -webkit-column-width: 200vw;
  -moz-column-width: 200vw;
  column-width: 200vw;
  height: 100%;
}

.zero {
  color: rgba(0, 0, 0, 0.5);
}

.one {
  color: rgb(200, 0, 0);
  font-weight: 600;
}

.two {
  color: rgb(160, 0, 0);
}

.three {
  color: rgb(200, 200, 200);
}

.four {
  color: rgb(85, 220, 85);
}

.five {
  color: rgb(85, 237, 85);
}

.six {
  color: rgb(0, 255, 0);
}

.seven {
  color: rgb(0, 255, 0);
  font-weight: 600;
}

</style>
