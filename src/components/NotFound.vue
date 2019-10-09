<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container is-flex-column is-vertical">
        <h1 class="title">
          <span jsb-word="not-found">Esta partida no existe</span>
        </h1>
        <p jsb-word="not-found-text">Si cree que se trata de un error por favor contáctenos.</p>
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
