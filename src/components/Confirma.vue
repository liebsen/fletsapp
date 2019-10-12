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

      <div class="input-data">
        <div class="columns content has-text-centered fadeLeft">
          <div class="column confirm-container has-text-left">
            <h3>Datos de tu Flet</h3>
            <table class="table is-bordered">
              <tr>
                <td class="has-background-light"><label>Inicia</label></td>
                <td><span v-html="data.ruta.from.formatted_address"></span></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Entrega</label></td>
                <td><span v-html="data.ruta.to.formatted_address"></span></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Distancia</label></td>
                <td><span v-html="data.ruta.distance.text"></span></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Tipo de carga</label></td>
                <td><span v-html="data.carga.carga"></span></td>
              </tr>
              <tr>
                <td class="has-background-light"><label>Peso de la carga</label></td>
                <td><span v-html="data.carga.peso"></span></td>
              </tr>  
              <tr>
                <td class="has-background-success"><label class="has-text-white">Costo</label></td>
                <td class="has-background-success">
                  <span class="has-text-white" v-html="data.price.price"></span> 
                  <span class="has-text-white" v-html="data.price.currency"></span>
                </td>
              </tr>  
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-show="data.price" class="columns actions navbar is-fixed-bottom is-vcentered has-text-centered">
      <div class="column has-text-centered">
        <router-link to="/pago" class="button is-success is-large">Confirmar</router-link>
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
    var price = localStorage.getItem('price')
    if(ruta && carga){
      t.data.ruta = JSON.parse(ruta)
      t.data.carga = JSON.parse(carga)
    } else {
      t.$router.push('/')
    }
    if(price){
      t.data.price = JSON.parse(price)
    } else {
      t.$root.loading = true
      axios.post( t.$root.endpoint + '/confirm', {} ).then((res) => {
        if(res.data.status==='success'){
          t.data.price = res.data
          localStorage.setItem('price',JSON.stringify(res.data))
        } else {
          this.$root.snackbar('danger','La confirmación no pudo ser comprobada. Por favor intente de nuevo en unos instantes.')
        } 
        t.$root.loading = false       
      })
    }
  },
  data () {
    return {
      data: {
        ruta:{
          distance:{},
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
        price:{}
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
  .confirm-container {
    margin: 0 auto;
    max-width: 500px;
  }

</style>
