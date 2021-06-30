<template>
  <section class="hero">
    <div class="hero-body">
      <div v-if="data.payment_status === 'approved'" class="container content is-flex-column is-vertical">
        <h3 class="title">
          <span class="has-text-success">✔️ Tu pago fue recibido!</span>
        </h3>
        <div class="notification is-success">Un móvil FletsApp estará pasando a retirar tu envío en unos instantes.</div>
        <p>Si tenés alguna duda o sugerencia podés seguir a:</p>
        <ul>
        <li><router-link to="/terminos">Términos y condiciones</router-link></li>
        <li><router-link to="/contacto">Contactanos</router-link></li>
        </ul>
      </div>
      <div v-if="data.payment_status === 'rejected'" class="container content is-flex-column is-vertical">
        <h1 class="title">
          <span class="has-text-danger">❌ Tu pago fue rechazado</span>
        </h1>
        <div class="notification is-danger">Tu pago fue rechazado y esta solicitud no será procesada. <router-link to="/confirma">Intenta nuevamente</router-link> en unos minutos.</div>
        <p>Si tenés alguna duda o sugerencia podés seguir a:</p>
        <ul>
        <li><router-link to="/terminos">Términos y condiciones</router-link></li>
        <li><router-link to="/contacto">Contactanos</router-link></li>
        </ul>
      </div>
      <div v-if="data.payment_status === 'in_process' || data.payment_status === ''" class="container content is-flex-column is-vertical">
        <h1 class="title">
          <span class="has-text-info">🕒 Tu pago está pendiente de aprobación</span>
        </h1>
        <div class="notification is-warning"><span class="has-text-white">Tu pago todavía no fue acreditado. Cuando esto suceda te notificaremos y pasaremos a retirar el envío.</span></div>
        <p>Si tenés alguna duda o sugerencia podés seguir a:</p>
        <ul>
        <li><router-link to="/terminos">Términos y condiciones</router-link></li>
        <li><router-link to="/contacto">Contactanos</router-link></li>
        </ul>
      </div>
      <div v-if="data.payment_status !== 'approved' && data.payment_status !== 'rejected' && data.payment_status !== 'in_process'" class="container content is-flex-column is-vertical">
        <h3 class="title">
          <span class="has-text-success">Estado desconocido</span>
        </h3>
        <div class="notification is-info">El estado de este envío no está determinado, por favor vuelva a intentarlo e
        n unos minutos.</div>
        <p>Si tenés alguna duda o sugerencia podés seguir a:</p>
        <ul>
        <li><router-link to="/terminos">Términos y condiciones</router-link></li>
        <li><router-link to="/contacto">Contactanos</router-link></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'pago_completado',
  mounted: function(){
    this.data.payment_status = this.$route.params.status
  },
  data () {
    return {
      data: {
        payment_status:''
      }
    }
  }
}
</script>
