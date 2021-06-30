<template>
  <div>
    <div class="form fadeIn">
      <div v-show="Object.keys(data.estimate).length" class="input-data bottom-spaced">
        <div class="columns content has-text-centered fadeLeft">
          <div class="column confirm-container has-text-left">
            <h3 class="has-margin-top">Confirmá tu flete</h3>
            <p>Cuando se confirme tu pago pasaremos a retirar tu flete. El pago se realizará mediante mercadopago a nombre de Geotiendas. Gracias por usar FletsApp!</p>
            <table class="table">
              <tr>
                <td class="has-background-light">
                  <label>Distancia</label>
                </td>
                <td class="has-background-light" colspan="2">
                  <span v-html="data.ruta.distance.text"></span>
                </td>
              </tr>
              <tr>
                <td class="has-background-light">
                  <label>Tiempo aprox. viaje</label>
                </td>
                <td class="has-background-light" colspan="2">
                  <span v-html="data.ruta.duration.text"></span>
                </td>
              </tr>
              <tr>
                <td class="has-background-success">
                  <label class="has-text-white">Costo</label>
                </td>
                <td colspan="2" class="has-background-success">
                  <div class="slideIn">
                    <span class="is-size-3 has-text-white has-text-weight-bold" v-html="data.estimate.amount"></span> 
                    <span class="has-text-white is-size-4" v-html="data.estimate.currency"></span>
                  </div>
                </td>
              </tr>              
              <tr>
                <td class="has-background-light">
                  <label>Solicitante</label>
                </td>
                <td>
                  <span class="is-capitalized" v-html="data.datos.nombre"></span>
                </td>
                <td>
                  <router-link class="button is-rounded is-text" to="/datos">✎</router-link>
                </td>
              </tr>
              <tr>
                <td class="has-background-light">
                  <label>Teléfono</label>
                </td>
                <td>
                  <span v-html="data.datos.telefono"></span>
                </td>
                <td>
                  <router-link class="button is-rounded is-text" to="/datos">✎</router-link>
                </td>
              </tr>
              <tr>
                <td class="has-background-light">
                  <label>Retirar en</label>
                </td>
                <td>
                  <span v-html="data.ruta.from.formatted_address"></span>
                </td>
                <td>
                  <router-link class="button is-rounded is-text" to="/ruta">✎</router-link>
                </td>
              </tr>
              <tr>
                <td class="has-background-light">
                  <label>Entregar en</label>
                </td>
                <td>
                  <span v-html="data.ruta.to.formatted_address"></span>
                </td>
                <td>
                  <router-link class="button is-rounded is-text" to="/ruta">✎</router-link>
                </td>
              </tr>
              <tr v-show="data.carga.service">
                <td class="has-background-light">
                  <label>Carga y descarga</label>
                </td>
                <td>
                  <span class="icon">
                    <span class="fa fa-check"></span>
                  </span>
                  <span>Este envío cubre costos de carga y descarga</span>
                </td>
                <td>
                  <router-link class="button is-rounded is-text" to="/carga">✎</router-link>
                </td>
              </tr>
              <tr v-show="!data.carga.service">
                <td class="has-background-light">
                  <label>Carga y descarga</label>
                </td>
                <td>
                  <span class="icon">
                    <span class="fa fa-times"></span>
                  </span>
                  <span>No incluye</span>
                </td>
                <td>
                  <router-link class="button is-rounded is-text" to="/carga">✎</router-link>
                </td>
              </tr>
              <tr>
                <td class="has-background-light">
                  <label>Tipo de carga</label>
                </td>
                <td>
                  <span v-show="data.carga.carga.muebles" class="is-capitalized tag is-rounded is-medium is-success">Muebles</span>
                  <span v-show="data.carga.carga.electrodomesticos" class="is-capitalized tag is-rounded is-medium is-success">Electrodomésticos</span>
                  <span v-show="data.carga.carga.mascotas" class="is-capitalized tag is-rounded is-medium is-success">Mascotas (con canil)</span>
                  <span v-show="data.carga.carga.cajas" class="is-capitalized tag is-rounded is-medium is-success">Cajas</span>
                  <span v-show="data.carga.carga.otro" class="is-capitalized tag is-rounded is-medium is-success">{{ data.carga.otro }}</span>
                </td>
                <td>
                  <router-link class="button is-rounded is-text" to="/carga">✎</router-link>
                </td>
              </tr>
              <tr>
                <td class="has-background-light">
                  <label>Peso de la carga</label>
                </td>
                <td>
                  <span v-html="data.carga.peso"></span> <span>Kg</span>
                </td>
                <td>
                  <router-link class="button is-rounded is-text" to="/carga">✎</router-link>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-show="Object.keys(data.estimate).length && !$root.loading" class="columns actions navbar is-fixed-bottom is-vbaseline has-text-centered">
      <div class="column has-text-centered">
        <a href="#" @click="submit" class="button is-rounded is-success is-medium" :class="{ 'is-loading': $root.loading }">
          <span class="icon">
            <span class="fa fa-check"/>
          </span>
          <span class="has-margin-left">Confirmar</span>
        </a>
        <!--router-link to="/pago" class="button is-success is-medium">Confirmar</router-link-->
      </div>
    </div>  
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'confirma',
  mounted: function(){
    var t = this
    var ruta = localStorage.getItem('ruta')
    var carga = localStorage.getItem('carga')
    var datos = localStorage.getItem('datos')
    if(ruta && carga && datos){
      t.data.ruta = JSON.parse(ruta)
      t.data.carga = JSON.parse(carga)
      t.data.datos = JSON.parse(datos)
    } else {
      return t.$router.push('/')
    }

    t.$root.loading = true
    axios.post( '/flet/estimate/5dadf4617c213e556141874f', {
      ruta: JSON.parse(ruta),
      carga: JSON.parse(carga),
      datos: JSON.parse(datos)
    } ).then((res) => {
      if(res.data.status==='success'){
        t.data.id = res.data.id
        t.data.estimate = res.data.estimate
        localStorage.setItem('estimate',JSON.stringify(res.data))
      } else {
        this.$root.snackbar('danger','La confirmación no pudo ser comprobada. Por favor intente de nuevo en unos instantes.')
      } 
      t.$root.loading = false       
    })
  },
  methods: {
    submit: function(){
      var t = this
      if(!t.$root.loading){
        t.$root.loading = true
        axios.post('/flet/preference', {
          id: t.data.id
        }).then((res) => {
          if(res.data.id){
            localStorage.removeItem('ruta')
            localStorage.removeItem('carga')
            localStorage.setItem('preference',JSON.stringify(res.data))
            t.$router.push('/pago')
          } else {
            this.$root.snackbar('danger','El pago no pudo ser recibido. Por favor intente de nuevo en unos instantes.')
          } 
          t.$root.loading = false       
        })
      }
    }
  },
  data () {
    return {
      data: {
        id:null,
        ruta:{
          distance:{
            text:null,
            value:0
          },
          duration:{
            text:null,
            value:0
          },
          coordinates:[],
          from:{
            formatted_address:'',
            lat:'',
            lng:''
          },
          to:{
            formatted_address:'',
            lat:'',
            lng:''        
          }          
        },
        carga:{
          service: false,
          carga: {},
          peso: null
        },
        datos:{},
        estimate:{}
      }
    }
  }
}
</script>
