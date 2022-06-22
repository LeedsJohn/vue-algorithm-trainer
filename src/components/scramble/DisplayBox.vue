<template>
  <div class="box-container">
    <ul>
      <li v-for="i in numAlgs" :key="i">
        {{ this.algNames[i-1] }}<span v-if="i !== algNames.length">, </span>
      </li>
      <li v-if="algNames.length > 10">...</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["algNames"],
  computed: {
    numAlgs() {
      return Math.min(this.algNames.length, 10);
    }
  }
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
  }
  ul {
    display: inline;
  }
  li {
    list-style: none;
    display: inline;
    font-weight: 600;
    font-size: 1.1vw;
    float: left;
    margin: 0 3px;
  }

  span {
    margin-right: 2px;
  }
</style>