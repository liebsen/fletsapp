<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h3>
          <span class="icon">
            <span class="fas fa-unlock-alt"></span>
          </span> 
          <span>Política de privacidad</span>
        </h3>
        <h4><em>FletsApp</em> se compromete con sus usuarios a tratar su información personal con la responsabilidad social que se merecen.</h4>

        <p>Cumplimos con las normas establecidas por los estándares informáticos referentes a la seguridad de las transacciones y análisis de base de datos. No guardamos datos de tarjetas de crédito, débito sino que dejamos la operación exclusivamente a la tercera parte en este caso <a href="https://mercadopago.com" target="_blank">Mercado Pago</a>. </p>

        <p>Usamos un sistema para guardar sus datos personales denominado LocalStorage. Esta información se guarda exclusiva y temporalmente en tu navegador antes de ser enviado a nuestra base de datos.</p>        

        <p>Al momento de solicitar nuestro servicio borramos todos los datos relativos a información personal.</p>

        <p>No usamos terceras partes como <em>Google</em>, <em>Amazon</em>, <em>Facebook</em>, etc. para nuestra analítica, todos sus datos quedan seguramente guardados en nuestros servidores.</p>

        <p>Gracias por tomarte el tiempo de leer la información importante que tenemos para vos.</p>

        <br><br>
        <p><em>Que tengas un agradable Flet!</em></p>

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
