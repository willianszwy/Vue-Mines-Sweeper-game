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
  font-family: 'Amatica SC', cursive;
  text-align: center;
  color: #fff;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 10px;
  box-sizing: border-box;

  h1 {
    font-size: 3.5em;
    margin: 10px 0 20px 0;
    
    // Responsividade do título
    @media (max-width: 768px) {
      font-size: 2.5em;
      margin: 5px 0 15px 0;
    }
    
    @media (max-width: 480px) {
      font-size: 2em;
      margin: 5px 0 10px 0;
    }
  }
}

body {
  background: #337d8a;
  color: #fff;
  font-size: 16px;
  margin: 0;
  padding: 0;
  overflow-x: auto; // Permitir scroll horizontal se necessário
}

// Reset global para melhor controle mobile
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent; // Remove highlight azul no touch
}
</style>
