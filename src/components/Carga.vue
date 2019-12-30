<template>
  <div>
    <div class="form fadeIn">
      <div class="input-data bottom-spaced">
        <div class="columns content has-text-left fadeLeft">
          <div class="column">
            <h3>Servicio de carga / descarga</h3>
            <p>Fletsapp en general no provee servicios de carga y descarga. Si usted necesita este servicio adicional por favor seleccionelo.</p>
            
            <div class="field">
              <input class="is-checkradio has-background-color is-success" v-model="data.service" id="service" type="checkbox">
             <label for="service"> Necesito personal adicional para cargar y descargar</label>
            </div>
          </div>

          <div class="column">
            <h3>Tipo de carga</h3>
            <p>Por favor selecciona el tipo de carga que deseas contratar.</p>
            
            <div class="field">
              <input class="is-checkradio" id="carga1" type="radio" v-model="data.carga" value="mueble">
              <label for="carga1">Muebles</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga2" type="radio" v-model="data.carga" value="electrodomestico">
              <label for="carga2">Electrodómesticos</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga3" type="radio" v-model="data.carga" value="mascota">
              <label for="carga3">Mascotas</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga4" type="radio" v-model="data.carga" value="caja">
              <label for="carga4">Cajas</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga5" type="radio" v-model="data.carga" value="heladera">
              <label for="carga5">Heladeras</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga6" type="radio" v-model="data.carga" value="patologico">
              <label for="carga6">Residuos patológicos</label>
            </div>
          </div>

          <div class="column">
            <h3>Peso de la carga</h3>
            <p>Por favor indica el peso aproximado de la carga que deseas llevar</p>
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
              <label for="peso5">Mas de 400kg y hasta 500kg</label>
            </div>
          </div>
        </div>
      </div>
    
      <div v-show="data.carga && data.peso" class="columns actions navbar is-fixed-bottom is-vbaseline has-text-centered">
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
        service: false,
        carga:null,
        peso:null
      }
    }
  }
}
</script>

