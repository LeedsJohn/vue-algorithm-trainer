<template>
  <div>
    <base-button class="select-algset" type="menu" @click="selectAlgset"
      >Select Algorithm Set</base-button
    >
    <p class="finished">Good job!</p>
    <base-button @click="restart" type="restart">Restart</base-button>
  </div>
</template>

<script>
export default {
  emits: ["restart", "selectAlgset"],
  methods: {
    restart() {
      this.$emit("restart");
    },
    selectAlgset() {
      this.$emit("selectAlgset");
    }
  }
}
</script>

<style scoped>
.finished {
  color: #60ffff;
  font-size: 5rem;
  font-weight: 700;
  font-style: italic;
}
.select-algset {
  position: absolute;
  top: 1%;
  left: 1%;
}

</style>