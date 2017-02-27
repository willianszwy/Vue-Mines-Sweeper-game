<template>
  <div class="msg" v-show="show">
         <p v-bind:class="{ win: green}">{{message}}</p>
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
       font-family: Helvetica, Arial, sans-serif;
       text-align: center;
       color: red;
       font-size: 5em;
       font-weight: 900;

      
       display: flex;
       
       justify-content: center;

       overflow: hidden;
       z-index: 1986;

       bottom: 0;
       left: 0;
       position: absolute;
       right: 0;
       top: 0;
       background-color: rgba(10, 10, 10, 0.60);

       p {
          color: #FF5722;

          &.win {
            color: #4CAF50 !important;
          }
       }
  } 


</style>