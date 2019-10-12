<template>
  <div class="columns is-vcentered has-text-centered" id="photo">
    <div class="column">
      <div class="landing-text content slideIn">
        <h1>FletsApp</h1>
        <h6>Llevalo y traelo al toque</h6>
        <router-link class="button is-white is-large" to="/ruta">
          <span>🚚</span> &nbsp;&nbsp;
          <span>Comenzar</span>
        </router-link>
      </div>
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
    top: 60px;
    bottom: -12px;
    padding-top: 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(/assets/img/calles-buenos-aires-1.jpg);  
  }

  #photo .button {
    box-shadow: 10px 10px 0 rgba(0,0,0,0.5)
  }

  .landing-text {
    background-color: #ffdd57;
    padding: 2rem;
    padding-top: 1.5rem;
    margin-bottom: 1rem;
  }

</style>
