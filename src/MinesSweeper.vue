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
      game: this.createGame(),
      touchStartTime: 0,
      touchStartElement: null
    }
  },
  components: {
    Message
  },
  methods: {
     createGame() {
       // Detectar tamanho da tela para ajustar grid
       if (typeof window !== 'undefined') {
         const width = window.innerWidth;
         if (width <= 480) {
           // Mobile: 10x6 para tiles maiores e mais fáceis de clicar
           return new MinesSweeper(0.05, 10, 6);
         } else if (width <= 768) {
           // Tablet: 12x8 para aproveitamento médio
           return new MinesSweeper(0.05, 12, 8);
         }
       }
       // Desktop: 15x10 original
       return new MinesSweeper(0.05, 15, 10);
     },
     
     run (event) {
        let [x, y] =  event.currentTarget.id.split('-').map(Number);

         if(this.game.hasMine( y, x)){
              this.game.showMines();
              this.showMsg('Game Over!', false);
         }else {
               
              let visited = Array2D(this.game._height, this.game._width);
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
  gap: 1px;
  
  // Desktop (original) - 15x10
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(10, 1fr);
  width: 614px;
  max-width: 100%;
  
  // Tablet - 12x8 para melhor usabilidade
  @media (max-width: 768px) and (min-width: 481px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(8, 1fr);
    width: calc(100vw - 40px);
    max-width: calc(100vw - 40px);
    padding: 0 5px;
  }
  
  // Mobile - 10x6 para tiles maiores e mais fáceis de clicar
  @media (max-width: 480px) {
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(6, 1fr);
    width: calc(100vw - 20px);
    max-width: calc(100vw - 20px);
    padding: 0 5px;
  }
}

$color-bg: #B5B5A3; // Cinza com tom bege para harmonizar com as cores

$item-colors: 
#BBBB88,
#CCC68D,
#EEDD99,
#EEC290,
#EEAA88;

// Modernizar cores com gradientes sutis mantendo as cores originais
// Ajustado para diferentes tamanhos de grid
@mixin modern-backgrounds($colors, $max-cells) {
  @for $i from 1 through $max-cells {
    $color: random(length($colors));
    $base-color: nth($colors, $color);
    &:nth-child(#{$i}):not(.visible):not(.showMine) { 
      background: linear-gradient(135deg, 
        lighten($base-color, 8%) 0%, 
        $base-color 50%, 
        darken($base-color, 5%) 100%
      );
      border: 1px solid rgba(darken($base-color, 15%), 0.3);
      box-shadow: 
        inset 0 1px 0 rgba(white, 0.2),
        0 1px 2px rgba(black, 0.1);
    }
  }
}

.field-box {
  font-family: 'Boogaloo', cursive;
  font-size: 1.4em;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  
  // Desktop (original) com modernizações
  width: 40px;
  height: 40px;
  border-radius: 6px;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  
  // Background para desktop (15x10=150), tablet (12x8=96), mobile (10x6=60)
  @include modern-backgrounds($item-colors, 150);
  
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  
  // Tablet - 12 colunas para tiles maiores
  @media (max-width: 768px) and (min-width: 481px) {
    width: calc((100vw - 60px) / 12); // 12 colunas no tablet
    height: calc((100vw - 60px) / 12);
    min-width: 35px; // tamanho mínimo para facilitar toque
    min-height: 35px;
    max-width: 55px;
    max-height: 55px;
    font-size: clamp(1em, 2.5vw, 1.4em);
    border-radius: 5px;
  }
  
  // Mobile - 10 colunas para tiles bem grandes e fáceis de clicar
  @media (max-width: 480px) {
    width: calc((100vw - 40px) / 10); // 10 colunas no mobile
    height: calc((100vw - 40px) / 10);
    min-width: 30px; // tamanho mínimo confortável para toque
    min-height: 30px;
    max-width: 45px;
    max-height: 45px;
    font-size: clamp(0.8em, 3.5vw, 1.2em);
    border-radius: 4px;
  }
  
  // Estado visível - flat como original  
  &.visible {
    background: $color-bg !important;
    border: 1px solid darken($color-bg, 15%) !important;
    box-shadow: none !important;
  }
  
  &.showMine {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 50%, #dc4545 100%) !important;
    border: 1px solid rgba(darken(#dc4545, 15%), 0.6) !important;
    box-shadow: 
      inset 0 1px 0 rgba(white, 0.2),
      0 2px 8px rgba(red, 0.3) !important;
    
    &::after {
      content: '💣';
      font-size: 0.8em;
      filter: drop-shadow(1px 1px 2px rgba(black, 0.3));
    }
  }
  
  span {
    font-family: 'Kalam', 'Comic Sans MS', 'Marker Felt', cursive;
    text-shadow: 1px 1px 2px rgba(black, 0.4);
    font-weight: 700;
    letter-spacing: 0.5px;
    
    &.color-1 { color: #b71c1c; }
    &.color-2 { color: #4A148C; }
    &.color-3 { color: #0D47A1; }
    &.color-4 { color: #004D40; }
    &.color-5 { color: #33691E; }
    &.color-6 { color: #F57F17; }
    &.color-7 { color: #BF360C; }
    &.color-8 { color: #000; }
  }
  
  // Efeitos de interação modernos
  &:active,
  &.touching {
    transform: scale(0.95) translateY(1px);
    box-shadow: 
      inset 0 1px 0 rgba(white, 0.1),
      0 1px 3px rgba(black, 0.2);
  }
  
  // Hover apenas em desktop com efeitos modernos
  @media (hover: hover) {
    &:hover:not(.visible):not(.showMine) {
      transform: translateY(-1px);
      box-shadow: 
        inset 0 1px 0 rgba(white, 0.3),
        0 3px 8px rgba(black, 0.15);
      filter: brightness(1.05);
    }
  }
}

</style>