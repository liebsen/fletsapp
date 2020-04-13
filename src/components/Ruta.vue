<template>
  <div>
    <div class="form" id="form">
      <div class="input-data">
        <div class="columns is-vcentered">
          <div v-for="(item, index) in waypoints" class="column" :key="index">
            <div class="field">
              <div class="control">
                <input type="text" 
                  class="input is-rounded" 
                  :ref="`waypoint_${index}`"  
                  :id="`waypoint_${index}`" 
                  :placeholder="item.placeholder"                   
                  :class="{ 'is-info has-text-info': !item.is_waypoint && index < waypoints.length, 'is-success has-text-success': !item.is_waypoint && index === waypoints.length - 1, 'is-warning has-text-warning': item.is_waypoint }" 
                  :autofocus="index===0" 
                  :disabled="item.disabled"
                  :value="item.value"
                  @focus="autocompleteFocus" 
                  @blur="autocompleteBlur" />
              </div>
            </div>
          </div>
          <div class="column is-1">
            <a @click="addSegment" class="button is-rounded is-success is-circle is-outlined">
              <span class="icon">
                <span class="fa fa-plus"></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id='map' :style="{ height: mapHeight + 'px'}"></div>
    <div v-show="Object.keys(data.distance).length" class="columns actions navbar is-fixed-bottom is-vbaseline has-text-centered" id="actions">
      <div class="bottomright">
        <div class="button is-rounded is-small is-success">
          <span class="icon">
            <span class="fas fa-route"></span>
          </span>
          <span v-html="data.distance.text"></span>
        </div>
        <div class="button is-rounded is-small is-success">
          <span class="icon">
            <span class="fas fa-stopwatch"></span>
          </span>
          <span v-html="data.duration.text"></span>
        </div>
        <a href="#" @click="removeSaved" class="button is-rounded is-danger is-text is-small">
          <span class="icon">
            <span class="fas fa-times"></span>
          </span>
          <span>Descartar esta ruta</span>          
        </a>
      </div>
      <div class="column has-text-centered">
        <router-link to="/carga" class="button is-rounded is-info is-medium">Continuar</router-link>
      </div>
    </div>  
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ruta',
  mounted () {
    var t = this
    t.$root.loading = true
    t.checkSavedData()
    this.$root.snackbar('default','Por favor selecciona el <span class="has-text-weight-bold has-text-info">dirección de recepción</span> y <span class="has-text-weight-bold has-text-success">dirección de entrega</span> para tu viaje')
  },
  methods: {
    autocompleteFocus ({type, target}) {
      if (target.value) {
        target.setAttribute('text', target.value)
      }
      target.value = ''
    },
    autocompleteBlur ({type, target}) {
      let value = target.value
      if (target.getAttribute('text')) {
        value = target.getAttribute('text')
      }
      target.value = value
    },
    initMap () {
      this.directionsService = new google.maps.DirectionsService;
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZnJlZSIsImEiOiJ5ZFd0U19vIn0.Z7WBxuf0QKPrdzv2o6Mx6A';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-58.381619, -34.603767],
        interactive: false,
        zoom: 10
      });
      this.map = map  
      this.$root.loading = false
    },
    calculateAndDisplayRoute() {
      let t = this
      let waypoints = this.waypoints.filter(e => e.location)

      /* inputs disable state*/
      this.waypoints.map((e, i) => {
        let disabled = false
        if(i > waypoints.length) {
          disabled = true
        }
        this.waypoints[i].disabled = disabled
      })

      setTimeout(() => {
        document.getElementById(`waypoint_${waypoints.length}`).focus()
      }, 1000)

      if (!waypoints.length) {
        return
      }

      if (waypoints.length === 1) {
        this.createOrigMarker()
        this.map.flyTo({
          center: [waypoints[0].location.lng(), waypoints[0].location.lat()],
          zoom: 16
        })
      }

      if (waypoints.length > 1) {
        let waypoints_data = null
        let data = {
          origin: document.getElementById('waypoint_0').value,
          destination: document.getElementById('waypoint_' + parseInt(waypoints.length - 1)).value,
          avoidTolls: true,
          avoidHighways: true,
          travelMode: 'DRIVING'
        }

        if (waypoints.length > 2) {
          data.waypoints = waypoints.filter((e, i) => e.is_waypoint && e.location)
          data.optimizeWaypoints = true
          this.createWaypointsMarkers()
        }

        this.directionsService.route(data, function(response, status) {
          if (status === 'OK') {
            // this.directionsRenderer.setDirections(response);
            var route = response.routes[0];
            // var summaryPanel = document.getElementById('directions-panel');

            if(route){
              console.log(route.legs)

              // t.data = route.legs
              t.data.distance = response.routes[0].legs[0].distance
              t.data.duration = response.routes[0].legs[0].duration
              t.data.coordinates = []
              response.routes[0].legs[0].steps.forEach((step) => {
                t.data.coordinates.push([step.start_location.lng(),step.start_location.lat()])
                t.data.coordinates.push([step.end_location.lng(),step.end_location.lat()])
              })

              t.createOrigMarker()
              t.createDestMarker()  
              t.drawRoute()
              localStorage.setItem('ruta', JSON.stringify(t.data))
              t.$root.snackbar('success','📍 Distancia: ' + t.data.distance.text)
            } else {
              t.$root.snackbar('error','📍 No se pudo obtener datos de la ruta')
            }
            t.$root.loading = false
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        })
      }
    },
    addSegment ({type, target}) {
      this.waypoints.splice(this.waypoints.length - 1, 0, this.defaultSegment)
    },
    removeSaved () {
      var t = this
      t.$dialog
        .confirm('¿Descartar esta ruta?',{
          okText: 'Descartar',
          cancelText: 'Cerrar',
        })
        .then(function(dialog) {
          localStorage.removeItem('ruta')
          t.waypoints = []
          t.checkSavedData()
        })
        .catch(function() {
          console.log('Clicked on cancel');
        });
    },
    checkSavedData:function(){
      var t = this
      const saved = localStorage.getItem('ruta')
      this.waypoints.map((e, i) => {
        var autocomplete = new google.maps.places.Autocomplete(
          document.getElementById(`waypoint_${i}`),
          {
            types: ['geocode'],
            bounds: t.defaultBounds,
            strictBounds: true,
            componentRestrictions: {
              country: 'ar'
            }        
          }
        );

        google.maps.event.addListener(autocomplete, 'place_changed', function () {
          var place = autocomplete.getPlace()
          let ac = place.address_components
          let city = ac[0]["short_name"]
          t.waypoints[i] = {
            location: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
            stopover: true,
            value: place.formatted_address
          }
          t.calculateAndDisplayRoute()
        })
      })

      if(saved){
        t.data = JSON.parse(saved)
        t.initMap()
      } else {
        if (!navigator.geolocation){
          this.$root.snackbar('default','No se pudo obtener ubicación')
          t.initMap()
        }
        navigator.geolocation.getCurrentPosition(function(position){
          t.waypoints[0] = {
            location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            stopover: true
          }
          t.getAddressFromLatLng()
          t.initMap()
        }, function() {
          t.$root.snackbar('default','Por favor habilite el permiso para ubicación')
          t.initMap()
        })    
      }
    },
    drawRoute: function() {
      var mapLayer = this.map.getLayer('coordinates');
      if(typeof mapLayer !== 'undefined') {
        this.map.removeLayer('coordinates').removeSource('coordinates');        
      }

      console.log('coordinates')
      console.log(this.data.coordinates)

      this.map.addLayer({
        "id": "coordinates",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": this.data.coordinates
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
      })

      var bounds = this.data.coordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(this.data.coordinates[0], this.data.coordinates[0]));

      console.log('bounds')
      console.log(bounds)

      this.map.fitBounds(bounds,{
        padding:100, 
        offset:[0,-35]
      })   
    },
    getAddressFromLatLng: function () {
      var latlng = new google.maps.LatLng(this.data.from.lat, this.data.from.lng);
      var geocoder = new google.maps.Geocoder()
      geocoder.geocode({
        'latLng': latlng
      }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            this.waypoints[0].value = results[1].formatted_address
            this.$root.snackbar('success','📍 ' + t.data.from.formatted_address);
          } else {
            this.$root.snackbar('error','No results found');
          }
        } else {
          this.$root.snackbar('error','Geocoder failed due to: ' + status);
        }
      });
    },   
    createOrigMarker () {
      var mapLayer = this.map.getLayer('orig');
      let t = this
      
      if(typeof mapLayer !== 'undefined') {
        this.map.removeImage('orig')
        this.map.removeLayer('orig').removeSource('orig')
      }

      this.map.loadImage('/static/img/orig.png', function(error, image) {
        if (error) throw error;
        t.map.addImage('orig', image);
        console.log('********')
        console.log(t.waypoints[0].location.lat())
        console.log(t.waypoints[0].location.lng())

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
                  "coordinates": [t.waypoints[0].location.lng(), t.waypoints[0].location.lat()]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "orig",
            "icon-size": 0.35
          }
        });
      });
    },
    createDestMarker () {
      var mapLayer = this.map.getLayer('dest')
      let waypoints = this.waypoints.filter(e => e.is_waypoint && e.location)
      let t = this
      
      if(typeof mapLayer !== 'undefined') {
        this.map.removeImage('dest')
        this.map.removeLayer('dest').removeSource('dest')
      }

      this.map.loadImage('/static/img/dest.png', function(error, image) {
        if (error) throw error;
        t.map.addImage('dest', image);
        console.log('********')
        console.log(waypoints[0].location.lng())

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
                  "coordinates": [waypoints[waypoints.length - 1].location.lng(), waypoints[waypoints.length - 1].location.lat()]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "orig",
            "icon-size": 0.35
          }
        });
      });
    },
    createWaypointsMarkers : function(){
      //var bounds = new google.maps.LatLngBounds();
      let t = this
      //var llb = new mapboxgl.LngLatBounds(orig, dest);
      //this.map.fitBounds(llb,{padding:100, offset:[0,-30]});
      this.waypoints.map((e, i) => {
        var mapLayer = this.map.getLayer(`w_${i}`);

        if(typeof mapLayer !== 'undefined') {
          this.map.removeImage(`w_${i}`)
          this.map.removeLayer(`w_${i}`).removeSource(`w_${i}`)
        }

        this.map.loadImage('/static/img/waypoint.png', function(error, image) {
          if (error) throw error
          t.map.addImage(`w_${i}`, image)
          t.map.addLayer({
            "id": `w_${i}`,
            "type": "symbol",
            "source": {
              "type": "geojson",
              "data": {
                "type": "FeatureCollection",
                "features": [{
                  "type": "Feature",
                  'properties': {
                    'description': i,
                    'icon': 'map-marker'
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [t.waypoints[i].location.lng(), t.waypoints[i].location.lat()]
                  }
                }]
              }
            },
            "layout": {
              "icon-image": "dest",
              "icon-size": 0.35
            }
          });
        })
      })
    },
    setMapHeight: function(){
      this.mapHeight = window.innerHeight - (document.getElementById('form').clientHeight + document.getElementById('form').offsetTop)
    }
  },
  data () {
    return {
      map: null,
      mapHeight: 0,
      directionsService: null,
      data: {},
      waypoints: [
        {
          placeholder: 'Dirección de recepción',
          location: new google.maps.LatLng(-34.603767, -58.381619),
          stopover: true,
          disabled: false,
          value: ''
        },
        {
          placeholder: 'Dirección de entrega',
          stopover: false,
          disabled: true,
          value: ''
        }
      ],
      defaultSegment: {
        placeholder: 'Parada',
        is_waypoint: true,
        stopover: true,
        disabled: true,
        value: 'Dirección de parada'
      },
      defaultBounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(-35.564406, -60.292954),
        new google.maps.LatLng(-34.362287, -58.142812)
      ),
      data: {
        distance: {},
        duration: {},
        legs: [],
        from:{
          formatted_address:'',
          lat:0,
          lng:0
        },
        to:{
          formatted_address:'',
          lat:0,
          lng:0        
        }
      }
    }
  }
}
</script>