<template>
  <base-foreground>
    <h2>{{ algName }}</h2>
    <ol>
      <li v-for="userSolution in userSolutions" :key="userSolution">
        {{ userSolution }}
        <button @click="deleteSolution(userSolution)">delete</button>
      </li>
      <li v-for="solution in solutions" :key="solution">
        {{ solution }}
      </li>
    </ol>
    <input v-model.trim="userInput" />
    <button @click="addSolution">submitaonsetaonste</button>
  </base-foreground>
</template>

<script>
import BaseForeground from "../UI/BaseForeground.vue";

export default {
  components: {
    BaseForeground,
  },
  props: ["algName", "solutions"],
  data() {
    return {
      userInput: "",
      userSolutions: [],
    };
  },
  mounted() {
    this.updateUserSolutions();
  },
  methods: {
    addSolution() {
      if (this.userInput) {
        if (localStorage[this.algName]) {
          localStorage[this.algName] = `${this.userInput.replace(
            "*#*",
            ""
          )}*#*${localStorage[this.algName]}`;
        } else {
          localStorage[this.algName] = this.userInput.replace("*#*", "");
        }
      }
      this.userInput = "";
      this.updateUserSolutions();
    },
    deleteSolution(sol) {
      localStorage[this.algName] = localStorage[this.algName]
        .replace(sol, "")
        .replace("*#**#*", "*#*");
      if(localStorage[this.algName].slice(0, 3) === "*#*") {
        localStorage[this.algName] = localStorage[this.algName].slice(3);
      }
      this.updateUserSolutions();
    },
    updateUserSolutions() {
      this.userSolutions = localStorage[this.algName]
        ? localStorage[this.algName].split("*#*")
        : [];
    },
  },
};
</script>

<style scoped>
ol {
  height: 60vh;
  width: 60vw;
}
</style>
