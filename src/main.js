import Vue from 'vue'
import App from './App.vue'
import store from 'store'
import router from './router'
import axios from 'axios'
import snackbar from './components/Snackbar';
//import VueSocketIO from 'vue-socket.io' 
import '../assets/js/fontawesome_all.js'

require('../assets/css/main.scss')

axios.defaults.baseURL = process.env.EP

/*
Vue.use(new VueSocketIO({
    debug: true,
    connection: endpoint,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
    //, options: { path: "/my-app/" } 
}))
*/

new Vue({
  el: '#app',
  router,
  watch: {
    '$route' (to, from) {
      this.loading = false  
    }
  },
  created: function() {
    this.loading = false
  },
  methods: {
    snackbar : function(messageType,message,timeout){
      if(timeout===undefined) timeout = 5000
      this.messageType = messageType
      this.message = message
      document.querySelector('.ui-snackbar').classList.remove('ui-snackbar--is-inactive')
      document.querySelector('.ui-snackbar').classList.remove('ui-snackbar--success')
      document.querySelector('.ui-snackbar').classList.remove('ui-snackbar--error')
      document.querySelector('.ui-snackbar').classList.remove('ui-snackbar--default')
      document.querySelector('.ui-snackbar').classList.add('ui-snackbar--' + messageType)
      document.querySelector('.ui-snackbar').classList.add('ui-snackbar--is-active')
      setTimeout(() => {
        document.querySelector('.ui-snackbar').classList.remove('ui-snackbar--is-active')
        document.querySelector('.ui-snackbar').classList.add('ui-snackbar--is-inactive')
      },timeout)
    },
    tosAgree: function(){
      localStorage.setItem("tosagree",true)
      document.querySelector('.tosprompt').classList.remove('fadeIn')
      document.querySelector('.tosprompt').classList.add('fadeOut')      
      setTimeout(() => {
        document.querySelector('.tosprompt').parentNode.removeChild(document.querySelector('.tosprompt'))
      },3000)
    }
  }, 
  data: {
    ver: '1.0.1',
    endpoint: process.env.EP,
    loading: true,
    message: '',
    typeMessage: ''
  },
  render: h => h(App)
})