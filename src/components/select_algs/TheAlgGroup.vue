<template>
  <div class="sidebar">
    <base-button class="topLeft" type="close" @click="$emit('closeSide')"></base-button>
    <div class="groups">
      <ul>
        <li v-for="(value, key) in groupings" :key="key">
          <span class="groupName">{{ key }}</span>
          <base-button @click="emitIncludeAlgs(value)" type="include">include</base-button>
          <base-button @click="emitIgnoreAlgs(value)" type="ignore">ignore</base-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["algset"],
  emits: ["closeSide", "includeAlgs", "ignoreAlgs"],
  data() {
    return {
      groupings: require("../../assets/groupings.json")[this.algset],
    };
  },
  methods: {
    emitIncludeAlgs(values) {
      this.$emit('includeAlgs', values);
    },
    emitIgnoreAlgs(values) {
      this.$emit('ignoreAlgs', values);
    }
  }
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 300px;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  overflow-x: hidden;
  background-color: rgba(50, 179, 217, 0.9);
}

.groups {
  position: absolute;
  width: 300px;
  margin-top: 18%;
}
ul {
  display: grid;
  grid-template-columns: 100%;
  row-gap: 20px;
}

li {
  list-style: none;
  display: grid;
  justify-items: start;
  column-gap: 5px;
  grid-template-columns: 45% 25% 20%;
}

.groupName {
  color: black;
  font-size: 1.25rem;
}

.topLeft {
  margin: 0;
  padding: 0;
}
</style>
