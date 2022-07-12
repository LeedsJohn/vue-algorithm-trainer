<template>
  <base-foreground type="screen" @close="close">
    <p v-for="alg in suggestions" :key="alg">
      {{ alg }}
    </p>
  </base-foreground>
</template>

<script>
export default { 
  props: ["algSet", "algNames"],
  emits: ["close"],
  mounted() {
    for (const alg of this.algNames) {
      if (localStorage[`${this.algSet}${alg}Wrong`] === '1') {
        this.suggestions.push(alg);
      }
    }
  },
  data() {
    return {
      suggestions: [],
    }
  },
  methods: {
    close() {
      this.$emit("close");
    }
  },
}
</script>