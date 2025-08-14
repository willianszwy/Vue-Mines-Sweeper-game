<template>
  <div id="mines-sweeper">
     
    <div class="mines-field">
      <template v-for="(itens, row) in game._grid">

        <div class="field-box" v-for="item, col in itens" 
             v-bind:id="row + '-' + col" 
             @click="run"
             @touchstart="handleTouchStart"
             @touchend="handleTouchEnd" 
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
      game: new MinesSweeper(0.05),
      touchStartTime: 0,
      touchStartElement: null
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
     
     handleTouchStart(event) {
        // Prevenir comportamentos padrão do touch
        event.preventDefault();
        this.touchStartTime = Date.now();
        this.touchStartElement = event.currentTarget;
        
        // Adicionar feedback visual de toque
        event.currentTarget.classList.add('touching');
     },
     
     handleTouchEnd(event) {
        event.preventDefault();
        const touchDuration = Date.now() - this.touchStartTime;
        
        // Remover feedback visual
        if (this.touchStartElement) {
          this.touchStartElement.classList.remove('touching');
        }
        
        // Só processar como clique se foi um toque rápido no mesmo elemento
        if (touchDuration < 500 && event.currentTarget === this.touchStartElement) {
          this.run(event);
        }
        
        this.touchStartElement = null;
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

#mines-sweeper {
  width: 100%;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
}

.mines-field {
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 1px;
  
  // Desktop (original) - 15 colunas * 40px + 14 gaps * 1px = 614px
  width: 614px;
  max-width: 100%;
  
  // Tablet
  @media (max-width: 768px) {
    width: 100%;
    max-width: 494px; // 15 * 32px + 14 * 1px
  }
  
  // Mobile
  @media (max-width: 480px) {
    width: 100%;
    max-width: 344px; // 15 * 22px + 14 * 1px
    padding: 0 5px;
  }
  
  // Mobile pequeno
  @media (max-width: 360px) {
    max-width: 314px; // 15 * 20px + 14 * 1px
  }
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
  
  // Desktop (original)
  width: 40px;
  height: 40px;
  border: 1px solid darken($color-bg, 15%);
  
  @include backgrounds($item-colors, 150);
  
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  
  // Tablet
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 1.2em;
  }
  
  // Mobile
  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
    font-size: 0.9em;
    border-width: 0.5px;
  }
  
  // Mobile pequeno
  @media (max-width: 360px) {
    width: 20px;
    height: 20px;
    font-size: 0.8em;
  }
  
  // Estados visuais mantidos
  &.visible {
    background-color: $color-bg !important;
  }
  
  &.showMine {
    background: red url(/assets/mine.png) !important;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  span {
    &.color-1 { color: #b71c1c; }
    &.color-2 { color: #4A148C; }
    &.color-3 { color: #0D47A1; }
    &.color-4 { color: #004D40; }
    &.color-5 { color: #33691E; }
    &.color-6 { color: #F57F17; }
    &.color-7 { color: #BF360C; }
    &.color-8 { color: #000; }
  }
  
  // Melhor feedback visual para touch
  &:active,
  &.touching {
    transform: scale(0.95);
    transition: transform 0.1s ease;
    opacity: 0.8;
  }
  
  // Hover apenas em desktop
  @media (hover: hover) {
    &:hover {
      opacity: 0.9;
      transition: opacity 0.2s ease;
    }
  }
}

</style>