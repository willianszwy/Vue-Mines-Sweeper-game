<template>
  <div id="mines-sweeper">
     
    <div class="mines-field">
      <template v-for="(itens, row) in game._grid">

        <div class="field-box" v-for="item, col in itens" 
             v-bind:id="row + '-' + col" 
             @click="run" 
             v-bind:class="{ visible : item._visible, showMine : item._mine && item._visible}">

            <template v-if="item._visible">
               <span v-bind:class=" 'color-' + item._count">
               {{ item._count ? item._count : ' '}}</span>
            </template>

        </div>
        </template>
    </div>
   
    <message v-bind:message="msg" 
               v-bind:green="win" 
               v-bind:show="isMsgVisible">        
    </message>

    

  </div>
</template>

<script>

import  MinesSweeper , { GridElement, Array2D} from './MinesSweeper.js'
import  Message from './Message.vue'


export default {
  name: 'mines-sweeper',
  data () {
    return {
      msg: '',
      isMsgVisible: false,
      win: true,
      game: new MinesSweeper(0.05)
    }
  },
  components: {
    Message
  },
  methods: {
     run (event) {
        let [x, y] =  event.currentTarget.id.split('-').map(Number);


         if(this.game.hasMine( y, x)){
              this.game.showMines();
              this.showMsg('Game Over!', false);
         }else {
               
              let visited = Array2D(10,15);
              this.game.uncover( y, x, visited );

              if(this.game.checkWin()){
                  this.showMsg('You Win!', true);
              }
       }
     },
     showMsg (message, win) {
        this.isMsgVisible = true;
        this.msg = message;
        this.win = win;
        this.restart();
     },
     restart() {
        setTimeout(function () {
           window.location.reload(); 
        }, 2000);
     }
     

  }
 
}
</script>

<style lang="scss">

 .mines-field {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-content: space-around;
   align-items: center;  

   width: 644px;

 }

 $color-bg: #9a9a9a;

$item-colors: 
#BBBB88,
#CCC68D,
#EEDD99,
#EEC290,
#EEAA88;

@mixin backgrounds($colors, $y) {
  @for $i from 1 through $y {
    $color: random(length($colors));
    &:nth-child(#{$i}) { background: nth($colors, $color); }
  }
}

 .field-box {
     font-family: 'Boogaloo', cursive;
     font-size: 1.4em;
     display: flex;
     align-items: center;
     justify-content: center;

     width: 40px;
     height: 40px;
     margin-bottom: 1px; 
     border: 1px solid darken($color-bg , 15%);

     
     @include backgrounds($item-colors, 150 );
         

     cursor: pointer;
 

    &.visible {
        background-color: $color-bg !important;
    }

    &.showMine {
        background: red url(assets/mine.png) !important;
    }

    span {
      &.color-1 { color : #b71c1c}
      &.color-2 { color : #4A148C}
      &.color-3 { color : #0D47A1}
      &.color-4 { color : #004D40}
      &.color-5 { color : #33691E}
      &.color-6 { color : #F57F17}
      &.color-7 { color : #BF360C}
      &.color-8 { color : #000}    


    }   

  }

</style>