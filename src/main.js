import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog';
//import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components
import App from './App.vue'
import store from 'store'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios'
import snackbar from './components/Snackbar';
const endpoint='https://fletsapi.herokuapp.com'
//const endpoint='https://fletsapidev.herokuapp.com'
//const endpoint='http://localhost:4000'
 
// include the default style
//import 'vuejs-dialog/dist/vuejs-dialog.min.css';
 
Vue.use(VuejsDialog);
//Vue.use(VuejsDialog.main.default);
require('../assets/css/main.scss')

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

    if(localStorage.getItem('nowflet')){
      this.player = localStorage.getItem('nowflet')
    }

    this.loading = false
  },
  data:{
    port:0,
    endpoint:endpoint,
  	loading:true,
  	processing:false,
    verification:false,
    nowflet:{},
  	message:'',
  	typeMessage:''
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
  render: h => h(App)
})