<template>
  <div class="boxes-container">
    <div v-for="i in 5" :key="i">
      <display-box :algs="this.boxes[i-1]" :algTrainer="this.algTrainer"></display-box>
    </div>
  </div>
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
.boxes-container {
  display: grid;
  grid-template-columns: 25vw 25vw;
  grid-template-rows: 25vw 25vw 25vw;
  gap: 30px 30px;
  margin-left: 2%;
}

@media screen and (min-width: 600px) {
  .boxes-container {
    grid-template-columns: 16vw 16vw 16vw;
    grid-template-rows: 16vw 16vw;
    gap: 30px 30px;
  }
}

@media screen and (min-width: 1000px) {
  .boxes-container {
    grid-template-columns: 12vw 12vw 12vw 12vw 12vw;
    grid-template-rows: 12vw;
    gap: 40px;
  }
}

li {
  list-style: none;
  display: inline;
}
</style>