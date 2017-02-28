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
      msg: '.: MINESWEEPER :. '
    }
  },
  components : {
    MinesSweeper
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Amatica SC';
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #fff;
  margin-top: 20px;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  h1 {
    font-size: 3.5em;
  }

  
}

body {
   background: #1a4148;
   color: #fff;
   font-size: 16px;
}


</style>
