<template>
  <base-foreground type="screen" @close="close">
  <h1>Suggested Algorithms</h1>
    <div>
      <p class="algName" v-for="alg in suggestions" :key="alg">
        {{ alg }}
      </p>
    </div>
  </base-foreground>
</template>

<script>
export default {
  props: ["algSet", "algNames"],
  emits: ["close"],
  mounted() {
    for (const alg of this.algNames) {
      if (localStorage[`${this.algSet}${alg}Wrong`] === "1") {
        this.suggestions.push(alg);
      }
    }
  },
  data() {
    return {
      suggestions: [],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
div {
  padding: 2%;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 0;
}

.algName {
  text-align: left;
  margin: 10px 0;
}
</style>
