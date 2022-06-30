<template>
  <div class="boxes-container">
    <div v-for="i in 5" :key="i">
      <div class="box-container">
        <div class="title">
          <h2>{{ titles[i - 1] }}</h2>
        </div>
        <display-box
          :algs="this.boxes[i - 1]"
          :algTrainer="this.algTrainer"
        ></display-box>
      </div>
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
  data() {
    return {
      titles: [
        "Unseen",
        "Wrong",
        "Currently Learning",
        "Ready for Review",
        "Learned",
      ],
    };
  },
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
    },
  },
};
</script>

<style scoped>
.boxes-container {
  display: grid;
  grid-template-columns: 25vw 25vw;
  grid-template-rows: repeat(3, calc(25vw + 3rem));
  gap: 0 20px;
  margin-left: 2%;
}

.box-container {
  display: grid;
  grid-template-rows: 3rem 25vw;
}

@media screen and (min-width: 600px) {
  .boxes-container {
    grid-template-columns: 16vw 16vw 16vw;
    grid-template-rows: repeat(2, calc(16vw + 3rem));
  }

  .box-container {
    grid-template-rows: 3rem 16vw;
  }
}

@media screen and (min-width: 1000px) {
  .boxes-container {
    grid-template-columns: 12vw 12vw 12vw 12vw 12vw;
    grid-template-rows: calc(12vw + 3rem);
    gap: 30px;
  }

  .box-container {
    display: grid;
    grid-template-rows: 3rem 12vw;
  }
}

.title {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.title h2 {
  margin: 0;
  font-size: 1rem;
  filter: opacity(80%);
}
</style>
