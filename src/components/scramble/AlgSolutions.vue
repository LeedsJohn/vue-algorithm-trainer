<template>
  <base-foreground>
    <ul>
      <li v-for="solution in solutions" :key="solution">
        {{ solution }}
      </li>
    </ul>
  </base-foreground>
</template>

<script>
import BaseForeground from "../UI/BaseForeground.vue";

export default {
  components: {
    BaseForeground,
  },
  props: ["solutions"],
}
</script>

<style scoped>
ul {
  height: 60vh;
  width: 60vw;
}
</style>