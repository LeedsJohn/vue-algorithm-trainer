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

/* CSS */
/* https://getcssscan.com/css-buttons-examples */
/* button {
  appearance: button;

}

.button-9:disabled {
  cursor: default;
}

.button-9:focus {
  box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .2) 0 6px 15px 0, rgba(0, 0, 0, .1) 0 2px 2px 0, rgba(50, 151, 211, .3) 0 0 0 4px;
} */
</style>