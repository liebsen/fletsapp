<template>
  <div>
    <div class="form fadeIn">
      <div class="input-data bottom-spaced">
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

    <div v-show="data.nombre && data.telefono" class="columns actions navbar is-fixed-bottom is-vbaseline has-text-centered">
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

