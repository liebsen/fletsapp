<template>
  <section class="hero">
    <div class="hero-body">
      <div v-show="data.payment_status === 'approved'" class="container content is-flex-column is-vertical">
        <h1 class="title">
          <span class="has-text-success">✔️ Tu pago fue recibido!</span>
        </h1>
        <h4>Un móvil FletsApp estará pasando a retirar tu envío en unos instantes.</h4>
        <p>Si tenés alguna duda o sugerencia podés seguir a:</p>
        <ul>
        <li><router-link to="/terminos">Términos y condiciones</router-link></li>
        <li><router-link to="/contacto">Contactanos</router-link></li>
        </ul>
      </div>

      <div v-show="data.payment_status === 'rejected'" class="container content is-flex-column is-vertical">
        <h1 class="title">
          <span class="has-text-danger">❌ Tu pago fue rechazado</span>
        </h1>
        <h4>Tu pago fue rechazado y tu solicitud no será procesada.</h4>
        <p>Si tenés alguna duda o sugerencia podés seguir a:</p>
        <ul>
        <li><router-link to="/terminos">Términos y condiciones</router-link></li>
        <li><router-link to="/contacto">Contactanos</router-link></li>
        </ul>
      </div>

      <div v-show="data.payment_status === 'in_process' || data.payment_status === ''" class="container content is-flex-column is-vertical">
        <h1 class="title">
          <span class="has-text-info">🕒 Tu pago está pendiente de aprobación</span>
        </h1>
        <h4>Tu pago todavía no fue acreditado. Cuando esto suceda te notificaremos y pasaremos a retirar el envío.</h4>
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
