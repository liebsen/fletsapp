<template>
  <div>
    <div class="status">
      <span class="has-text-weight-semibold">
        <a href="#">
          &nbsp;🕗 <span></span>ms <span></span>
        </a>
      </span>
      <div class="bar">
        <div class="bar-progress"></div>
      </div>
    </div>  
    <div class="container">
      <div class="content column">
        <div class="columns">
          <div class="column">
            <div class="b-area">
              <div class="head" @click="gameFlip">
                <h6 class="has-text-left has-background-black">
                  <span class="has-text-white" v-html="data.black"></span>
                </h6>
              </div>
              <div id="board"></div>
              <div class="foot" @click="gameFlip">
                <h6 class="has-text-right has-background-white">
                  <span class="has-text-black" v-html="data.white"></span>
                </h6>
              </div>
            </div>
          </div>
          <div class="column datospartida">
            <table class="table shrink-th" v-if="Object.keys(data).length">
              <tr>
                <th width="1%"></th>
                <th></th>
              </tr>
              <tr class="has-background-success">
                <td class="has-text-weight-bold">
                  <span class="has-text-white">Apertura</span>
                </td>
                <td>
                  <span v-html="opening" class="has-text-white">...</span>
                </td>
              </tr>
              <tr>
                <td colspan=2>
                  <textarea v-model="data.pgn" class="textarea" placeholder="1. e4 Nf6 2. e5..."></textarea>
                </td>
              </tr>                  
              <tr v-show="singleplayer">
                <td class="has-text-weight-bold">
                  <span>Evento</span>
                </td>
                <td>
                  <input v-model="data.event" class="input" placeholder="Evento">
                </td>
              </tr>
              <tr v-show="singleplayer">
                <td class="has-text-weight-bold">
                  <span>Ronda</span>
                </td>
                <td>
                  <input v-model="data.round" class="input" placeholder="Ronda">
                </td>
              </tr>
              <tr v-show="singleplayer">
                <td class="has-text-weight-bold">
                  <span>Blancas</span>
                </td>
                <td>
                  <input v-model="data.white" class="input" placeholder="Jugador con blancas">
                </td>
              </tr>
              <tr v-show="singleplayer">
                <td class="has-text-weight-bold">
                  <span>Negras</span>
                </td>
                <td>
                  <input v-model="data.black" class="input" placeholder="Jugador con negras">
                </td>
              </tr>
              <tr v-show="singleplayer">
                <td class="has-text-weight-bold">
                  <span>Fecha</span>
                </td>
                <td>
                  <input v-model="data.date" class="input" placeholder="1977.11.22">
                </td>
              </tr>
              <tr v-show="singleplayer">
                <td class="has-text-weight-bold">
                  <span>Lugar</span>
                </td>
                <td>
                  <input v-model="data.site" class="input" placeholder="Reikiavik, Iceland">
                </td>
              </tr>
              <tr v-show="data.pgn">
                <td colspan="2">
                  <div class="columns is-tablet">
                    <div class="column">
                      <a v-show="singleplayer" class="button is-primary" @click="gameUndo">Atrás</a>
                      <a class="button is-danger" @click="gameResign">Abandonar partida</a>
                      <a class="button is-success" @click="gameAskDraw">Ofrecer tablas</a>
                    </div>
                  </div>
                </td>
              </tr>
            </table>

            <!-- h5 class="has-text-black">⌨ Atajos de teclado</h5>
            <div class="notification is-info">
              <table class="keyboard-tips">
                <tr>
                  <td>[⬌]</td>
                  <td>Navega movimientos de la partida</td>
                </tr>
                <tr>
                  <td>[⬍]</td>
                  <td><p>Establece velocidad de la animación</p></td>
                </tr>
                <tr>
                  <td>[SPACE]</td>
                  <td><p>Pausa/Reanuda la partida</p></td>
                </tr>
                <tr>
                  <td>[SHIFT] + [F]</td>
                  <td><p>Invierte el tablero</p></td>
                </tr>
                <tr>
                  <td>[SHIFT] + [N]</td>
                  <td><p>Visión nocturna</p></td>
                </tr>
              </table>
            </div-->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Chess from 'chess.js'
  import Chessboard from 'chessboardjs'
  import snackbar from '../components/Snackbar'

  export default {
    name: 'play',
    mounted: function(){
      this.$root.loading = true
      var player = localStorage.getItem('player')
      if(!player){
        var name = ''
        for( var i in this.$root.possibleNames){
          name+= this.$root.possibleNames[i][Math.floor(Math.random()*this.$root.possibleNames[i].length)]
        }
        player = { name: name }
        localStorage.setItem('player',player)
      }

      axios.get('/assets/json/eco.json')
        .then((response)=>{
        this.eco = response.data
      })

      this.gameStart()
      this.$root.player = player
    },
    methods: {
      gamePGN:function(pgn){
        var data = []
        pgn.split('.').forEach(function(turn){
          turn.split(' ').forEach(function(move){
            if(move.length){
              if(isNaN(move) && move.length > 1){
                data.push(move)
              }
            }
          })
        })
        return data
      },
      gameStart: function(){
        this.$root.loading = true
        axios.post( this.$root.endpoint + '/secretgames',{secret_room:this.secret_room} ).then((res) => {
          if(!res.data.length) return location.href="/404"
          var game = res.data[0]
          var pgn = game.pgn||''
          this.gameMoves = this.gamePGN(pgn)
          this.data = game
          setTimeout(() => {
            this.boardEl = document.getElementById('board')
            this.game = new Chess()
            this.board = Chessboard('board', this.boardCfg)      
            this.$root.loading = false
            setTimeout(() => {
              document.querySelector('.b-area').classList.add('show')
            }, 500)
          },500)
        })
      },      
      gameFlip: function(){
        this.board.flip()
        const head = document.querySelector('.b-area > .head').innerHTML
        const foot = document.querySelector('.b-area > .foot').innerHTML
        document.querySelector('.b-area > .head').innerHTML = foot
        document.querySelector('.b-area > .foot').innerHTML = head
      },
      gameResign: function(){},
      gameAskDraw: function(){},
      gameUndo: function(){}
    },
    data () {
      return {
        boardCfg: {
          showErrors:true,
          position: 'start',
          draggable: false,
          onMoveEnd: this.onMoveEnd,
          pieceTheme:'/assets/img/chesspieces/wikipedia/{piece}.png'
        },
        data:{},
        eco:{},
        opening:null,
        board:null,
        game:null,
        gameMoves:[],
        data:{},
        singleplayer:false,
        room:location.pathname.replace('/play/','').split('/')[0],
        secret_room:location.pathname.replace('/play/','').split('/')[1],
        squareToHighlight:null,
        colorToHighlight:null,
        squareClass:'.square-55d63'    }
    }
  }
</script>


<style type="text/css">
  .datospartida {
    margin-top: -2px;
  }
  .highlight-white {
    -webkit-box-shadow: inset 0 0 1px 6px yellow;
    -moz-box-shadow: inset 0 0 1px 6px yellow;
    box-shadow: inset 0 0 1px 6px yellow;  
  }
  .highlight-black {
    -webkit-box-shadow: inset 0 0 1px 6px blue;
    -moz-box-shadow: inset 0 0 1px 6px blue;
    box-shadow: inset 0 0 1px 6px blue;  
  }
  .is-pgn {
    line-height: 2rem;
    font-size: 0.75rem;
  }
  .moveindex {
    font-size: 0.5rem;
    padding: 0 0.25rem;
    margin: 0;
    border-radius: 35px;
    border: 1px solid #FA7C91;
    font-size: 1rem;
  }
  .moveindex.active {
    background-color:#23d160;
    color: white;
  }
  .status {
    display: inline-block;
    background-color: white;
    padding: 0.25rem;
    width: 100%;
    position: fixed;  
    z-index: 10;
    bottom: 0;
  }
  .b-area {
    opacity: 0;
    max-height:0;
    transition: all 1s linear;
  }
  .b-area.show {
    height:auto;
    max-height:600px;     
    opacity: 1;
  }
  .b-area h6 {
    margin-bottom: 0;
    padding: 0.75rem;
    margin-right: 4px;
    min-height: 42px;
    clear: both;
  }
</style>
