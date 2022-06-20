<template>
  <div class="sidebar">
    <base-button class="topLeft" type="close" @click="$emit('closeSide')"></base-button>
    <div class="groups">
      <ul>
        <li v-for="(value, key) in groupings" :key="key">
          <span class="groupName">{{ key }}</span>
          <base-button @click="$emit('includeAlgs', '{{ key }}', '{{ value }}')">all</base-button>
          <base-button @click="$emit('ignoreAlgs', key, value)">ignore</base-button>
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
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 20vw;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  overflow-x: hidden;
  background-color: rgba(50, 179, 217, 0.9);
}

.groups {
  position: absolute;
  right: 0px;
  width: 20vw;
  display: grid;
  margin-top: 18%;
}

li {
  list-style: none;
  display: grid;
  gap: 10px;
  grid-template-columns: 50% 20% 20%;
}

.groupName {
  color: black;
  font-size: 1.5vw;
}

.topLeft {
  margin: 0;
  padding: 0;
}
</style>
