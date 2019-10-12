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
          <li class="steps-segment is-active has-gaps">
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
            <h3>Tipo de carga</h3>
            <p>Seleccione que tipo de carga desea contratar</p>
            <div class="field">
              <input class="is-checkradio" id="carga1" type="radio" v-model="data.carga" value="mueble">
              <label for="carga1">Mueble</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga2" type="radio" v-model="data.carga" value="mascota">
              <label for="carga2">Mascota</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga3" type="radio" v-model="data.carga" value="cajas">
              <label for="carga3">Cajas</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga4" type="radio" v-model="data.carga" value="liquidos">
              <label for="carga4">Recipiente con líquidos</label>
            </div>
          </div>

          <div class="column options-container has-text-left">
            <h3>Peso de la carga</h3>
            <p>Indique el peso aproximado de su carga</p>
            <div class="field">
              <input class="is-checkradio" id="peso1" type="radio" v-model="data.peso" value="100kg">
              <label for="peso1">Hasta 100kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso2" type="radio" v-model="data.peso" value="250kg">
              <label for="peso2">Entre 100kg/250kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso3" type="radio" v-model="data.peso" value="500kg">
              <label for="peso3">Entre 250kg/500kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso4" type="radio" v-model="data.peso" value="1000kg">
              <label for="peso4">Mas de 500kg</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="data.carga && data.peso" class="columns actions navbar is-fixed-bottom is-vcentered has-text-centered">
      <div class="column has-text-centered">
        <a href="#" @click="submit" class="button is-info is-large">Continuar</a>
        <!--router-link to="/pago" class="button is-info is-large">Continuar</router-link-->
      </div>
    </div>  
  </div>
</template>

<script>
export default {
  name: 'carga',
  mounted: function(){
    var t = this
    var saved = localStorage.getItem('carga')
    if(saved){
      t.data = JSON.parse(saved)
    }
  },
  methods: {
    submit: function(){
      var t = this
      localStorage.setItem('carga',JSON.stringify(t.data))
      t.$router.push('/confirma')
    }
  },
  data () {
    return {
      data: {
        carga:null,
        peso:null
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
