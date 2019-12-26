<template>
  <div class="columns is-vcentered has-text-centered" id="photo">
    <div class="column">
      <div class="landing-text-container">
        <div class="landing-text content slideIn">
          <h2>Llevalo y traelo ... al toque!</h2>
          <h4>Entregamos en Capital Federal y GBA Lunes - Sábado 8am - 6pm</h4>
          <router-link class="button is-info is-large" to="/ruta">
            <span class="icon">
              <span class="fas fa-truck-loading"></span>
            </span> 
            <span>Comenzar</span>  
          </router-link>
        </div>
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
    /*box-shadow: 10px 10px 0 rgba(0,0,0,0.5)*/
  }

  .landing-text-container {
    /*background-color: #ffdd57;*/
    opacity: 0.9;
  }

  .landing-text {
    /*background-color: #ffdd57;*/
    background-color: #59fff1;
    padding: 2rem;
    padding-top: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .landing-text h2, .landing-text h4 {
    color: #2d7e62;
    text-shadow: 0 0 5px white;
  }

</style>
