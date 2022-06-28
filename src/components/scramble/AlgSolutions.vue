<template>
  <base-foreground>
    <ol>
      <li v-for="solution in solutions" :key="solution">
        {{ solution }}
      </li>
    </ol>
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
ol {
  height: 60vh;
  width: 60vw;
}
</style>