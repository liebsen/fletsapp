<template>
  <div>
    <div class="form" id="form">
      <div class="input-data">
        <div class="columns is-vcentered">
          <div v-for="(item, index) in data.waypoints" class="column" :key="index">
            <div class="field">
              <div class="control">
                <input type="text" 
                  class="input is-rounded" 
                  :ref="`waypoint_${index}`"  
                  :id="`waypoint_${index}`" 
                  :placeholder="item.placeholder"                   
                  :class="{ 'is-info has-text-info': index === 0, 'is-warning has-text-warning': index && index < data.waypoints.length - 1, 'is-success has-text-success': index === data.waypoints.length - 1 }" 
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
import swal from 'sweetalert'
export default {
  name: 'ruta',
  created () {
    this.$root.loading = true
    this.data.waypoints = this.defaultWaypoints
  },
  mounted () {
    this.checkSavedData()
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
    addSegment ({type, target}) {
      this.data.waypoints.splice(this.data.waypoints.length - 1, 0, this.defaultSegment)
      this.$nextTick(() => {
        this.initAutocomplete(this.data.waypoints.length - 1)
        this.checkWaypoints()
      })
    },
    initMap () {
      let t = this
      return new Promise((resolve, reject) => {
        t.directionsService = new google.maps.DirectionsService;
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZnJlZSIsImEiOiJ5ZFd0U19vIn0.Z7WBxuf0QKPrdzv2o6Mx6A';
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [-58.381619, -34.603767],
          interactive: false,
          zoom: 10
        });
        t.map = map  
        t.$root.loading = false
        resolve(map)
      })
    },
    initAutocomplete (index) {
      let t = this
      var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById(`waypoint_${index}`),
        {
          types: ['geocode'],
          bounds: t.defaultBounds,
          strictBounds: true,
          componentRestrictions: {
            country: 'ar'
          }        
        }
      )

      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace()
        let ac = place.address_components
        let city = ac[0]["short_name"]
        t.data.waypoints[index] = {
          location: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
          stopover: true,
          value: place.formatted_address
        }
        t.calculateAndDisplayRoute()
      })
    },
    checkWaypoints () {
      let waypoints = this.data.waypoints.filter(e => e.location)
      this.data.waypoints.map((e, i) => {
        let disabled = false
        if(i > waypoints.length) {
          disabled = true
        }
        this.data.waypoints[i].disabled = disabled
      })

      setTimeout(() => {
        if (document.getElementById('waypoint_' + waypoints.length)) {
          document.getElementById('waypoint_' + waypoints.length).focus()
        }
      }, 1000)
    },
    calculateAndDisplayRoute() {
      let t = this
      let waypoints = this.data.waypoints.filter(e => e.location)

      /* inputs disable state*/

      this.checkWaypoints()

      if (!waypoints.length) {
        return
      }

      this.createWaypointsMarkers()

      if (waypoints.length === 1) {
        this.map.flyTo({
          center: [waypoints[0].location.lng(), waypoints[0].location.lat()],
          zoom: 16
        })
      }

      if (waypoints.length > 1) {
        let data = {
          origin: document.getElementById('waypoint_0').value,
          destination: document.getElementById('waypoint_' + parseInt(waypoints.length - 1)).value,
          avoidTolls: true,
          avoidHighways: true,
          travelMode: 'DRIVING'
        }

        if (waypoints.length > 2) {
          waypoints = waypoints.filter((e, i) => i && i < waypoints.length - 1 && e.location)
          data.waypoints = waypoints.map(e => {
            return {
              location: {
                lat: e.location.lat(),
                lng: e.location.lng()
              }
            }
          })
          data.optimizeWaypoints = true
        }

        this.directionsService.route(data, function(response, status) {
          if (status === 'OK') {
            // this.directionsRenderer.setDirections(response);
            var route = response.routes[0];
            // var summaryPanel = document.getElementById('directions-panel');

            if(route){
              // t.data = route.legs
              t.data.coordinates = []
              for (var i = 0; i < route.legs.length; i++) {
                const leg = route.legs[i]
                for (var j = 0; j < leg.steps.length; j++) {
                  const step = leg.steps[j]
                  t.data.coordinates.push([step.start_location.lng(),step.start_location.lat()])
                  t.data.coordinates.push([step.end_location.lng(),step.end_location.lat()])
                }
              }
              t.computeTotalDistance(route)
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
    removeSaved () {
      var t = this
      swal({
        title: 'Eliminar ruta',
        text: '¿Deseas eliminar esta ruta?',
        buttons: ["No", "Sí"]
      })
      .then(accept => {
        if (accept) {
          localStorage.removeItem('ruta')
          t.data.waypoints = t.defaultWaypoints
          t.checkSavedData()
        } else {
          console.log('Clicked on cancel')
        }
      })
    },
    computeTotalDistance(route) {
      var totalDist = 0;
      var totalTime = 0;
      for (i = 0; i < route.legs.length; i++) {
        totalDist += route.legs[i].distance.value
        totalTime += route.legs[i].duration.value
      }
      totalDist = totalDist / 1000
      this.data.distance = totalDist + 'km'
      this.data.duration = (totalTime / 60).toFixed(2) + 'min'
    },
    checkSavedData:function(){
      var t = this
      const saved = JSON.parse(localStorage.getItem('ruta')) || {}
      let waypoints = saved.waypoints || this.defaultWaypoints
      this.$nextTick(() => {
        waypoints.map((e, i) => {
          this.initAutocomplete(i)
        })
      })

      if(Object.keys(saved).length){
        t.data = saved
        t.initMap().then(map => {
          map.on('load', () => {
            t.createWaypointsMarkers()
            t.drawRoute()
          })
        })
      } else {
        if (!navigator.geolocation){
          this.$root.snackbar('default','No se pudo obtener ubicación')
          t.initMap()
        }
        navigator.geolocation.getCurrentPosition(function(position){
          t.data.waypoints[0] = {
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
            this.data.waypoints[0].value = results[1].formatted_address
            this.$root.snackbar('success','📍 ' + t.data.from.formatted_address);
          } else {
            this.$root.snackbar('error','No results found');
          }
        } else {
          this.$root.snackbar('error','Geocoder failed due to: ' + status);
        }
      });
    },
    createWaypointsMarkers () {
      let t = this
      let waypoints = this.data.waypoints.filter(e => e.location)
      //var bounds = new google.maps.LatLngBounds();
      //var llb = new mapboxgl.LngLatBounds(orig, dest);
      //this.map.fitBounds(llb,{padding:100, offset:[0,-30]});
      waypoints.map((e, i) => {
        var mapLayer = t.map.getLayer(`w_${i}`);
        var icon = 'orig'

        if (i > 0) {
          if (i < waypoints.length - 1) {
            icon = 'waypoint'
          } else {
            icon = 'dest'
          }
        }

        if(typeof mapLayer !== 'undefined') {
          t.map.removeImage(`w_${i}`)
          t.map.removeLayer(`w_${i}`).removeSource(`w_${i}`)
        }

        t.map.loadImage(`/static/img/${icon}.png`, function(error, image) {
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
                    'description': e.formatted_address,
                    'icon': 'map-marker'
                  },
                  "geometry": {
                    "type": "Point",
                    "coordinates": [t.data.waypoints[i].location.lng, t.data.waypoints[i].location.lat]
                  }
                }]
              }
            },
            "layout": {
              "icon-image": `w_${i}`,
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
      defaultSegment: {
        placeholder: 'Parada',
        stopover: true,
        disabled: true,
        value: 'Dirección de parada'
      },
      defaultBounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(-35.564406, -60.292954),
        new google.maps.LatLng(-34.362287, -58.142812)
      ),
      defaultWaypoints: [
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
      data: {
        distance: {},
        duration: {},
        waypoints: [],
        coordinates: []
      }
    }
  }
}
</script>