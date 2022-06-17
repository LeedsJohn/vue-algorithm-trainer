<template>
  <ul v-for="set in algSets" :key="set.file">
    <li>
      <base-button @click="selectSet(set.name)">{{ set.name }}</base-button>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      algSets: [
        {
          name: "Winter Variation",
          file: "WV.js",
        },
      ],
    };
  },
  methods: {
    selectSet(fileName) {
      this.$emit('selectSet', fileName);
    }
  }
};
</script>
