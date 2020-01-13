import Vue from 'vue'
import Router from 'vue-router'
import Landing from '../components/Landing'
import Register from '../components/Register'
import Login from '../components/Login'
import Flet from '../components/Flet'
import Confirma from '../components/Confirma'
import Cotizacion from '../components/Cotizacion'
import Terminos from '../components/Terminos'
import Datos from '../components/Datos'
import Ruta from '../components/Ruta'
import Carga from '../components/Carga'
import Pago from '../components/Pago'
import Contacto from '../components/Contacto'
import Privacidad from '../components/Privacidad'
import About from '../components/About'
import PagoCompletado from '../components/PagoCompletado'
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
      path: '/datos',
      name: 'datos',
      component: Datos
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
      path: '/pago-completado/:status?',
      name: 'pago_completado',
      component: PagoCompletado
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
      path: '/cotizacion',
      name: 'cotizacion',
      component: Cotizacion
    },    
    {
      path: '/terminos',
      name: 'terminos',
      component: Terminos
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: Contacto
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/privacidad',
      name: 'privacidad',
      component: Privacidad
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ]  
});

document.addEventListener('DOMContentLoaded', () => {
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
    setTimeout(() => {
      document.querySelector('.tosprompt').classList.add('fadeIn')
    },1000)
  } else {
    document.querySelector('.tosprompt').parentNode.removeChild(document.querySelector('.tosprompt'))
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
  setTimeout(() => {
    var list = ['ruta','carga','datos','confirma','pago']
    var elem = document.querySelector('.steps-frame')
    var stop = false

    if(list.includes(to.name)){
      if(!elem.classList.contains('show')){
        elem.classList.remove('hidden')
        elem.classList.add('show')
      }

      list.forEach((step,i) => {
        var node = document.querySelectorAll('.steps-segment')[i] 
        if(!node) return
        if(step === to.name){
          node.classList.add('is-active')
          node.classList.add('has-gaps')
          stop = true
        } else {
          node.classList.remove('is-active')
          node.classList.remove('has-gaps')
        }
        if(stop) {
          node.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault()
            return false
          })
        } else {
          node.querySelector('a').addEventListener('click', () => {
            return router.push(step)
          })
        }
      })
    } else {
      if(!elem.classList.contains('hidden')){
        elem.classList.add('hidden')
        elem.classList.remove('show')
      }
    }
  },250)
})

export default router