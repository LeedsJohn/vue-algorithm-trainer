<template>
  <base-foreground type="screen" @close="close">
    <h1>Suggested Algorithms</h1>
    <h2>Click to toggle</h2>
    <div>
      <p
        class="alg"
        :class="alg.include ? 'include' : 'ignore'"
        v-for="alg in suggestions"
        @click="toggleAlg(alg)"
        :key="alg.name"
      >
        {{ alg.name }} ({{ alg.reason.join(", ") }})
      </p>
    </div>
    <div class="buttons">
      <button @click="close" class="ignore-button">Ignore Suggestions</button>
      <button @click="useSuggestions" class="train-button">
        Train Suggested Algorithms
      </button>
    </div>
  </base-foreground>
</template>

<script>
export default {
  props: ["algSet", "algNames"],
  emits: ["close", "useSuggestions"],
  mounted() {
    for (const alg of this.algNames) {
      const data = { name: alg, include: true, reason: [] };
      if (localStorage[`${this.algSet}${alg}Wrong`] === "1") {
        data.reason.push("incorrect response");
      }
      if (localStorage[`${this.algSet}${alg}Time`] === "1") {
        data.reason.push("slow response time");
      }
      if (data.reason.length !== 0) {
        this.suggestions.push(data);
      }
    }
  },
  data() {
    return {
      suggestions: [],
    };
  },
  methods: {
    toggleAlg(alg) {
      alg.include = !alg.include;
    },
    close() {
      this.$emit("close");
    },
    useSuggestions() {
      const use = [];
      for (const alg of this.suggestions) {
        if (alg.include) {
          use.push(alg.name);
        }
      }
      if (use.length !== 0) {
        this.$emit("useSuggestions", use);
      } else {
        this.$emit("close");
      }
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
  margin: 25px 40px 0 40px;
}

h2 {
  font-size: 1.2rem;
  margin-top: 10px;
  margin-bottom: 0;
}

.include {
  color: #363;
  font-weight: 700;
}

.ignore {
  color: #c33;
  font-weight: 700;
  font-style: italic;
}

.alg {
  text-align: left;
  margin: 10px 0;
}

.alg:hover {
  cursor: pointer;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  column-gap: 1rem;
  min-height: 300px;
  padding-top: 0;
}

.ignore-button,
.train-button {
  border: black solid 3px;
  border-radius: 1rem;
  height: 3rem;
  width: 15rem;
  font-size: 1rem;
  background: none;
  font-family: inherit;
}

.ignore-button:hover,
.train-button:hover {
  cursor: pointer;
}

.ignore-button {
  background-color: rgba(255, 0, 0, 0.4);
}

.train-button {
  background-color: rgba(0, 100, 0, 0.5);
}

.ignore-button:hover {
  background-color: rgba(255, 0, 0, 0.8);
}

.train-button:hover {
  background-color: rgba(0, 200, 0, 0.6);
}
</style>
