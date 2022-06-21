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

.toggleAlgGroups {
  background-color: rgba(255, 255, 255, 0.4);
  border: #000 solid;
  border-radius: 10px;
  font-size: 2vw;
  color: #000;
  height: 4vw;
  padding: 10px;
  margin: 20px;
}

.toggleAlgGroups:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.include, .ignore {
  border: #000 solid;
  border-radius: 10px;
  height: 5vh;
  width: 7.5vh;
}

.include {
  background-color: rgba(0, 255, 0, 0.1);
}

.ignore {
  background-color: rgba(255, 0, 0, 0.3);
}

.include:hover {
  background-color: rgba(0, 255, 0, 0.2);
}

.ignore:hover {
  background-color: rgba(255, 0, 0, 0.6);
}

.restart {
  background-color: rgba(0, 0, 0, 0);
  border: #222 solid 6px;
  border-radius: 10px;
  font-size: 3vw;
  height: 6vw;
  color: #30dfe9;
}

.restart:hover {
  background-color: rgba(0, 200, 0, 0.4);
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
  filter: opacity(100%);
}

.close {
  background: url("../../assets/icons/close.png");
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  height: 3vw;
  width: 3vw;
}

.close:hover {
  background-color: rgba(255, 0, 0, 0.3);
}
</style>