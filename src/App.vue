<template>
  <the-scramble></the-scramble>
</template>

<script>
import TheScramble from './components/scramble/TheScramble.vue';

export default {
  name: 'App',
  components: {
    TheScramble,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
