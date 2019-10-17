<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container content is-flex-column is-vertical">
        <h2 class="title">
          <span>💰 Cómo cotiza <em>FletsApp</em></span>
        </h2>
        <h4>En <em>FletsApp</em> estamos preparados y dispuestos para brindarle soluciones logísticas.</h4>
        <p>En <em>FletsApp</em> tenemos en cuenta los siguientes parámetros para cotizar los flets:</p>
        <ul>
        <li><a href="#ruta">Ruta</a></li>
        <li><a href="#carga">Carga</a></li>
        <li><a href="#adicional">Costo adicional</a></li>
        </ul>
        <a name="ruta"></a>
        <h4>Ruta</h4>
        <p>En el cálculo de la ruta obtenemos varios datos, como coordenadas de trayecto, distancia y tiempo estimado de viaje con la ayuda de <em>Google Directions API</em>. De esos datos para calcular el costo de la cotización extraemos el valor de la distancia.</p>

        <p>La tarifa básica por distancia incluye las solicitudes de transporte hasta 20 kilómetros. Por encima de este valor se cotizará un valor extra por kilómetro.</p>
        
        <a name="carga"></a>
        <h4>Carga</h4>

        <p>A partir de los datos de la carga extraemos el valor de su peso.</p>

        <p>La tarifa básica por carga incluye las solicitudes de transporte hasta 100 kilogramos. Por encima de este valor se cotizará un valor extra por kilogramo.</p>
        
        <a name="carga"></a>
        <h4>Costo adicional</h4>

        <p>La cotización puede sufrir costos adicionales si por ejemplo usted necesita que el móvil espere en algún punto del recorrido tanto sea en el origen o el destino.</p>

        <p>Los costos son calculados evitando peajes, si por algún motivo es estrictamente necesario el pago de estos se adicionarán al presupuesto original.</p>


        <h4>Transparencia y confiabilidad</h4>

        <p>Todos las cotizaciones son generadas automáticamente por nuestra aplicación garantizando el trato igualitario con todos nuestros clientes.</p>
        
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
  name: 'cotizacion',
  mounted: function(){
  },
  data () {
    return {
    }
  }
}
</script>
