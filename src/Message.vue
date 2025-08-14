<template>
  <div class="msg" v-show="show">
         <h1 v-bind:class="{ win: green}">{{message}}</h1>
         <img src="/assets/dead.png" v-show="!green">
  </div>
</template>

<script>

export default {
  name: 'message',
  props: ['message', 'show', 'green']
}
</script>

<style lang="scss">

.msg {
  text-align: center;
  color: red;
  font-size: 2em;
  font-weight: 900;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  overflow: hidden;
  z-index: 1986;
  
  bottom: 0;
  left: 0;
  position: fixed; // Fixed para garantir que cubra toda a tela em mobile
  right: 0;
  top: 0;
  background-color: rgba(10, 10, 10, 0.60);
  padding: 20px;
  
  // Responsividade do overlay
  @media (max-width: 768px) {
    font-size: 1.8em;
    padding: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5em;
    padding: 10px;
  }
  
  h1 {
    color: #FF5722;
    margin: 0 0 20px 0;
    font-size: 1.2em;
    
    // Responsividade do título
    @media (max-width: 768px) {
      font-size: 1.1em;
      margin: 0 0 15px 0;
    }
    
    @media (max-width: 480px) {
      font-size: 1em;
      margin: 0 0 10px 0;
    }
    
    &.win {
      color: #4CAF50 !important;
    }
  }
  
  img {
    max-width: 150px;
    height: auto;
    
    // Responsividade da imagem
    @media (max-width: 768px) {
      max-width: 120px;
    }
    
    @media (max-width: 480px) {
      max-width: 100px;
    }
  }
}

</style>