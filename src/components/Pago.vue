<template>
  <div>
    <div class="form">
      <div class="input-data has-text-centered">
        <form action="https://fletsapi.herokuapp.com/procesar-pago" method="POST" id="form">
          <p>Enviando solicitud. Espere por favor...</p>
        </form>
      </div>
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
  .form {
    opacity: 1!important;
  }
  .mercadopago-button {
    opacity: 0;
  }
</style>