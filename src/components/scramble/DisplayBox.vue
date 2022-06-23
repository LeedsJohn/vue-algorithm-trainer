<template>
  <div class="box-container">
    <ul>
      <li v-for="i in numAlgs" :key="i">
        {{ this.algNames[i - 1] }}<span v-if="i !== algNames.length">, </span>
      </li>
      <li v-if="algNames.length > 10">...</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["initAlgNames"],
  computed: {
    algNames() {
      const arr = this.initAlgNames.map((name) => {
        const firstFour = name.slice(0, 4);
        if (firstFour === "CMLL" || firstFour === "ZBLL") {
          return name.slice(5);
        } else {
          return name;
        }
      });
      return arr;
    },
    numAlgs() {
      if (this.algNames) {
        return Math.min(this.algNames.length, 10);
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
  box-shadow: 3px 3px rgba(0, 0, 0, 0.5);
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

span {
  margin-right: 2px;
}
</style>
