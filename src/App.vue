<template>
  <div>
    
    <svg v-show="$root.loading" class="spinner-container" viewBox="0 0 44 44">
        <circle class="path" cx="22" cy="22" r="20" fill="none" stroke-width="4"></circle>
    </svg>
  
    <div class="menu hidden-loading slideIn">
      <div class="menu-container columns is-vcentered">
        <div class="column is-1 has-text-right">
          <router-link to="/">
            <span class="logo-emoji">🚚</span>
          </router-link>
        </div>

        <div class="column menu-text">
            <span>FletsApp</span>
        </div>

        <div class="column menu-secondary has-text-centered">
          <div class="section-tag-container">
            <div class="section-tag columns is-mobile reset-margin">
              <div class="column has-text-right">
                <img class="icon">
              </div>
              <div class="column fadeIn">
                <h3 class="title has-text-left"></h3>
              </div>
            </div>
          </div>
        </div>

        <div class="column menu-primary">
          <div class="menu-bg"></div>
          <div class="menu-burger">
            <svg viewBox="0 0 800 600">
              <path d="M300,220 C300,220 520,220 540,220 C740,220 640,540 520,420 C440,340 300,200 300,200" id="top"></path>
              <path d="M300,320 L540,320" id="middle"></path>
              <path d="M300,210 C300,210 520,210 540,210 C740,210 640,530 520,410 C440,330 300,190 300,190" id="bottom" transform="translate(480, 320) scale(1, -1) translate(-480, -318)"></path>
            </svg>
          </div>
        </div>        
      </div>

      <div class="menu-items">
        <router-link to="/"><span class="logo-emoji">🚚</span></router-link>
        <div class="menu-links has-text-left">
          <router-link to="/terminos"><span class="aev-icon">🔥</span> Términos y condiciones</router-link>
          <router-link to="/cotizacion"><span class="aev-icon">🏆</span> ¿Cómo cotiza Flet?</router-link>
          <!--router-link to="/puzzles"><span class="aev-icon">🔖</span> Puzzles</router-link-->
          <router-link to="/acerca"><span class="aev-icon">ℹ</span> Acerca de Flet</router-link>
          <router-link to="/contacta"><span class="aev-icon">📧</span> Contacto</router-link>
          <hr>
          <div class="has-text-centered">
            <router-link class="button is-white is-outlined" to="/ruta"><span>🚚</span> &nbsp;&nbsp;Comenzar</router-link>
          </div>
        </div>
      </div>    
    </div>
    
    <keep-alive v-show="!$root.loading" exclude="game">
      <transition>
        <router-view/>
      </transition>
    </keep-alive>

    <div class="tosprompt">
      <div class="notification">
        <!--p class="has-text-weight-semibold">Ads help us run this site</p-->
        <p>Utilizamos cookies de análisis para mejorar su experiencia y mejorar esta herramienta. No compartimos sus datos personales con otros. <a href="https://puntoweberplast.com/politica-de-privacidad">Leer mas</a></p>
        <div class="has-text-centered">
          <div class="button" @click="$root.tosAgree(this)">Acepto</div>
        </div>
      </div>
    </div>

    <div class="ui-snackbar ui-snackbar--is-inactive">
      <p class="ui-snackbar__message" v-html="$root.message"></p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      ver: '2.0.1'
    }
  }
}
</script>
