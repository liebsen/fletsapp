<template>
  <div>
    <div class="form">
      <div class="steps-frame">
        <ul class="steps is-narrow is-medium is-centered has-content-centered">
          <li class="steps-segment">
            <router-link to="/ruta" class="has-text-dark">
              <span class="steps-marker">
                <span>📍</span>
              </span>
              <div class="steps-content">
                <p class="heading">Ruta</p>
              </div>
            </router-link>
          </li>
          <li class="steps-segment">
            <router-link to="/carga" class="has-text-dark">
              <span class="steps-marker">
                <span>📦</span>
              </span>
              <div class="steps-content">
                <p class="heading">Carga</p>
              </div>
            </router-link>
          </li>
          <li class="steps-segment">
            <router-link to="/datos" class="has-text-dark">
              <span class="steps-marker">
                <span>👤</span>
              </span>
              <div class="steps-content">
                <p class="heading">Mis datos</p>
              </div>
            </router-link>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span>✔️</span>
            </span>
            <div class="steps-content">
              <p class="heading">Confirmación</p>
            </div>
          </li>
          <li class="steps-segment">
            <span class="steps-marker is-hollow">
              <span>💳</span>
            </span>
            <div class="steps-content">
              <p class="heading">Pago</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="input-data has-text-centered">
      <form action="https://fletsapi.herokuapp.com/procesar-pago" method="POST" id="form">
        <p>Enviando solicitud. Espere por favor...</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pago',
  mounted: function(){
    var t = this
    var preference = localStorage.getItem('preference')
    if(!preference){
      t.$router.push('/')
    } else {
      preference = JSON.parse(preference)
      let script = document.createElement('script')
      script.setAttribute('src', 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js')
      script.setAttribute('data-preference-id', preference.id)
      window.sandbox_init_point = preference.init_point
      //window.init_point = preference.init_point
      document.getElementById('form').appendChild(script)
      setTimeout(function(){
        document.querySelector('.mercadopago-button').click()
      },5000)
    }
  },
  data () {
    return {
      msg: 'Welcome to FletsApp'
    }
  }
}
</script>

<style>
  iframe {
    height: 100%;
    overflow-x: hidden;
  }
  .mercadopago-button {
    opacity: 0;
  }
</style>