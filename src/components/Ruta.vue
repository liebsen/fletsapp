<template>
  <div>
    <div class="form" id="form">
      <div class="steps-frame">
        <ul class="steps is-narrow is-medium is-centered has-content-centered">
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span class="icon">
                <span class="fas fa-map-marker-alt"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Ruta</p>
            </div>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span class="icon has-text-grey">
                <span class="fas fa-truck-loading"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Carga</p>
            </div>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span class="icon has-text-grey">
                <span class="fas fa-user"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Mis datos</p>
            </div>
          </li>
          <li class="steps-segment is-active has-gaps">
            <span class="steps-marker">
              <span class="icon has-text-grey">
                <span class="fas fa-check"></span>
              </span>
            </span>
            <div class="steps-content">
              <p class="heading">Confirmación</p>
            </div>
          </li>
          <li class="steps-segment">
            <span class="steps-marker">
              <span class="icon has-text-grey">
                <span class="fas fa-credit-card"></span>
              </span>
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
              <!--label class="label has-text-info">Origen</label-->
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
              <!--label class="label has-text-success">Destino</label-->
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
    <div class="columns actions navbar is-fixed-bottom is-vcentered has-text-centered" id="actions">
      <div class="bottomright">
        <a href="#" @click="removeSaved" class="button is-danger is-small">
          <span class="icon">
            <span class="fas fa-times"></span>
          </span>

          <span>Descartar esta ruta</span>          
        </a>
      </div>
      <div class="column has-text-centered">
        <div v-show="Object.keys(data.distance).length" class="button is-small is-white" v-html="data.distance.text"></div>
        <div v-show="Object.keys(data.duration).length" class="button is-small is-white" v-html="data.duration.text"></div>
        <router-link v-show="Object.keys(data.distance).length" to="/carga" class="button is-info is-medium">Continuar</router-link>
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
    t.checkSavedData()
  },
  methods: {
    removeSaved:function(){
      var t = this
      t.$dialog
        .confirm('¿Descartar esta ruta?',{
          okText: 'Descartar',
          cancelText: 'Cerrar',
        })
        .then(function(dialog) {
          localStorage.removeItem('ruta')
          t.data = {
            distance:{},
            duration:{},
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
      const saved = localStorage.getItem('ruta')
      const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-34.907899, -58.935164),
      new google.maps.LatLng(-34.362287, -58.142812));

      /* autocomplete origin */
      t.autocomplete_orig = new google.maps.places.Autocomplete(
        (t.$refs.autocomplete_orig),
        {
          types: ['geocode'],
          bounds: defaultBounds,
          strictBounds: true,
          componentRestrictions: {
            country: 'ar'
          }        
        }
      );

      t.autocomplete_orig.addListener('place_changed', () => {
        let place = t.autocomplete_orig.getPlace();
        let ac = place.address_components;
        let city = ac[0]["short_name"];

        t.data.from = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          formatted_address: place.formatted_address
        }

        t.calculateRoute()
      });      

      /* autocomplete destination */
      t.autocomplete_dest = new google.maps.places.Autocomplete(
        (t.$refs.autocomplete_dest),
        {
          types: ['geocode'],
          bounds: defaultBounds,
          strictBounds: true,
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

        t.calculateRoute()
      });  

      if(saved){
        t.data = JSON.parse(saved)
        t.initMap()
        t.map.on('load', function() {
          t.createRoute()
          t.createOrigMarker()
          t.createDestMarker()
          document.querySelector('.form').classList.add('fadeIn')
          t.$root.loading = false
        })
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
          })    
        }, function() {
          t.$root.snackbar('error','No se pudo obtener ubicación')
          t.initMap()
        })    
      }
    },
    calculateRoute:function(){
      var t = this
      if(t.data.from.lat && t.data.to.lat){
        t.$root.loading = true
        axios.post( t.$root.endpoint + '/flet/directions', { 
          from: t.data.from, 
          to: t.data.to
        }).then((res) => {
          if(res.data.routes.length){
            t.data.distance = res.data.routes[0].legs[0].distance
            t.data.duration = res.data.routes[0].legs[0].duration
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
      } else {
        t.createOrigMarker()
        t.map.flyTo({center:[t.data.from.lng, t.data.from.lat]});
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
      t.map.fitBounds(llb,{padding:50});
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
      const height = (document.body.clientHeight - document.getElementById('actions').clientHeight) - document.getElementById('form').clientHeight;
      document.getElementById('map').style.height = height + 'px'
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
        duration:{},
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