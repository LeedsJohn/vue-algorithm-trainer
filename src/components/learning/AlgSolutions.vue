<template>
  <base-foreground>
    <h2>{{ algName }}</h2>
    <div class="solutions">
      <div
        class="user-solution"
        v-for="userSolution in userSolutions"
        :key="userSolution"
      >
        <base-button
          type="deleteSolution"
          @click="deleteSolution(userSolution)"
        ></base-button>
        <span>{{ userSolution }}</span>
      </div>
      <div class="default-solution" v-for="i in solutions.length" :key="i">
        <span class="index">{{ i }}. </span>
        <span>{{ solutions[i - 1] }}</span>
      </div>
    </div>
    <input
      class="inputBox"
      placeholder="Add solution..."
      v-model.trim="userInput"
    />
    <button class="submit" @click="addSolution">Add solution</button>
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
        const endIndex = localStorage[this.algName]
          .split("*#*", 5)
          .join("*#*").length;
        localStorage[this.algName] = localStorage[this.algName].substring(
          0,
          endIndex
        );
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
.solutions {
  height: 60vh;
  width: 60vw;
  text-align: left;
}

.user-solution,
.default-solution {
  font-size: 1.2rem;
}

.user-solution {
  margin: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.default-solution {
  margin: 8px;
}

.index {
  display: inline-block;
  width: 2rem;
}

.inputBox {
  height: 1rem;
  width: 20rem;
  background-color: rgba(255, 255, 255, 0.4);
  border: #000 solid;
  border-radius: 20rem;
  box-shadow: 4px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 10px;
  font-family: inherit;
  font-size: inherit;
}

.submit {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
  border: #000 solid;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 550;
  height: 2.5rem;
  filter: opacity(100%);
  box-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}

.submit:hover {
  filter: opacity(60%);
}
</style>
