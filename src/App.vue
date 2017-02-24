<template>
  <div id="app">
     <h1>{{msg}}</h1>
     <mines-sweeper></mines-sweeper>
  </div>
</template>

<script>

import MinesSweeper from './MinesSweeper.vue'

export default {
  name: 'app',
  data () {
    return {
      msg: 'MINES SWEEPER'
    }
  },
  components : {
    MinesSweeper
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;

  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}


</style>
