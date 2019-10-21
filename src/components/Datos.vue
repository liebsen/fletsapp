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
          <li class="steps-segment">
            <router-link to="/carga" class="has-text-dark">
              <span class="steps-marker">
                <span class="icon">
                  <span class="fas fa-truck-loading"></span>
                </span>
              </span>
              <div class="steps-content">
                <p class="heading">Carga</p>
              </div>
            </router-link>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span class="icon">
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

      <div class="input-data">
        <div class="columns content has-text-centered fadeLeft">
          <div class="column options-container has-text-left">
            <h3>Mis datos</h3>
            <p>Por favor indicanos tus datos y comentarios personales acerca del envío si es necesario.</p>
            <div class="field">
              <label>Tu nombre completo (*)</label>
              <input class="input" type="text" v-model="data.nombre" placeholder="Miguel Rodríguez">
            </div>

            <div class="field">
              <label>Tu número de teléfono (*)</label>
              <input class="input" type="text" v-model="data.telefono" placeholder="011 3555 5555">
            </div>
            <div class="field">
              <label>Tus comentarios</label>
              <textarea class="textarea" v-model="data.comentarios" maxlength="500" placeholder="podés ingresar datos adicionales acá"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="data.nombre && data.telefono" class="columns actions navbar is-fixed-bottom is-vcentered has-text-centered">
      <div class="column has-text-centered">
        <a href="#" @click="submit" class="button is-info is-medium">Continuar</a>
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
        telefono:null,
        comentarios:null
      }
    }
  }
}
</script>

