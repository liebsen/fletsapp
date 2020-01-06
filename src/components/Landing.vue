<template>
  <div class="columns" id="photo">
    <div class="column">
      <div class="landing-container">
        <div class="landing-text content">
          <h2>Llevalo y traelo ... al toque!</h2>
          <h4>Entregamos en Capital Federal y GBA Lunes a Sábado de 8:00 a 18:00hs</h4>
          <router-link class="button is-action is-info is-outlined is-large" to="/ruta">
            <span class="icon">
              <span class="fas fa-truck-loading"></span>
            </span> 
            <span>Comenzar</span>  
          </router-link>
        </div>
        <div class="landing-scale">
        </div>
      </div>
    </div>
  </div>        
</template>

<script>

  export default {
    name: 'landing',
    mounted: function(){
      document.querySelector('.landing-scale').classList.remove('expand')
      document.querySelector('.landing-scale').classList.remove('collapse')
      document.querySelector('.is-action').addEventListener('mouseover', () => {
        document.querySelector('.landing-scale').classList.remove('collapse')
        document.querySelector('.landing-scale').classList.add('expand')
      }, false)
      document.querySelector('.is-action').addEventListener('mouseleave', () => {
        document.querySelector('.landing-scale').classList.remove('expand')
        document.querySelector('.landing-scale').classList.add('collapse')
      }, false)
    }
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

  .landing-container {
    display: flex;
    align-content: center;
    height: 100vh;
  }

  .landing-scale {
    opacity: 0;
    height: 220px;
    background-color: #7FDBFF;
    width: 100vw;
    margin: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .landing-text {
    opacity: 0.9;
    background-color: #7FDBFF;
    position: relative;
    z-index: 1;
    margin: auto!important;
    text-align: center;
    width: 100vw;
    padding: 2rem 2rem;
  }

  .landing-text h2, .landing-text h4 {
    color: hsla(197, 100%, 20%, 1.0)!important;
    text-shadow: 0 0 5px #7FDBFF;
  }

  .expand {
    -webkit-animation-name: expand;
    animation-name: expand;
   -webkit-animation-duration:.5s;
   animation-duration:.5s;
   -webkit-animation-timing-function:cubic-bezier(.23,1,.32,1);
   animation-timing-function:cubic-bezier(.23,1,.32,1);
   animation-fill-mode: forwards;
  }

  @keyframes expand {
    0%{
      opacity: 0;
      transform: scaleY(1);
    }
    to{
      opacity: 1;
      transform: scaleY(3);
    }
  }

  @-webkit-keyframes expand {
    0%{
      opacity: 0;
      transform: scaleY(1);
    }
    to{
      opacity: 1;
      transform: scaleY(3);
    }
  }

  .collapse {
    -webkit-animation-name: collapse;
    animation-name: collapse;
   -webkit-animation-duration:.5s;
   animation-duration:.5s;
   -webkit-animation-timing-function:cubic-bezier(.23,1,.32,1);
   animation-timing-function:cubic-bezier(.23,1,.32,1);
   animation-fill-mode: forwards;
  }

  @keyframes collapse {
    0%{
      opacity: 1;
      transform: scaleY(3);
    }
    to{
      opacity: 0;
      transform: scaleY(1);
    }
  }

  @-webkit-keyframes collapse {
    0%{
      opacity: 1;
      transform: scaleY(3);
    }
    to{
      opacity: 0;
      transform: scaleY(1);
    }
  }
</style>
