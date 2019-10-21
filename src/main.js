import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog';
import App from './App.vue'
import store from 'store'
import router from './router'
import axios from 'axios'
import snackbar from './components/Snackbar';
//import VueSocketIO from 'vue-socket.io' 

require('../assets/css/main.scss')

Vue.use(VuejsDialog);

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
      document.querySelector('.tosprompt').classList.remove('slidIn')
      document.querySelector('.tosprompt').classList.add('fadeOut')      
      setTimeout(() => {
        document.querySelector('.tosprompt').style.display = 'none';
      },1000)
    }
  }, 
  data: {
    ver: '1.0.1'
    endpoint:'https://fletsapi.herokuapp.com',
    loading:true,
    message:'',
    typeMessage:''
  },
  render: h => h(App)
})