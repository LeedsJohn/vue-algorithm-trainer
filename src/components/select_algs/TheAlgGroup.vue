<template>
  <div class="sidebar">
    <base-button
      class="topLeft"
      type="close"
      @click="$emit('closeSide')"
    ></base-button>
    <div class="groups">
      <div class="all-algs">
        <div v-for="(value, key) in groupings" :key="key" class="alg-row">
          <span class="groupName">{{ key }}</span>
          <base-button
            @click="emitIncludeAlgs(value)"
            type="include"
            class="toggle"
            >include</base-button
          >
          <base-button
            @click="emitIgnoreAlgs(value)"
            type="ignore"
            class="toggle"
            >ignore</base-button
          >
        </div>
      </div>
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
      this.$emit("includeAlgs", values);
    },
    emitIgnoreAlgs(values) {
      this.$emit("ignoreAlgs", values);
    },
  },
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

.all-algs {
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  padding-right: 5%;
  padding-left: 10px;
  gap: 30px;
}

.alg-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.groupName {
  color: black;
  font-size: 1.25rem;
  width: 30%;
}

.toggle {
  width: 30%;
  height: 2rem;
}

.topLeft {
  margin: 0;
  padding: 0;
}
</style>
