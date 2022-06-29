<template>
  <button :class="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ["type"],
};
</script>

<style scoped>
button {
  cursor: pointer;
}

.menu {
  background-color: rgba(0, 0, 0, 0);
  border: #000 solid;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 550;
  height: 3rem;
  filter: opacity(50%);
  color: #dbf2f3;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}

.menu:hover {
  filter: opacity(100%);
}

.toggleAlgGroups {
  background-color: rgba(255, 255, 255, 0.4);
  border: #000 solid;
  border-radius: 10px;
  font-size: 1.5rem;
  color: #000;
  height: 100%;
  padding: 10px;
  margin: 30px auto 10px auto;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.5);
}

.toggleAlgGroups:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.include,
.ignore {
  border: #000 solid;
  border-radius: 10px;
  height: 125%;
  width: 100%;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.5);
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

.correct,
.wrong {
  border: #000 solid;
  height: 16vh;
}

.correct {
  background-color: rgba(30, 192, 110, 0.8);
  width: 60vw;
}

.correct:active {
  background-color: rgba(30, 192, 110, 0.4);
}

.wrong {
  background-color: rgba(214, 59, 49, 0.8);
  width: 40vw;
}

.wrong:active {
  background-color: rgba(214, 59, 49, 0.4);
}

.restart {
  background-color: rgba(0, 0, 0, 0);
  border: #222 solid 6px;
  border-radius: 10px;
  font-size: 2.5rem;
  padding: 1% 0.5%;
  color: #30dfe9;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.5);
}

.restart:hover {
  background-color: rgba(0, 200, 0, 0.4);
}

.helpbutton {
  background: url("../../assets/icons/help.png");
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  width: 4rem;
  height: 4rem;
  position: fixed;
  bottom: 2%;
  right: 2%;
  filter: opacity(50%);
}

.helpbutton:hover {
  filter: opacity(100%);
}

.close,
.deleteSolution {
  background: url("../../assets/icons/close.png");
  background-repeat: no-repeat;
  background-size: contain;
  border: none;
  color: rgba(0, 0, 0, 0);
}

.close {
  height: 2.4rem;
  width: 2.4rem;
}

.deleteSolution {
  height: 1.5rem;
  width: 1.5rem;
}

.close:hover,
.deleteSolution:hover {
  background-color: rgba(255, 0, 0, 0.3);
}
</style>
