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
            <a href="#" class="has-text-dark">
              <span class="steps-marker">
                <span>📦</span>
              </span>
              <div class="steps-content">
                <p class="heading">Carga</p>
              </div>
            </a>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span>👤</span>
            </span>
            <div class="steps-content">
              <p class="heading">Mis datos</p>
            </div>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker is-hollow">
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

      <div class="input-data">
        <div class="columns content has-text-centered fadeLeft">
          <div class="column options-container has-text-left">
            <h3>Mis datos personales</h3>
            <p>Por favor indicanos tus datos personales.</p>
            <div class="field">
              <label>Tu nombre completo</label>
              <input class="input" id="nombre" type="text" v-model="data.nombre" placeholder="Miguel Rodríguez">
            </div>

            <div class="field">
              <label>Tu número de teléfono</label>
              <input class="input" id="nombre" type="number" v-model="data.telefono" placeholder="011 3555 5555">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="data.nombre && data.telefono" class="columns actions navbar is-fixed-bottom is-vcentered has-text-centered">
      <div class="column has-text-centered">
        <a href="#" @click="submit" class="button is-info is-large">Continuar</a>
        <!--router-link to="/pago" class="button is-info is-large">Continuar</router-link-->
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'datos',
  mounted: function(){
    var t = this
    var saved = localStorage.getItem('datos')
    if(saved){
      t.data = JSON.parse(saved)
    }
  },
  methods: {
    submit: function(){
      var t = this
      localStorage.setItem('datos',JSON.stringify(t.data))
      t.$router.push('/confirma')
    }
  },
  data () {
    return {
      data: {
        nombre:null,
        telefono:null
      }
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
  .actions {
    background-color: transparent!important;
    padding-bottom: 5rem;
  }
  .options-container {
    margin: 0 auto;
    max-width: 320px;
  }

</style>
