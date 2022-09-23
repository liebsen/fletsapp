<template>
  <div class="columns" id="photo">
    <div class="column slideIn">
      <div class="landing-container">
        <div class="landing-text content">
          <h2 class="has-text-success">Llevalo y traelo al toque</h2>
          <h4 class="has-text-success">Entregamos en Capital Federal y GBA de Lunes a Sábado de 8 a 18hs</h4>
          <router-link class="button is-rounded is-action is-success is-outlined is-large" to="/ruta">
            <span class="icon">
              <span class="fas fa-route"></span>
            </span> 
            <span>Empezar</span>  
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