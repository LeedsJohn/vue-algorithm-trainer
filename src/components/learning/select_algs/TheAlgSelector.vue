<template>
  <div>
    <base-button @click="close" class="close" type="close"></base-button>
    <base-button @click="selectAlgset" class="select-algset" type="menu">Select Algorithm Set</base-button>
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
      <div class="grid-container">
        <div v-for="alg in allAlgs" :key="alg.name">
          <div
            class="alg-container"
            :class="[ignored.includes(alg.name) ? 'not-learning' : 'learning']"
            @click="toggleIgnored(alg)"
          >
            <span class="algName">{{ alg.name }}</span>
            <img
              :src="
                require(`../../../assets/scramble_icons/${algset}/${replaceSpace(
                  alg.name
                )}.png`)
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheAlgGroup from "./TheAlgGroup.vue";

export default {
  components: { TheAlgGroup },
  props: ["algTrainer", "algset"],
  emits: ["close", "selectAlgset"],
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
      groupings: require("../../../assets/groupings.json")[this.algset],
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
    close() {
      this.$emit("close");
    },
    selectAlgset() {
      this.$emit("selectAlgset");
    }
  },
};
</script>

<style scoped>
.close {
  position: absolute;
  top: 1%;
  right: 1%;
}

.select-algset {
  position: absolute;
  top: 1%;
  left: 1%;
}

.grid-container {
  display: grid;
  gap: 10px 10px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  padding: 0 8%;
  justify-content: center;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  height: 5.5rem;
  width: 5.5rem;
  padding-bottom: 10px;
}

@media screen and (min-width: 700px) {
  .grid-container {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 13px 13px;
  }
  img {
    height: 7rem;
    width: 7rem;
  }
}

@media screen and (min-width: 1000px) {
  .grid-container {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 16px 16px;
  }
  img {
    height: 8rem;
    width: 8rem;
  }
}

.algName {
  display: block;
  color: #000;
  font-size: 1.25rem;
  text-align: center;
}

.alg-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
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
