<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h3 class="title">
          <span>🔌 No se encontró la página</span>
        </h3>
        <h4><em>FletsApp</em> no encontró el recurso que estás buscando. </h4>
        <p>Enlaces útiles:</p>
        <ul>        
        <li>Revisa la URL o dirígete a <router-link to="/">inicio</router-link>.</li>
        <li>Si crees que se trata de un error <router-link to="/contacto">contáctanos</router-link>.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotFound',
  data () {
    return {
      msg: 'Welcome to JetsBooking'
    }
  }
}
</script>
