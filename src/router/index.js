import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../components/Landing'
import Register from '../components/Register'
import Login from '../components/Login'
import Flet from '../components/Flet'
import Confirma from '../components/Confirma'
import Ruta from '../components/Ruta'
import Carga from '../components/Carga'
import Pago from '../components/Pago'
import Contact from '../components/Contact'
import About from '../components/About'
import NotFound from '../components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/ruta',
      name: 'ruta',
      component: Ruta
    },    
    {
      path: '/carga',
      name: 'carga',
      component: Carga
    },
    {
      path: '/confirma',
      name: 'confirma',
      component: Confirma
    },
    {
      path: '/pago',
      name: 'pago',
      component: Pago
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/flet/:flet',
      name: 'flet',
      component: Flet
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]  
});

document.addEventListener('DOMContentLoaded', () => {
  var tosAgree = function(target){
    localStorage.setItem("tosagree",true)
    document.querySelector('.tosprompt').classList.remove('slideIn')
    document.querySelector('.tosprompt').classList.add('fadeOut')      
    setTimeout(() => {
      document.querySelector('.tosprompt').style.display = 'none';
    },1000)
  }

  document.querySelectorAll(".menu-burger, .menu-items").forEach(function(item) {
    item.addEventListener("click", function() {
      if(document.querySelector('.menu').classList.contains('fs')){
        document.querySelector('.menu').classList.remove('fs')
        document.querySelector('.menu').classList.remove('fs')
        document.querySelector('.menu-burger').classList.remove('cross')
      } else {
        document.querySelector('.menu').classList.add('fs')
        document.querySelector('.menu-burger').classList.add('cross')
      }
    },false)
  })

  document.querySelectorAll('.hidden-loading').forEach((item) => {
    item.classList.remove('hidden-loading')
  })

  if(!localStorage.getItem("tosagree")){
    document.querySelector('.tosprompt').classList.add('slideIn')
  } else {
    document.querySelector('.tosprompt').style.display = 'none';
  }
})

/*
window.onerror = function(msg, url, line, col, error) {
   // Note that col & error are new to the HTML 5 spec and may not be 
   // supported in every browser.  It worked for me in Chrome.
   var extra = !col ? '' : '\ncolumn: ' + col
   extra += !error ? '' : '\nerror: ' + error

   // You can view the information in an alert to see things working like this:
   //alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra)
   console.log("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra)

   // TODO: Report this error via ajax so you can keep track
   //       of what pages have JS issues

   var suppressErrorAlert = true
   // If you return true, then error alerts (like in older versions of 
   // Internet Explorer) will be suppressed.
   return suppressErrorAlert
}
*/

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  next()
})

router.afterEach(function (to, from, next) {
})

export default router