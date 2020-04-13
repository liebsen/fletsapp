<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h2>
          <span class="icon">
            <span class="fas fa-envelope"></span>
          </span> 
          <span>Contacto</span>
        </h2>
        <h4>En <em>FletsApp</em> estamos siempre dispuestos a recibir feedback de nuestros usuarios.</h4>
        <p>Por favor ingresa tus datos para contactarnos</p>
        <form class="form padless has-text-left fadeIn" @submit.prevent="submit">
          <div class="columns">
            <div class="column">
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input class="input" v-model="data.first_name" type="text" placeholder="Nombre" autofocus required>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input class="input" type="text" v-model="data.last_name" placeholder="Apellido" required>
                    </div>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div class="field">
                    <div class="control">
                      <input class="input" type="tel" v-model="data.phone" placeholder="Tu teléfono" autofocus required>
                    </div>
                  </div>
                  <div class="field">
                    <div class="control">
                      <input class="input" type="email" v-model="data.email" placeholder="Tu email" autofocus required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <div class="control">
                  <textarea v-model="data.comment" class="textarea" placeholder="Desarrolla tus comentarios aquí." required></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
             <input class="is-checkradio has-background-color is-success" v-model="acceptTerms" id="exampleCheckboxSuccess" type="checkbox" name="exampleCheckboxSuccess" checked="checked">
             <label for="exampleCheckboxSuccess"> Estoy de acuerdo con los <router-link to="/terminos">Términos y condiciones</router-link> de <em>FletsApp</em></label>
          </div>

          <div class="field">
            <div class="control has-text-centered">
              <button type="submit" class="button is-link is-medium" :class="{'is-loading' : $root.loading}">Contactar con&nbsp;<em>FletsApp</em></button>
            </div>
          </div>    
        </form>
      </div>
    </div>
  </section>

</template>

<script>
import axios from 'axios'
export default {
  name: 'contacto',
  methods : {
    submit : function(){
      if(!this.acceptTerms){
        this.$root.snackbar('error','Debes aceptar los términos y condiciones para contactarnos')
      } else {
        this.$root.loading = true
        axios.post('/contact', this.data ).then((res) => {
          if(res.data.status==='success'){
            this.$root.snackbar('success','El contacto fue recibido con éxito. Nos pondremos en contacto con vos a la brevedad.',10000)
          } else {
            this.$root.snackbar('danger','El contacto no pudo ser recibido. Por favor intente nuevamente en unos instantes.')
          }
          this.$root.loading = false
        })
      }
    }
  },
  data () {
    return {
      acceptTerms: false,
      data:{},
      msg: 'Welcome to FletsApp'
    }
  }
}
</script>
