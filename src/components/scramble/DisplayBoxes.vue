<template>
  <ul>
    <li v-for="i in 5" :key="i">
      <display-box :algs="this.boxes[i-1]" :algTrainer="this.algTrainer"></display-box>
    </li>
  </ul>
</template>

<script>
import DisplayBox from "./DisplayBox.vue";
export default {
  components: {
    DisplayBox,
  },
  props: ["algTrainer"],
  computed: {
    boxes() {
      const arr = [];
      arr.push(this.algTrainer.getAllAlgs(false, 0));
      arr.push(this.algTrainer.getAllAlgs(false, 1));
      arr.push(this.algTrainer.getAllAlgs(false, 2, 3));
      arr.push(this.algTrainer.getAllAlgs(false, 4));
      arr.push(this.algTrainer.getAllAlgs(false, 5));
      return arr;
    },
  },
  methods: {
    getClass(alg) {
      return alg;
    }
  }
};
</script>

<style scoped>
ul {
  /* margin-top: 30vh; */
  display: grid;
  grid-template-columns: 25vw 25vw;
  grid-template-rows: 25vw 25vw 25vw;
  gap: 18px 18px;
}

@media screen and (min-width: 600px) {
  ul {
    grid-template-columns: 16vw 16vw 16vw;
    grid-template-rows: 16vw 16vw;
    gap: 10px 20px;
  }
}

@media screen and (min-width: 1000px) {
  ul {
    grid-template-columns: 12vw 12vw 12vw 12vw 12vw;
    grid-template-rows: 12vw;
  }
}

li {
  list-style: none;
  display: inline;
}
</style>