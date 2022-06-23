<template>
  <Transition>
    <the-alg-group
      v-if="showGroups"
      :algset="algset"
      @closeSide="toggleShowGroups"
      @includeAlgs="(value) => this.toggleSet(value, true)"
      @ignoreAlgs="(value) => this.toggleSet(value, false)"
    ></the-alg-group
  ></Transition>
  <base-button @click="toggleShowGroups" type="toggleAlgGroups"
    >Toggle Groups</base-button
  >
  <div class="center">
    <ul class="grid-container">
      <li v-for="alg in allAlgs" :key="alg.name">
        <div
          class="alg-container"
          :class="[ignored.includes(alg.name) ? 'not-learning' : 'learning']"
          @click="toggleIgnored(alg)"
        >
          <span class="algName">{{ alg.name }}</span>
          <img
            :src="
              require(`../../assets/scramble_icons/${algset}/${replaceSpace(
                alg.name
              )}.png`)
            "
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TheAlgGroup from "./TheAlgGroup.vue";

export default {
  components: { TheAlgGroup },
  props: ["algTrainer", "algset"],
  mounted() {
    this.allAlgs = this.algTrainer.getAllAlgs();
    for (let i = 0; i < this.algTrainer.boxes[6].length(); i++) {
      this.ignored.push(this.algTrainer.boxes[6].algorithms[i].getName());
    }
  },
  data() {
    return {
      allAlgs: null,
      ignored: [],
      groupings: require("../../assets/groupings.json")[this.algset],
      showGroups: false,
    };
  },
  methods: {
    toggleIgnored(alg) {
      if (this.ignored.includes(alg.name)) {
        this.removeFromIgnored(alg);
      } else {
        this.addToIgnored(alg);
      }
    },
    addToIgnored(alg) {
      this.ignored.push(alg.name);
      this.algTrainer.ignoreAlg(alg);
    },
    removeFromIgnored(alg) {
      this.ignored = this.ignored.filter((e) => e !== alg.name);
      this.algTrainer.unignoreAlg(alg);
    },
    toggleSet(values, include) {
      if (values[0] === "all") {
        values = this.algTrainer.getAllAlgs(true);
      }
      if (include) {
        values.forEach((algName) => {
          const alg = this.algTrainer.getAlgFromName(algName);
          this.removeFromIgnored(alg);
        });
      } else {
        values.forEach((algName) => {
          const alg = this.algTrainer.getAlgFromName(algName);
          this.addToIgnored(alg);
        });
      }
    },
    toggleShowGroups() {
      this.showGroups = !this.showGroups;
    },
    replaceSpace(name) {
      return name.replace(/ /g, "_");
    },
  },
};
</script>

<style scoped>
.center {
  margin-right: auto;
  margin-left: auto;
  width: 90vw;
}

.grid-container {
  display: grid;
  gap: 10px 10px;
  grid-template-columns: 25vw 25vw 25vw;
  justify-content: center;
}

@media screen and (min-width: 700px) {
  .grid-container {
    grid-template-columns: 20vw 20vw 20vw 20vw;
  }
}

@media screen and (min-width: 1000px) {
  .grid-container {
    grid-template-columns: 15vw 15vw 15vw 15vw 15vw;
  }
}

li {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 0px;
}

.algName {
  display: block;
  color: #000;
  font-size: 1.25rem;
  text-align: center;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 5px;
  height: 60%;
  width: 60%;
}

.alg-container {
  width: 100%;
  cursor: pointer;
  border: #000 solid;
  border-radius: 10px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}

.alg-container:hover {
  filter: opacity(80%);
}

.alg-container.learning {
  background-color: rgba(0, 255, 0, 0.1);
}

.alg-container.not-learning {
  background-color: rgba(255, 0, 0, 0.3);
}

.learning img {
  filter: grayscale(0%);
}

.not-learning img {
  filter: grayscale(90%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(300px);
}
</style>
