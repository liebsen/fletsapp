<template>
  <div>
    <div class="form fadeIn">
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

      <div v-show="Object.keys(data.estimate).length" class="input-data">
        <div class="columns content has-text-centered fadeLeft">
          <div class="column confirm-container has-text-left">
            <!--h3>Datos de tu Flet</h3-->
            <table class="table">
              <tr>
                <td class="has-background-light"><label>Distancia</label></td>
                <td class="has-background-light" colspan="2"><span v-html="data.ruta.distance.text"></span></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Tiempo aprox. viaje</label></td>
                <td class="has-background-light" colspan="2"><span v-html="data.ruta.duration.text"></span></td>
              </tr>
              <tr>
                <td class="has-background-dark"><label class="has-text-white">Costo</label></td>
                <td colspan=2 class="has-background-dark">
                  <span class="is-size-4 has-text-white has-text-weight-bold" v-html="data.estimate.amount"></span> 
                  <span class="has-text-white" v-html="data.estimate.currency"></span>
                </td>
              </tr>              
              <tr>
                <td class="has-background-light"><label>FLET para</label></td>
                <td><span v-html="data.datos.nombre"></span></td>
                <td><router-link class="button is-text" to="/datos">✎</router-link></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Teléfono</label></td>
                <td><span v-html="data.datos.telefono"></span></td>
                <td><router-link class="button is-text" to="/datos">✎</router-link></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Retirar en</label></td>
                <td><span v-html="data.ruta.from.formatted_address"></span></td>
                <td><router-link class="button is-text" to="/ruta">✎</router-link></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Entregar en</label></td>
                <td><span v-html="data.ruta.to.formatted_address"></span></td>
                <td><router-link class="button is-text" to="/ruta">✎</router-link></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Tipo de carga</label></td>
                <td><span v-html="data.carga.carga"></span></td>
                <td><router-link class="button is-text" to="/carga">✎</router-link></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Peso de la carga</label></td>
                <td><span v-html="data.carga.peso"></span>kg</td>
                <td><router-link class="button is-text" to="/carga">✎</router-link></td>
              </tr>  

            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-show="Object.keys(data.estimate).length" class="columns actions navbar is-fixed-bottom is-vcentered has-text-centered">
      <div class="column has-text-centered">
        <a href="#" @click="submit" class="button is-success is-medium">Confirmar</a>
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
      t.$router.push('/')
    }

    t.$root.loading = true
    axios.post( t.$root.endpoint + '/flet/estimate', {
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
    submit:function(){
      var t = this
      if(!t.$root.loading){
        t.$root.loading = true
        axios.post( t.$root.endpoint + '/flet/preference', {
          id: t.data.id
        } ).then((res) => {
          if(res.data.id){
            localStorage.setItem('preference',JSON.stringify(res.data))
            t.$router.push('/pago')
          } else {
            this.$root.snackbar('danger','La preferencia de pago no pudo ser recibida. Por favor intente de nuevo en unos instantes.')
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
          carga:null,
          peso:null
        },
        datos:{},
        estimate:{}
      }
    }
  }
}
</script>
