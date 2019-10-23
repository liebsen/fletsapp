<template>
  <div class="columns is-vcentered has-text-centered" id="photo">
    <div class="column">
      <div class="landing-text content slideIn">
        <h2>Llevalo y traelo al toque</h2>
        <p>
          <span>Entregamos en Capital Federal y alrededores de 8 a 18hs.</span>
        </p>
        <router-link class="button is-white is-large" to="/ruta">
          <span class="icon">
            <span class="fas fa-truck-loading"></span>
          </span> 
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
    display: inline-flex;
    position: fixed;
    left: 0;
    right:0;
    top: 0;
    bottom: -12px;
    padding-top: 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(/assets/img/avenida-santa-fe.jpg);  
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
