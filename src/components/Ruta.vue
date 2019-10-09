<template>
  <div>
    <div class="form columns is-vcentered">
      <div class="column">
        <div class="field">
          <label class="label has-text-info">Origen</label>
          <div class="control">
            <input class="input is-info" type="text" placeholder="Desde" :value="from.formatted_address">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label has-text-success">Destino</label>
          <div class="control">
            <input ref="input" class="input is-success" type="text" placeholder="Hasta" autofocus>
          </div>
        </div>
      </div>
    </div>
    <div id='map'></div>
  </div>
</template>

<script>
export default {
  name: 'ruta',
  mounted: function(){

    var t = this
    if (!navigator.geolocation){
      this.$root.snackbar('error','No se pudo obtener ubicación')
    }
    navigator.geolocation.getCurrentPosition(function(position){
      t.from.latitude  = position.coords.latitude
      t.from.longitude = position.coords.longitude
      t.codeLatLng(position.coords.latitude,position.coords.longitude)
      t.initMap()
    }, function() {
      t.$root.snackbar('error','No se pudo obtener ubicación')
      t.initMap()
    })    

    this.$nextTick(() => this.$refs.input.focus())
  },
  methods: {
    codeLatLng: function (lat, lng) {
      var latlng = new google.maps.LatLng(lat, lng);
      var t = this
      var geocoder = new google.maps.Geocoder()
      geocoder.geocode({
        'latLng': latlng
      }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            t.from.formatted_address = results[1].formatted_address
            t.$root.snackbar('success','Ubicación obtenida: ' + t.from.formatted_address);
          } else {
            t.$root.snackbar('error','No results found');
          }
        } else {
          t.$root.snackbar('error','Geocoder failed due to: ' + status);
        }
      });
    },   
    initMap : function(){
      var t = this
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZnJlZSIsImEiOiJ5ZFd0U19vIn0.Z7WBxuf0QKPrdzv2o6Mx6A';
       
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [t.from.longitude, t.from.latitude],
        zoom:14
      });
       
      map.on('load', function() {
        map.loadImage('/assets/img/orig.png', function(error, image) {
          if (error) throw error;
          map.addImage('cat', image);
          map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  "geometry": {
                    "type": "Point",
                    "coordinates": [t.from.longitude, t.from.latitude]
                  }
                }]
              }
            },
            "layout": {
              "icon-image": "cat",
              "icon-size": 0.25
            }
          });
        });

        document.querySelector('.form').classList.add('fadeIn')
      });      
    }
  },
  data () {
    return {
      from:{
        formatted_address:'',
        latitude:'',
        longitude:''
      },
      to:{}
    }
  }
}
</script>

<style>
  .form {
    padding: 1rem;
    opacity: 0;
    position:relative; 
    z-index: 9;
  }
  #map { 
    position:absolute; 
    top:0; 
    bottom:0; 
    width:100%; 
  }
</style>
