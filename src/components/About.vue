<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h4>
          <span class="icon">
            <span class="fas fa-user-shield"></span>
          </span> 
          <span>Acerca de <em>FletsApp</em></span>
        </h4>
        <div class="notification is-info"><em>FletsApp</em> ofrece servicios de transporte de carga liviana por vía terrestre, con rápida recepción y entrega solicitadas, sin demoras.</div>

        <p>Cumplimos con las normas establecidas por las autoridades del transporte nacional, ofreciendo a nuestros clientes la confianza de un servicio eficiente, competitivo y de calidad para que su carga viaje segura, llegue en buen estado y a tiempo.</p>

        <p>Contamos con unidad, con capacidad de 650 Kg de carga útil. Distribución de Volumen: Largo: 1,40 mts, Ancho: 1,29 m x Altura: 1,34 m. Con su sistema de amarres y seguro de Transporte de Bienes.</p>        

        <p>Buscamos con todo esto lograr el prestigio y el liderazgo en este segmento del transporte automotor, para continuar ofreciendo las mejores posibilidades del mercado.</p>

        <br><br>
        <p>Enlaces útiles:</p>
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
