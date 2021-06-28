<template>
  <div>
    <div class="form fadeIn">
      <div class="input-data bottom-spaced">
        <div class="columns is-carga content has-text-left fadeLeft">
          <div class="column">
            <h4>Servicio de carga y descarga</h4>
            <p>Fletsapp en general no provee servicios de carga y descarga. Si usted necesita este servicio adicional por favor seleccionelo.</p>
            
            <div class="field">
              <input class="is-checkradio has-background-color is-success" v-model="data.service" id="service" type="checkbox">
             <label for="service"> Contratar <strong>carga y descarga</strong></label>
            </div>

            <div v-show="data.service" class="notification">
              <p>El servicio de carga y descarga tiene un costo adicional de <span v-html="service.cost"></span><span v-html="service.currency"></span></p>
            </div>
          </div>

          <div class="column">
            <h4>Tipo de carga</h4>
            <p>Por favor selecciona el tipo de carga que deseas contratar.</p>
            <div class="field">
              <input class="is-checkradio" id="carga1" type="checkbox" v-model="data.carga.muebles" value="mueble">
              <label for="carga1">Muebles</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga2" type="checkbox" v-model="data.carga.electrodomesticos" value="electrodomestico">
              <label for="carga2">Electrodómesticos</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga3" type="checkbox" v-model="data.carga.mascotas" value="mascota">
              <label for="carga3">Mascotas (con canil)</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga4" type="checkbox" v-model="data.carga.cajas" value="cajas">
              <label for="carga4">Cajas</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="carga5" type="checkbox" v-model="data.carga.otro" value="otro">
              <label for="carga5">Otro</label>
            </div>

            <div v-show="data.carga === 'otro'" class="field">
              <textarea class="textarea" v-model="data.otro" maxlength="500" placeholder="Detallá que querés llevar acá"></textarea>
            </div>
          </div>

          <div class="column">
            <h4>Peso de la carga</h4>
            <p>Por favor indica el peso aproximado de la carga que deseas llevar</p>
            <div class="field">
              <input class="is-checkradio" id="peso1" type="radio" v-model="data.peso" value="100">
              <label for="peso1">Menos de 100kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso2" type="radio" v-model="data.peso" value="200">
              <label for="peso2">100kg/200kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso3" type="radio" v-model="data.peso" value="300">
              <label for="peso3">200kg/300kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso4" type="radio" v-model="data.peso" value="400">
              <label for="peso4">300kg/400kg</label>
            </div>

            <div class="field">
              <input class="is-checkradio" id="peso5" type="radio" v-model="data.peso" value="500">
              <label for="peso5">400kg/500kg</label>
            </div>
          </div>
        </div>
      </div>
    
      <div v-show="Object.keys(data.carga).length && data.peso" class="columns actions navbar is-fixed-bottom is-vbaseline has-text-centered">
        <div class="column has-text-centered">
          <a href="#" @click="submit" class="button is-rounded is-success is-medium">Siguiente</a>
          <!--router-link to="/pago" class="button is-info is-large">Continuar</router-link-->
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'carga',
  mounted: function() {
    var t = this
    var saved = localStorage.getItem('carga')
    if (saved) {
      t.data = JSON.parse(saved)
    }
    if (t.data.carga.otro) {
      t.data.carga.otro = t.data.otro
    }
    t.$root.loading = true
    axios.post( '/flet/service_cost/5dadf4617c213e556141874f').then((res) => {
      if(res.data.status==='success'){
        t.service = res.data
      } else {
        this.$root.snackbar('danger','Algo pasó.')
      } 
      t.$root.loading = false       
    })
  },
  methods: {
    submit: function(){
      localStorage.setItem('carga',JSON.stringify(this.data))
      this.$router.push('/datos')
    }
  },
  data () {
    return {
      service: {},
      data: {
        service: false,        
        carga: {},
        peso: null
      }
    }
  }
}
</script>

