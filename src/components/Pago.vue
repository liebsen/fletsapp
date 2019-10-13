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
      <form action="/procesar-pago" method="POST" id="form">
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
    axios.post( t.$root.endpoint + '/preference', {} ).then((res) => {
      if(res.data.status==='success'){
      } else {
        this.$root.snackbar('error','La preferencia no pudo ser comprobada. Por favor intenta nuevamente en unos instantes.')
      }        
    })

    let script = document.createElement('script')
    script.setAttribute('src', 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js')
    script.setAttribute('data-preference-id', '199')
    document.getElementById('form').appendChild(script)
  },
  data () {
    return {
      msg: 'Welcome to FletsApp'
    }
  }
}
</script>


<style>
  .form {
    padding: 1rem;
    position:relative; 
    opacity: 1!important;
    z-index: 9;
  }
  .steps-frame {
    background-color: white;
    padding: 0.5rem;
    padding-top: 1rem;
    margin-top: -1rem;
    margin-left: -1rem;
    margin-right: -1rem;
  }
  .input-data {
    padding: 1rem;
  }
  iframe {
    height: 100%;
  }

</style>