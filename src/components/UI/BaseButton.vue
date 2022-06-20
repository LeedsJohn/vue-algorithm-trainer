<template>
  <button :class="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type"]
}
</script>

<style scoped>
button {
  cursor: pointer;
}

.menu {
  background-color: rgba(0, 0, 0, 0);
  border: #000 solid;
  border-radius: 10px;
  font-size: 1vw;
  height: 3vw;
  filter: opacity(50%);
  color: #30dfe9;
}

.menu:hover {
  filter: opacity(100%);
}

.helpbutton {
  background: url("../../assets/icons/help.png");
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  width: 6vw;
  height: 6vw;
  position: fixed;
  bottom: 2%;
  right: 2%;
  filter: opacity(50%);
}

.helpbutton:hover {
  /* filter: opacity(50%); */
  filter: opacity(100%);
}
</style>