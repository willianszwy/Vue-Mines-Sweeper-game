<template>
  <div id="mines-sweeper">
     
    <div class="mines-field">
      <template v-for="(itens, row) in game._grid">

        <div class="field-box" v-for="item, col in itens" 
             v-bind:id="row + '-' + col" 
             @click="run" 
             v-bind:class="{ visible : item._visible, showMine : item._mine && item._visible}">

            <template v-if="item._visible">
               <span >{{ item._count ? item._count : ' '}}</span>
            </template>

        </div>
      </div>
    </template>

  </div>
</template>

<script>

import  MinesSweeper , { GridElement, Array2D} from './MinesSweeper.js'


export default {
  name: 'mines-sweeper',
  data () {
    return {
      game: new MinesSweeper(0.05)
    }
  },
  methods: {
     run (event) {
        let [x, y] =  event.currentTarget.id.split('-').map(Number);


         if(this.$data.game.hasMine( y, x)){
              this.$data.game.showMines();
              alert('Boom!!!');
         }else {
               
              let visited = Array2D(10,15);
              this.$data.game.uncover( y, x, visited );

              if(this.$data.game.checkWin()){
                  alert('ganhou');
              }
       }
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

   // border: 1px solid #ccc;

   width: 644px;
   // height: 1000px;
   //padding: 5px;

 }

 $color-bg: #9C27B0;

 $item-colors:
  #FF9800, #FF5722, #607D8B, #4CAF50, #8BC34A, #40C4FF,
  #0277BD, #4DB6AC, #009688, #448AFF, #42A5F5, #7E57C2,
  #D32F2F, #AB47BC;

// where y is number of elements
@mixin backgrounds($colors, $y) {
  @for $i from 1 through $y {
    $color: random(length($colors));
    &:nth-child(#{$i}) { background: nth($colors, $color); }
  }
}

 .field-box {

     display: flex;
     align-items: center;
     justify-content: center;

     width: 40px;
     height: 40px;
     margin-bottom: 1px; 
     font-weight: 900;

     border: 1px solid darken(#fff , 75%);

     // background-color: $color-bg ;
     @include backgrounds($item-colors, 150 );
     color: #fff;     

     cursor: pointer;
 }

 .visible {
        background-color: #9a9a9a !important;
     }

  .showMine {
    background: red url(assets/mine.png) !important;
  }    

</style>