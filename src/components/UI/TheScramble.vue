<template>
  <p>{{ algName }}</p>
  <p>{{ scramble }}</p>
  <button @click="poop">PEE!</button>
</template>

<script>
import WV from "../../assets/scrambles/WV.json";

export default {
  data() {
    return {
      algNames: null,
      scrambles: WV,
      algName: "name",
      scramble: "scramble",
    };
  },
  methods: {
    poop() {
      this.algName =
        this.algNames[Math.floor(Math.random() * this.algNames.length)];
      const scrambleList = this.scrambles[this.algName];
      this.scramble =
        scrambleList[Math.floor(Math.random() * scrambleList.length)];
    },
  },
  mounted() {
    const names = Object.keys(this.scrambles);
    this.algNames = names;
  },
};
</script>
