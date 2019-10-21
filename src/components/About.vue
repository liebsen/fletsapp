<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h2>
          <span class="icon">
            <span class="fas fa-info-circle"></span>
          </span> 
          <span>Acerca de <em>FletsApp</em></span>
        </h2>
        <h4><em>FletsApp</em> ofrece servicios de transporte de carga liviana por vía terrestre, con rápida recepción y entrega solicitadas, sin demoras.</h4>

        <p>Cumplimos con las normas establecidas por las autoridades del transporte nacional, ofreciendo a nuestros clientes la confianza de un servicio eficiente, competitivo y de calidad para que su carga viaje segura, llegue en buen estado y a tiempo.</p>

        <p>Contamos con unidad, con capacidad de 650 Kg de carga útil. Distribución de Volumen: Largo: 1,40 mts, Ancho: 1,29 m x Altura: 1,34 m. Con su sistema de amarres y seguro de Transporte de Bienes.</p>        

        <p>Buscamos con todo esto lograr el prestigio y el liderazgo en este segmento del transporte automotor, para continuar ofreciendo las mejores posibilidades del mercado.</p>

        <p></p>
        <p>Algunas acciones que puedes tomar a partir de aquí:</p>
        <ul>
        <li>Volver a <router-link to="/">inicio</router-link>.</li>
        <li>Comienza hoy a usar FletsApp. <router-link to="/ruta">Comenzar</router-link>.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'about',
  mounted: function(){
  },
  data () {
    return {
    }
  }
}
</script>
