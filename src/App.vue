<template>
  <div id="app">
    <Topo />
  </div>
</template>

<script>
import Topo from './components/Topo'

export default {
  name: 'App',
  components: {
    Topo
  }
}
</script>

<style>
body {
  margin: 0;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
