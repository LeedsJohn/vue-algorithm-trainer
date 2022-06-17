<template>
  <div class="background">
    <div :class="['content', type]">
      <base-button class="close" @click="close">Hide</base-button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      className: this.type,
    }
  },
  methods: {
    close() {
      console.log(this.className);
      console.log(this.type)
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.content {
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background-color: #00a1d7;
  border-radius: 20px;
}

.screen {
  height: 80%;
  width: 80%;
}

.alert {
  height: 20%;
  width: 30%;
}

.close {
  position: absolute;
  top: 2%;
  right: 2%;
}
</style>
