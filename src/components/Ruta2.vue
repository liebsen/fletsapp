<template>
  <div>
    <div class="form" id="form">
      <div class="input-data">
        <div class="columns is-vcentered">
          <div v-for="(item, index) in waypoints" class="column" :key="index">
            <div class="field">
              <!--label class="label has-text-info">Origen</label-->
              <div class="control">
                <input :id="`waypoint_${index}`" 
                  :placeholder="item.placeholder" 
                  class="input is-rounded" 
                  :class="{ 'is-info': index < waypoints.length, 'is-success': index === waypoints.length - 1 }" 
                  onfocus="value = ''" 
                  type="text" 
                  :value="item.value" />
              </div>
            </div>
          </div>
          <div class="column is-1">
            <a @click="addSegment(1)" class="button is-rounded is-success is-outlined">
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
  mounted: function(){
    var t = this
    t.$root.loading = true
    t.checkSavedData()
    this.$root.snackbar('default','Por favor selecciona el <span class="has-text-info">origen</span> y <span class="has-text-success">destino</span> para tu <em>flet</em>')
  },
  methods: {
    initMap () {
      this.directionsService = new google.maps.DirectionsService;
      this.directionsRenderer = new google.maps.DirectionsRenderer;
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZnJlZSIsImEiOiJ5ZFd0U19vIn0.Z7WBxuf0QKPrdzv2o6Mx6A';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-58.381619, -34.603767],
        interactive: false,
        zoom: 14
      });
      this.map = map  


      /*var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        style: 'mapbox://styles/mapbox/streets-v11',
        disableDefaultUI: true,
        center: {lat: this.data.from.lat, lng: this.data.from.lng}
      });
      this.directionsRenderer.setMap(map);
      document.getElementById('submit').addEventListener('click', function() {
        calculateAndDisplayRoute()
      });*/
      this.$root.loading = false
    },
    calculateAndDisplayRoute() {
      // console.log(document.getElementById('waypoint_' + this.waypoints.length - 1))
      if (!this.waypoints.length) {
        return
      }
      this.createOrigMarker()

      if (this.waypoints.length > 1) {
        let waypoints = null

        if (this.waypoints.length > 2) {
          waypoints = this.waypoints.filter((e, i) => { return i > 0 && i < this.waypoints.length -1 })
        }

        this.directionsService.route({
          origin: document.getElementById('waypoint_0').value,
          destination: document.getElementById('waypoint_' + parseInt(this.waypoints.length - 1)).value,
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response);
            var route = response.routes[0];
            // var summaryPanel = document.getElementById('directions-panel');

            if(route){
              console.log(route.legs)
              // this.data.distance = route.legs[0].distance
              // this.data.duration = route.legs[0].duration
              this.data.legs = route.legs
              /*
              route.legs.steps.forEach((leg, i) => {
                if (!this.data.legs[i]) {
                  this.data.legs[i] = {
                    data: leg
                  }
                }

                leg.forEach((step, j) => {
                  this.data.legs[i].push([step.start_location.lng,step.start_location.lat])
                  this.data.legs[i].push([step.end_location.lng,step.end_location.lat])
                }
              })*/

              this.drawRoute()
              // this.createOrigMarker()
              // this.createDestMarker()
              localStorage.setItem('ruta', JSON.stringify(this.data))
              //t.$root.snackbar('success','📍 Distancia: ' + t.data.distance.text)
            } else {
              this.$root.snackbar('error','📍 No se pudo obtener datos de la ruta')
            }
            this.$root.loading = false

            // summaryPanel.innerHTML = '';


            // For each route, display summary information.

response.routes[0].legs[0].steps.forEach((step) => {
                t.data.coordinates.push([step.start_location.lng(),step.start_location.lat()])
                t.data.coordinates.push([step.end_location.lng(),step.end_location.lat()])
              })


            /* 
            for (var i = 0; i < route.legs.length; i++) {
              var routeSegment = i + 1;
              summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                  '</b><br>';
              summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
              summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
              summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
            } */
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        })
      }
    },
    addSegment () {

      // this.segments.push([])
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
          t.data = {
            distance:{},
            duration:{},
            coordinates:[],
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
          t.checkSavedData()
        })
        .catch(function() {
          console.log('Clicked on cancel');
        });
    },
    checkSavedData:function(){
      var t = this
      const saved = localStorage.getItem('ruta')


      /*

        new google.maps.LatLng(-35.145066, -57.904224),
        new google.maps.LatLng(-34.305329, -59.337308)      
      */

      /* autocomplete origin */
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
          var place = autocomplete.getPlace();
          let ac = place.address_components;
          let city = ac[0]["short_name"];
          t.waypoints[i] = {
            location: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
            stopover: true
          }

          t.calculateAndDisplayRoute()
        });
        /*
        t.autocompletes[i].addListener('place_changed', () => {
          let place = t.autocompletes[i].getPlace();
          let ac = place.address_components;
          let city = ac[0]["short_name"];
          console.log('--------')
          console.log(i)
          t.data.waypoints[i] = {
            location: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
            stopover: true
          }

          t.calculateRoute()
        }); */
      })



      /* autocomplete destination */
        
        /*      
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
      */


      if(saved){
        t.data = JSON.parse(saved)
        t.startMap()
      } else {
        if (!navigator.geolocation){
          this.$root.snackbar('default','No se pudo obtener ubicación')
          t.startMap()
        }
        navigator.geolocation.getCurrentPosition(function(position){
          t.waypoints[0] = {
            location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            stopover: true
          }
          t.getAddressFromLatLng()
          t.startMap()
        }, function() {
          t.$root.snackbar('default','Por favor habilite el permiso para ubicación')
          t.startMap()
        })    
      }
    },
    startMap: function(){
      this.initMap()
      /*
      //t.setMapHeight()
      let t = this
      this.initMap(() => {
        this.map.on('load', function() {
          if(t.data.to.lat && t.data.to.lng){
            t.createRoute()
            t.createOrigMarker()
            t.createDestMarker()
          } else {
            t.createOrigMarker()
          }
          document.querySelector('.form').classList.add('fadeIn')
          t.$root.loading = false
        })    
      })*/
    },
    calculateRoute:function(){
      if(this.data.from.lat && t.data.to.lat){
        this.$root.loading = true
        axios.post('/flet/directions', { 
          from: this.data.from, 
          to: this.data.to
        }).then((res) => {
          if(res.data.routes.length){
            this.data.distance = res.data.routes[0].legs[0].distance
            this.data.duration = res.data.routes[0].legs[0].duration
            this.data.coordinates = []
            res.data.routes[0].legs[0].steps.forEach((step) => {
              this.data.coordinates.push([step.start_location.lng,step.start_location.lat])
              this.data.coordinates.push([step.end_location.lng,step.end_location.lat])
            })
            this.createRoute()
            this.createOrigMarker()
            this.createDestMarker()
            localStorage.setItem('ruta',JSON.stringify(this.data))
            //t.$root.snackbar('success','📍 Distancia: ' + t.data.distance.text)
          } else {
            this.$root.snackbar('error','📍 No se pudo obtener datos de la ruta')
          }
          this.$root.loading = false
        })
      } else {
        this.createOrigMarker()
        this.map.flyTo({center:[this.data.from.lng, this.data.from.lat]});
      }
    },
    drawRoute: function(){
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
            this.data.from.formatted_address = results[1].formatted_address
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
      console.log(.waypoints[0].lng())
      var mapLayer = this.map.getLayer('w_0');
      let t = this
      
      if(typeof mapLayer !== 'undefined') {
        this.map.removeImage('w_0')
        this.map.removeLayer('w_0').removeSource('w_0')
      }

      this.map.loadImage('/static/img/orig.png', function(error, image) {
        if (error) throw error;
        t.map.addImage('w_0', image);
        t.map.addLayer({
          "id": "w_0",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [t.waypoints[0].lng(), t.waypoints[0].lat()]
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
    createDestMarker : function(){
      //var bounds = new google.maps.LatLngBounds();
      let t = this
      var orig = new mapboxgl.LngLat(this.data.from.lng, this.data.from.lat)
      var dest = new mapboxgl.LngLat(this.data.to.lng, this.data.to.lat)
      //var llb = new mapboxgl.LngLatBounds(orig, dest);
      //this.map.fitBounds(llb,{padding:100, offset:[0,-30]});
      var mapLayer = this.map.getLayer('dest');

      if(typeof mapLayer !== 'undefined') {
        this.map.removeImage('dest')
        this.map.removeLayer('dest').removeSource('dest')     
      }

      this.map.loadImage('/static/img/dest.png', function(error, image) {
        if (error) throw error
        t.map.addImage('dest', image)
        t.map.addLayer({
          "id": "dest",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                'properties': {
                  'description': 'The Gaslight',
                  'icon': 'theatre'
                },
                "geometry": {
                  "type": "Point",
                  "coordinates": [t.data.to.lng, t.data.to.lat]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "dest",
            "icon-size": 0.35
          }
        });
      });
    },
    setMapHeight: function(){
      this.mapHeight = window.innerHeight - (document.getElementById('form').clientHeight + document.getElementById('form').offsetTop)
    },
    initMap2 : function(callback){
      var t = this
      setTimeout(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFydGluZnJlZSIsImEiOiJ5ZFd0U19vIn0.Z7WBxuf0QKPrdzv2o6Mx6A';
        var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [t.data.from.lng, t.data.from.lat],
          interactive: false,
          zoom:14
        });
        t.map = map  
        callback(this) 
      },500)
    }
  },
  data () {
    return {
      mapHeight: 0,
      directionsService: null,
      directionsRenderer: null,
      autocompletes: [],
      waypoints: [
        {
          placeholder: 'Dirección de recepción',
          location: new google.maps.LatLng(-34.603767, -58.381619),
          stopover: true,
          value: ''
        },
        {
          placeholder: 'Dirección de entrega',
          stopover: false,
          value: ''
        }
      ],
      defaultBounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(-35.564406, -60.292954),
        new google.maps.LatLng(-34.362287, -58.142812)
      ),
      data: {
        distance: {},
        duration: {},
        coordinates: [],
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