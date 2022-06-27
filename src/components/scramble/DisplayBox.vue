<template>
  <div class="box-container">
    <ul>
      <li v-for="i in numAlgs" :key="i">
        <span :class="getClass(this.algs[i-1])">{{
          fixName(this.algs[i - 1].getName())
        }}</span
        ><span v-if="i !== algs.length" class="comma" :class="getClass(this.algs[i-1])">, </span>
      </li>
      <li v-if="algs.length > 10">...</li>
    </ul>
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
  computed: {
    numAlgs() {
      if (this.algs) {
        return Math.min(this.algs.length, 10);
      }
      return 10;
    },
  },
};
</script>

<style scoped>
.box-container {
  width: 100%;
  height: 100%;
  position: relative;
  border: solid #000;
  border-radius: 10%;
  display: inline-block;
  padding: 3px;
}
ul {
  display: inline;
}
li {
  list-style: none;
  display: inline;
  font-weight: 600;
  font-size: 0.85rem;
  float: left;
  margin: 0 3px;
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

.comma {
  margin-right: 2px;
}
</style>
