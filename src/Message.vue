<template>
  <div class="msg" v-show="show">
         <h1 v-bind:class="{ win: green}">{{message}}</h1>
         <img src="src/assets/dead.png" v-show="!green">
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
       position: absolute;
       right: 0;
       top: 0;
       background-color: rgba(10, 10, 10, 0.60);

       h1 {
          color: #FF5722;
          margin: 0;

          &.win {
            color: #4CAF50 !important;
          }
       }
  } 


</style>