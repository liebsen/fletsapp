<template>
  <div class="columns is-vcentered has-text-centered" id="photo">
    <div class="column">
      <router-link class="button is-white is-large" to="/ruta">
        <span>🚚</span> &nbsp;&nbsp;
        <span>Comenzar</span>
      </router-link>
    </div>
  </div>        
</template>

<script>

  export default {
    name: 'landing'
  }

</script>

<style type="text/css">

  #photo {
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    bottom: -12px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(/assets/img/calles-buenos-aires-1.jpg);  
  }

  #photo .button {
    box-shadow: 10px 10px 0 rgba(0,0,0,0.5)
  }

</style>
