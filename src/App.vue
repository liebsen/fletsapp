<template>
  <div>
    <svg v-show="$root.loading" class="spinner-container" viewBox="0 0 44 44">
      <circle class="path" cx="22" cy="22" r="20" fill="none" stroke-width="4"></circle>
    </svg>
  
    <div class="menu hidden-loading slideDown">
      <div class="menu-container columns is-vcentered is-mobile">
        <router-link class="header-logo" to="/">
          <img src="/static/img/delivery-truck.png" >
        </router-link>

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
        <div>
          <router-link class="has-text-centered" to="/">
            <img src="/static/img/delivery-truck.png" >
          </router-link>

          <div class="menu-links has-text-left">
            <router-link to="/terminos">
              <span class="icon">
                <span class="fas fa-balance-scale"></span>
              </span> 
              <span>Términos y condiciones</span>
            </router-link>
    
            <router-link to="/privacidad">
              <span class="icon">
                <span class="fas fa-unlock-alt"></span>
              </span> 
              <span>Política de privacidad</span>
            </router-link>

            <router-link to="/cotizacion">
              <span class="icon">
                <span class="fas fa-search-dollar"></span>
              </span> 
              <span>Como cotizamos</span>
            </router-link>

            <router-link to="/about">
              <span class="icon">
                <span class="fas fa-user-shield"></span>
              </span> 
              <span>Acerca de nosotros</span>
            </router-link>

            <router-link to="/contacto">
              <span class="icon">
                <span class="fas fa-envelope"></span>
              </span> 
              <span>Contacto</span>
            </router-link>

            <hr>
    
            <div class="has-text-centered">
              <router-link class="button is-rounded is-white is-outlined" to="/ruta">
                <span class="icon">
                  <span class="fas fa-truck-loading"></span>
                </span> 
                <span>Comenzar</span>            
              </router-link>
            </div>
          </div>
        </div>
      </div>    
    </div>

    <div class="steps-frame hidden fadeIn">
      <ul class="steps is-narrow is-medium is-centered has-content-centered">
        <li class="steps-segment is-active has-gaps">
          <a href="#" class="has-text-dark">
            <span class="steps-marker">
              <span class="icon">
                <span class="fas fa-map-marker-alt"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Ruta</p>
            </div>
          </a>
        </li>
        <li class="steps-segment is-active has-gaps">
          <a href="#" class="has-text-dark">
            <span class="steps-marker">
              <span class="icon">
                <span class="fas fa-truck-loading"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Carga</p>
            </div>
          </a>
        </li>
        <li class="steps-segment is-active has-gaps">
          <a href="#" class="has-text-dark">
            <span class="steps-marker">
              <span class="icon">
                <span class="fas fa-user"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Mis datos</p>
            </div>
          </a>
        </li>
        <li class="steps-segment is-active has-gaps">
          <a href="#" class="has-text-dark">
            <span class="steps-marker">
              <span class="icon">
                <span class="fas fa-check"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Confirmación</p>
            </div>
          </a>
        </li>
        <li class="steps-segment">
          <a href="#" class="has-text-dark">
            <span class="steps-marker">
              <span class="icon">
                <span class="fas fa-credit-card"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Pago</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>

    <div class="tosprompt">
      <div class="notification">
        <div class="is-pulled-right">
          <a href="#" @click="$root.tosAgree(this)">
            <span class="icon">
              <span class="fa fa-times"></span>
            </span>
          </a>
        </div>
        <p>
          <span class="has-text-black">
            <span class="fa fa-unlock-alt"></span>&nbsp; 
            <span>Aviso de Privacidad</span>
          </span>
          <span> no compartimos tus datos personales con otros.</span> 
          <router-link to="/privacidad">Leer mas</router-link>
        </p>
      </div>
    </div>

    <div class="legal-footer has-text-centered">
      <span>©️ {{ getYear() }} FletsApp &mdash; <router-link to="/terminos">Términos y condiciones</router-link></span>
    </div>

    <div class="ui-snackbar ui-snackbar--is-inactive">
      <p class="ui-snackbar__message" v-html="$root.message"></p>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'app',
  methods: {
    getYear () {
      return moment().format('YYYY')
    }
  }
}
</script>
