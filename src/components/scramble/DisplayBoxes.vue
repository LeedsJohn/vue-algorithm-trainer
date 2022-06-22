<template>
  <ul>
    <li v-for="i in 5" :key="i">
      <display-box :initAlgNames="this.boxes[i-1]"></display-box>
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
      arr.push(this.algTrainer.getAllAlgs(true, 0));
      arr.push(this.algTrainer.getAllAlgs(true, 1));
      arr.push(this.algTrainer.getAllAlgs(true, 2, 3));
      arr.push(this.algTrainer.getAllAlgs(true, 4));
      arr.push(this.algTrainer.getAllAlgs(true, 5));
      console.log("Recomputing boxes");
      console.log(arr);
      return arr;
    },
  },
};
</script>

<style scoped>
ul {
  position: absolute;
  bottom: 10%;
  display: grid;
  grid-template-columns: 10vw 10vw 10vw 10vw 10vw;
  grid-template-rows: 10vw;
  column-gap: 2%;
}

li {
  list-style: none;
  display: inline;
}
</style>