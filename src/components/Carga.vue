<template>
  <div>
    <div class="form fadeIn">
      <div class="steps-frame">
        <ul class="steps is-narrow is-medium is-centered has-content-centered">
          <li class="steps-segment">
            <router-link to="/ruta" class="has-text-dark">
              <span class="steps-marker">
                <span class="icon">
                  <span class="fas fa-map-marker-alt"></span>
                </span>
              </span>
              <div class="steps-content">
                <p class="heading">Ruta</p>
              </div>
            </router-link>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span class="icon">
                <span class="fas fa-truck-loading"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Carga</p>
            </div>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span class="icon has-text-grey">
                <span class="fas fa-user"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Mis datos</p>
            </div>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span class="icon has-text-grey">
                <span class="fas fa-check"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Confirmación</p>
            </div>
          </li>
          <li class="steps-segment">
            <span class="steps-marker">
              <span class="icon has-text-grey">
                <span class="fas fa-credit-card"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Pago</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="input-data bottom-spaced">
        <div class="columns content has-text-centered fadeLeft">
          <div class="column options-container has-text-left">
            <h3>Tipo de carga</h3>
            <p>Selecciona un tipo de carga</p>
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
              <input class="is-checkradio" id="peso1" type="radio" v-model="data.peso" value="100">
              <label for="peso1">Menos de 100kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso2" type="radio" v-model="data.peso" value="200">
              <label for="peso2">Entre 100kg/200kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso3" type="radio" v-model="data.peso" value="300">
              <label for="peso3">Entre 200kg/300kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso4" type="radio" v-model="data.peso" value="400">
              <label for="peso4">Entre 300kg/400kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso5" type="radio" v-model="data.peso" value="500">
              <label for="peso5">Mas de 400kg y menos de 500kg</label>
            </div>
          </div>
        </div>
      </div>
    
      <div v-show="data.carga && data.peso" class="columns actions navbar is-fixed-bottom is-vcentered has-text-centered">
        <div class="column has-text-centered">
          <a href="#" @click="submit" class="button is-info is-medium">Continuar</a>
          <!--router-link to="/pago" class="button is-info is-large">Continuar</router-link-->
        </div>
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
      t.$router.push('/datos')
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

