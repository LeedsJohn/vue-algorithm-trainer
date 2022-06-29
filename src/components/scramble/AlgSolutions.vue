<template>
  <base-foreground>
    <h2>{{ algName }}</h2>
    <ol>
      <li v-for="userSolution in userSolutions" :key="userSolution">
        <div class="solution">
          {{ userSolution }}
          <base-button
            type="deleteSolution"
            class="delete"
            @click="deleteSolution(userSolution)"
          ></base-button>
        </div>
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
      this.userInput = this.userInput.substring(0, 50);
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
      this.cropSolutions();
      this.updateUserSolutions();
    },
    deleteSolution(sol) {
      localStorage[this.algName] = localStorage[this.algName]
        .replace(sol, "")
        .replace("*#**#*", "*#*");
      if (localStorage[this.algName].slice(0, 3) === "*#*") {
        localStorage[this.algName] = localStorage[this.algName].slice(3);
      }
      this.updateUserSolutions();
    },
    updateUserSolutions() {
      this.userSolutions = localStorage[this.algName]
        ? localStorage[this.algName].split("*#*")
        : [];
    },
    cropSolutions() {
      if (this.occurrences(localStorage[this.algName], "*#*") >= 5) {
        console.log(`BEFORE: ${localStorage[this.algName]}`);
        const endIndex = localStorage[this.algName]
          .split("*#*", 5)
          .join("*#*").length;
        localStorage[this.algName] = localStorage[this.algName].substring(
          0,
          endIndex
        );
        console.log(`AFTER: ${localStorage[this.algName]}`);
      }
    },
    /** Function that count occurrences of a substring in a string;
     * @param {String} string               The string
     * @param {String} subString            The sub string to search for
     * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
     *
     * @author Vitim.us https://gist.github.com/victornpb/7736865
     * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
     * @see https://stackoverflow.com/a/7924240/938822
     */
    occurrences(string, subString, allowOverlapping) {
      string += "";
      subString += "";
      if (subString.length <= 0) return string.length + 1;

      var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

      const t = 0;
      while (t < 1) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
          ++n;
          pos += step;
        } else break;
      }
      return n;
    },
  },
};
</script>

<style scoped>
ol {
  height: 60vh;
  width: 60vw;
  text-align: left;
}

li {
  margin-left: 2%;
  font-size: 1.2rem;
  margin: 8px;
}

.solution {
  width: 60%;
  display: flex;
  justify-content: space-between;
}
/* .delete {
  justify-items: right;
} */
</style>
