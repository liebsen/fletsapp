<template>
  <div>
    <div class="form">
      <div class="steps-frame">
        <ul class="steps is-narrow is-medium is-centered has-content-centered">
          <li class="steps-segment is-active has-gaps">
            <a href="#" class="has-text-dark">
              <span class="steps-marker">
                <span>📍</span>
              </span>
              <div class="steps-content">
                <p class="heading">Ruta</p>
              </div>
            </a>
          </li>
          <li class="steps-segment is-active has-gaps">
            <a href="#" class="has-text-dark">
              <span class="steps-marker is-hollow">
                <span>📦</span>
              </span>
              <div class="steps-content">
                <p class="heading">Carga</p>
              </div>
            </a>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker is-hollow">
              <span>✔️</span>
            </span>
            <div class="steps-content">
              <p class="heading">Confirmación</p>
            </div>
          </li>
          <li class="steps-segment">
            <span class="steps-marker is-hollow">
              <span>💳</span>
            </span>
            <div class="steps-content">
              <p class="heading">Pago</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="input-data">
        <div class="columns is-vcentered">
          <div class="column">
            <div class="field">
              <label class="label has-text-info">Origen</label>
              <div class="control">
                <input ref="autocomplete_orig" 
                  placeholder="Origen" 
                  class="input is-info"
                  onfocus="value = ''" 
                  type="text" 
                  :value="data.from.formatted_address" />
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label has-text-success">Destino</label>
              <div class="control">
                <input ref="autocomplete_dest" 
                  placeholder="Destino" 
                  class="input is-success"
                  onfocus="value = ''" 
                  type="text" 
                  :value="data.to.formatted_address" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id='map'></div>
    <div v-show="Object.keys(data.distance).length" class="columns actions navbar is-fixed-bottom is-vcentered has-text-centered">
      <div class="topright">
        <a href="#" @click="removeSaved" class="button is-danger is-outlined is-large">❌</a>
      </div>
      <div class="column has-text-centered">
        <div v-show="Object.keys(data.distance).length" class="button is-large is-info" v-html="data.distance.text"></div>
        <router-link to="/carga" class="button is-success is-large">Continuar</router-link>
      </div>
    </div>  
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'ruta',
  mounted: function(){
    var t = this
    t.$root.loading = true
    t.$refs.autocomplete_dest.focus()
    t.checkSavedData()
  },
  methods: {
    removeSaved:function(){
      var t = this
      t.$dialog
        .confirm('Eliminar ruta actual',{
          okText: 'Eliminar',
          cancelText: 'Cerrar',
        })
        .then(function(dialog) {
          localStorage.removeItem('ruta')
          t.data = {
            distance:{},
            coordinates:[],
            from:{
              formatted_address:'',
              lat:'',
              lng:''
            },
            to:{
              formatted_address:'',
              lat:'',
              lng:''        
            }
          }
          t.checkSavedData()
        })
        .catch(function() {
          console.log('Clicked on cancel');
        });
    },
    checkSavedData:function(){
      var t = this
      var saved = localStorage.getItem('ruta')
      if(saved){
        t.data = JSON.parse(saved)
        t.initMap()
        t.map.on('load', function() {
          t.createRoute()
          t.createOrigMarker()
          t.createDestMarker()
          document.querySelector('.form').classList.add('fadeIn')
          t.$root.loading = false
        });
      } else {
        if (!navigator.geolocation){
          this.$root.snackbar('error','No se pudo obtener ubicación')
        }
        navigator.geolocation.getCurrentPosition(function(position){
          t.data.from.lat  = position.coords.latitude
          t.data.from.lng = position.coords.longitude
          t.getAddressFromLatLng()
          t.initMap()
          t.map.on('load', function() {
            t.createOrigMarker()
            document.querySelector('.form').classList.add('fadeIn')
            t.$root.loading = false
          });          
          t.autocomplete_dest = new google.maps.places.Autocomplete(
            (t.$refs.autocomplete_dest),
            {
              types: ['geocode'],
              componentRestrictions: {
                country: 'ar'
              }
            }
          );

          t.autocomplete_dest.addListener('place_changed', () => {
            let place = t.autocomplete_dest.getPlace();
            let ac = place.address_components;
            let city = ac[0]["short_name"];

            t.data.to = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              formatted_address: place.formatted_address
            }

            //var distance_mts = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(t.from.lat, t.from.lng), new google.maps.LatLng(t.to.lat, t.to.lng));
            //t.distance = parseFloat(distance_mts/1000).toFixed(2);

            t.$root.loading = true
            axios.post( t.$root.endpoint + '/directions', { from: t.data.from, to: t.data.to} ).then((res) => {
              if(res.data.routes.length){
                t.data.distance = res.data.routes[0].legs[0].distance
                t.data.coordinates = []
                res.data.routes[0].legs[0].steps.forEach((step) => {
                  t.data.coordinates.push([step.start_location.lng,step.start_location.lat])
                  t.data.coordinates.push([step.end_location.lng,step.end_location.lat])
                })

                t.createRoute()
                t.createOrigMarker()
                t.createDestMarker()

                localStorage.setItem('ruta',JSON.stringify(t.data))
                //t.$root.snackbar('success','📍 Distancia: ' + t.data.distance.text)
              } else {
                t.$root.snackbar('error','📍 No se pudo obtener datos de la ruta')
              }
              t.$root.loading = false
            })
            
            //t.$root.snackbar('success','📍 Distancia ' + t.distance + ' kms',1000);
          });      

        }, function() {
          t.$root.snackbar('error','No se pudo obtener ubicación')
          t.initMap()
          //t.initAutocomplete('dest')
        })    
      }
    },
    createRoute: function(){
      var t = this
      var mapLayer = t.map.getLayer('coordinates');
      if(typeof mapLayer !== 'undefined') {
        t.map.removeLayer('coordinates').removeSource('coordinates');        
      }

      t.map.addLayer({
        "id": "coordinates",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": t.data.coordinates
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#1496ed",
          "line-width": 8
        }
      });      
    },
    getAddressFromLatLng: function () {
      var latlng = new google.maps.LatLng(this.data.from.lat, this.data.from.lng);
      var t = this
      var geocoder = new google.maps.Geocoder()
      geocoder.geocode({
        'latLng': latlng
      }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            t.data.from.formatted_address = results[1].formatted_address
            t.$root.snackbar('success','📍 ' + t.data.from.formatted_address);
          } else {
            t.$root.snackbar('error','No results found');
          }
        } else {
          t.$root.snackbar('error','Geocoder failed due to: ' + status);
        }
      });
    },   
    createOrigMarker : function(){
      var t = this
      var mapLayer = t.map.getLayer('orig');

      if(typeof mapLayer !== 'undefined') {
        t.map.removeImage('orig')
        t.map.removeLayer('orig').removeSource('orig');        
      }

      t.map.loadImage('/assets/img/orig.png', function(error, image) {
        if (error) throw error;
        t.map.addImage('orig', image);
        t.map.addLayer({
          "id": "orig",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [t.data.from.lng, t.data.from.lat]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "orig",
            "icon-size": 0.25
          }
        });
      });
    },
    createDestMarker : function(){
      var t = this
      var bounds = new google.maps.LatLngBounds();
      var orig = new mapboxgl.LngLat(t.data.from.lng, t.data.from.lat);
      var dest = new mapboxgl.LngLat(t.data.to.lng, t.data.to.lat);  
      var llb = new mapboxgl.LngLatBounds(orig, dest);
      t.map.fitBounds(llb,{padding:200, offset: [0,25]});
      var mapLayer = t.map.getLayer('dest');

      if(typeof mapLayer !== 'undefined') {
        t.map.removeImage('dest')
        t.map.removeLayer('dest').removeSource('dest');        
      }

      t.map.loadImage('/assets/img/dest.png', function(error, image) {
        if (error) throw error;
        t.map.addImage('dest', image);
        t.map.addLayer({
          "id": "dest",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [t.data.to.lng, t.data.to.lat]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "dest",
            "icon-size": 0.25
          }
        });
      });
    },
    initMap : function(){
      var t = this
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZnJlZSIsImEiOiJ5ZFd0U19vIn0.Z7WBxuf0QKPrdzv2o6Mx6A';
       
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [t.data.from.lng, t.data.from.lat],
        interactive: false,
        zoom:14
      });
       
      t.map = map   
    }
  },
  data () {
    return {
      data: {
        distance:{},
        coordinates:[],
        from:{
          formatted_address:'',
          lat:'',
          lng:''
        },
        to:{
          formatted_address:'',
          lat:'',
          lng:''        
        }
      }
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
    top:60px; 
    bottom:0; 
    width:100%; 
  }
  .steps-frame {
    background-color: white;
    padding: 0.5rem;
    padding-top: 1rem;
    margin-top: -1rem;
    margin-left: -1rem;
    margin-right: -1rem;
  }
  .input-data {
    padding: 1rem;
  }
  .actions {
    background-color: transparent!important;
    padding-bottom: 5rem;
  }
  .topright {
    position: fixed;
    top: 80px;
    right: 20px;
  }

</style>
