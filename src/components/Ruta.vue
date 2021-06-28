<template>
  <div>
    <div class="form" id="form">
      <div class="input-data slideIn" :key="inputKey">
        <div class="columns is-waypoints is-vcentered">
          <div v-for="(item, index) in data.waypoints" class="column" :key="index">
            <div class="field">
              <div class="control">
                <input type="text" 
                  class="input is-rounded" 
                  :index="index" 
                  :ref="`waypoint_${index}`"  
                  :id="`waypoint_${index}`" 
                  :placeholder="item.placeholder"
                  :class="{ 'is-info': index === 0, 'is-grey': index && index < data.waypoints.length - 1, 'is-success': index === data.waypoints.length - 1 }" 
                  :disabled="item.disabled"
                  :value="item.value"
                  @focus="autocompleteFocus" 
                  @blur="autocompleteBlur" />
              </div>
            </div>
          </div>
          <div v-show="readyToAdd" class="column is-1">
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
        <router-link to="/carga" class="button is-rounded is-success is-medium">Siguiente</router-link>
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
    this.$root.snackbar('success','Por favor seleccioná el <span class="has-text-weight-bold">dirección de recepción</span> y <span class="has-text-weight-bold">dirección de entrega</span> para tu viaje')
  },
  destroyed () {
    if (document.querySelector('.pac-container')) {
      document.querySelector('.pac-container').remove()
    }
    if (this.mapInterval) {
      clearInterval(this.mapInterval)
    }
  },
  computed: {
    readyToAdd () {
      return this.data.waypoints.filter(e => e.location).length > 1
    }
  },
  methods: {
    autocompleteFocus ({type, target}) {
      this.blurState = 0
      if (target.value && this.data.waypoints[target.getAttribute('index')].location) {
        target.setAttribute('text', target.value)
        this.map.flyTo({
          center: [this.data.waypoints[target.getAttribute('index')].location.lng, this.data.waypoints[target.getAttribute('index')].location.lat],
          zoom: 16
        })
      }
      target.value = ''
    },
    autocompleteBlur ({type, target}) {
      this.blurState = 1
      let value = target.value
      if (target.getAttribute('text')) {
        value = target.getAttribute('text')
      }
      if (this.data.coordinates.length) {
        setTimeout(() => {
          if (this.blurState) {
            this.blurState = 0
            var bounds = this.data.coordinates.reduce(function(bounds, coord) {
              return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(this.data.coordinates[0], this.data.coordinates[0]));

            this.map.fitBounds(bounds,{
              padding:100, 
              offset:[0,-50]
            })
          }
        }, 500)
      }
      target.value = value
    },
    addSegment ({type, target}) {
      this.data.waypoints.splice(this.data.waypoints.length - 1, 0, this.defaultSegment)
      this.$nextTick(() => {
        this.initAutocomplete(this.data.waypoints.length - 1)        
        this.calcWaypoints()
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
          // interactive: false,
          zoom: 9.5
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
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          stopover: true,
          value: place.formatted_address
        }
        if (index === 0) {
          t.data.from = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            formatted_address: place.formatted_address
          }
        }
        if (index === t.data.waypoints.length - 1) {
          t.data.to = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            formatted_address: place.formatted_address
          }
        }
        t.calculateAndDisplayRoute()
      })
    },
    calcWaypoints () {
      let waypoints = this.data.waypoints.filter(e => e.location)
      this.data.waypoints.map((e, i) => {
        let disabled = false
        if(i > waypoints.length) {
          disabled = true
        }
        this.data.waypoints[i].disabled = disabled
      })

      setTimeout(() => {
        let w = waypoints.length - 1
        if (w < 0) {
          w = 0
        }
        let e = document.getElementById(`waypoint_${w}`)
        if (e && !e.value) {
          document.getElementById(`waypoint_${w}`).focus()
        }
      }, 100)
    },
    calculateAndDisplayRoute() {
      let t = this
      let waypoints = this.data.waypoints.filter(e => e.location)

      /* inputs disable state*/

      this.calcWaypoints()

      if (!waypoints.length) {
        return
      }

      if (waypoints.length === 1) {
        t.createWaypointsMarkers()
        this.map.flyTo({
          center: [waypoints[0].location.lng, waypoints[0].location.lat],
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
                lat: e.location.lat,
                lng: e.location.lng
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
              t.data.legs = []
              t.data.coordinates = []
              for (var i = 0; i < route.legs.length; i++) {
                const leg = route.legs[i]
                for (var j = 0; j < leg.steps.length; j++) {
                  const step = leg.steps[j]
                  if (!t.data.legs[i]) {
                    t.data.legs[i] = []
                  }
                  t.data.legs[i].push([step.start_location.lng(),step.start_location.lat()])
                  t.data.legs[i].push([step.end_location.lng(),step.end_location.lat()])
                  t.data.coordinates.push([step.start_location.lng(),step.start_location.lat()])
                  t.data.coordinates.push([step.end_location.lng(),step.end_location.lat()])
                }
              }
              t.computeTotalDistance(route)  
              t.drawRoute()
              t.createWaypointsMarkers()
              localStorage.setItem('ruta', JSON.stringify(t.data))
              t.$root.snackbar('success','📍 Distancia: ' + t.data.distance.text)
            } else {
              t.$root.snackbar('error','📍 No se pudo obtener datos de la ruta')
            }
            t.$root.loading = false
          } else {
            t.$root.snackbar('error','📍 No se pudo obtener datos de la ruta ' + status)
          }
        })
      } else {
        this.createWaypointsMarkers()
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
          clearInterval(this.mapInterval)
          t.data = t.defaultData
          t.data.waypoints = t.defaultWaypoints
          t.checkSavedData()
        } else {
          console.log('Clicked on cancel')
        }
      })
    },
    computeTotalDistance(route) {
      var totalDist = 0
      var totalTime = 0
      for (var i = 0; i < route.legs.length; i++) {
        totalDist+= route.legs[i].distance.value
        totalTime+= route.legs[i].duration.value
      }
      totalDist = totalDist / 1000
      let duration = (totalTime / 60).toFixed(2)
      this.data.distance = {
        text: totalDist + 'km',
        value: totalDist
      }
      this.data.duration = {
        text: duration + 'min',
        value: duration
      }
    },
    checkSavedData: function(){
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
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            stopover: true
          }
          t.getAddressFromLatLng()
          t.initMap().then(() => {
            t.map.on('load', () => {
              t.createWaypointsMarkers()
              t.map.flyTo({
                center: [waypoints[0].location.lng, waypoints[0].location.lat],
                zoom: 16
              })
            })
          })
        }, function() {
          t.$root.snackbar('default','Por favor habilite el permiso para ubicación')
          t.initMap()
        })    
      }
    },
    drawRoute: function() {
      let t = this
      if (this.mapInterval) {
        clearInterval(this.mapInterval)
      }
      this.data.legs.map((e, i) => {
        var mapLayer = this.map.getLayer(`leg_${i}`);
        var linecolor = '#b5b5b5'

        if(typeof mapLayer !== 'undefined') {
          this.map.removeLayer(`leg_${i}`).removeSource(`leg_${i}`)
        }

        if (this.data.legs.length === 1) {
          linecolor = '#3d9970'          
        }

        if (i > 0) {
          if (i < this.data.legs.length - 1) {
            linecolor = '#b5b5b5'
          } else {
            linecolor = '#3d9970'
          }
        }

        this.map.addLayer({
          "id": `leg_${i}`,
          "type": "line",
          "source": {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "LineString",
                "coordinates": t.data.legs[i]
              }
            }
          },
          "layout": {
          },
          "paint": {
            "line-color": linecolor,
            "line-width": 8,
            "line-dasharray": [0, 4, 3]
          }
        })
        t.enableLineAnimation(`leg_${i}`)
      })

      var bounds = this.data.coordinates.reduce(function(bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(this.data.coordinates[0], this.data.coordinates[0]));

      this.map.fitBounds(bounds,{
        padding:100, 
        offset:[0,-50]
      })   
    },
    enableLineAnimation(layerId) {
      var step = 0
      var animationStep = 250
      let dashArraySeq = [
        [0, 4, 3],
        [1, 4, 2],
        [2, 4, 1],
        [3, 4, 0],
        [0, 1, 3, 3],
        [0, 2, 3, 2],
        [0, 3, 3, 1]
      ]
      this.mapInterval = setInterval(() => {
        step = (step + 1) % dashArraySeq.length
        var mapLayer = this.map.getLayer(layerId)
        if(typeof mapLayer !== 'undefined') {
          this.map.setPaintProperty(layerId, 'line-dasharray', dashArraySeq[step])
        }
      }, animationStep)
    },
    getAddressFromLatLng: function () {
      let t = this
      var latlng = new google.maps.LatLng(t.data.waypoints[0].location.lat, t.data.waypoints[0].location.lng)
      var geocoder = new google.maps.Geocoder()
      geocoder.geocode({
        'latLng': latlng
      }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            t.data.waypoints[0].value = results[0].formatted_address
            t.inputKey++
            t.calcWaypoints()
            t.$nextTick(() => {
              t.data.waypoints.map((e, i) => {
                t.initAutocomplete(i)
              })
            })
            t.$root.snackbar('success','📍 ' + t.data.waypoints[0].value)
          } else {
            t.$root.snackbar('default','El Geocoder falló')
          }
        } else {
          t.$root.snackbar('error','El Geocoder falló: ' + status)
        }
      })
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
        t.map.loadImage(`/static/img/${icon}.png`, function(error, image) {
          if (error) throw error
          if(typeof mapLayer !== 'undefined') {
            t.map.removeImage(`w_${i}`)
            t.map.removeLayer(`w_${i}`).removeSource(`w_${i}`)
          }
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
      inputKey: 0,
      blurState: 0,
      map: null,
      mapInterval: 0,
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
          location:  {
            lat: -34.603767,
            lng: -58.381619
          },
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
      defaultData: {
        distance: {},
        duration: {},
        from: {},
        to: {},
        legs: [],
        waypoints: [],
        coordinates: []
      },
      data: {
        distance: {},
        duration: {},
        from: {},
        to: {},
        legs: [],
        waypoints: [],
        coordinates: []
      }
    }
  }
}
</script>