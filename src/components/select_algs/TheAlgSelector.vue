<template>
  <ul v-for="(value, key) in groupings" :key="key">
    <li @click="toggleSet(key, value)">
      <base-button>
        {{ key }}
      </base-button>
    </li>
  </ul>
  <ul>
    <li v-for="alg in allAlgs" :key="alg.name">
      <span class="algName">{{ alg.name }}</span>
      <img
        :class="[ ignored.includes(alg.name) ? 'not-learning' : 'learning' ]"
        @click="toggleIgnored(alg)"
        :src="require(`../../assets/scramble_icons/${algset}/${replaceSpace(alg.name)}.png`)"
      />
    </li>
  </ul>
</template>

<script>
export default {
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
      ignoredSets: [],
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
    toggleSet(name, values) {
      if (values[0] === "all") {
        values = this.algTrainer.getAllAlgs(true);
      }
      if (this.ignoredSets.includes(name)) {
        this.ignoredSets = this.ignoredSets.filter((e) => e !== name);
        values.forEach((algName) => {
          const alg = this.algTrainer.getAlgFromName(algName);
          this.removeFromIgnored(alg);
        });
      } else {
        this.ignoredSets.push(name);
        values.forEach((algName) => {
          const alg = this.algTrainer.getAlgFromName(algName);
          this.addToIgnored(alg);
        });
      }
    },
    replaceSpace(name) {
      return name.replace(" ", "_");
    }
  },
};
</script>

<style scoped>
ul {
  margin: 0 5%;
  text-align: center;
}

li {
  display: inline-block;
  vertical-align: top;
  margin: 1% 2%;
}

.algName {
  display: block;
  color: #000;
  font-size: 30px;
  text-align: center;
}

img {
  height: 130%;
  width: 130%;
  cursor: pointer;
}

.learning {
  filter: grayscale(0%);
}

.not-learning {
  filter: grayscale(70%);
}
</style>
