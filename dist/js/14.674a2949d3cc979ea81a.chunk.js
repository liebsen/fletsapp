(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{jE9Z:function(t,e,r){"use strict";
/*!
  * vue-router v3.3.4
  * (c) 2020 Evan You
  * @license MIT
  */function n(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function o(t,e){return n(t)&&t._isRouter&&(null==e||t.type===e)}function i(t,e){for(var r in e)t[r]=e[r];return t}var a={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(t,e){var r=e.props,n=e.children,o=e.parent,a=e.data;a.routerView=!0;for(var s=o.$createElement,c=r.name,p=o.$route,f=o._routerViewCache||(o._routerViewCache={}),h=0,l=!1;o&&o._routerRoot!==o;){var d=o.$vnode?o.$vnode.data:{};d.routerView&&h++,d.keepAlive&&o._directInactive&&o._inactive&&(l=!0),o=o.$parent}if(a.routerViewDepth=h,l){var v=f[c],y=v&&v.component;return y?(v.configProps&&u(y,a,v.route,v.configProps),s(y,a,n)):s()}var m=p.matched[h],g=m&&m.components[c];if(!m||!g)return f[c]=null,s();f[c]={component:g},a.registerRouteInstance=function(t,e){var r=m.instances[c];(e&&r!==t||!e&&r===t)&&(m.instances[c]=e)},(a.hook||(a.hook={})).prepatch=function(t,e){m.instances[c]=e.componentInstance},a.hook.init=function(t){t.data.keepAlive&&t.componentInstance&&t.componentInstance!==m.instances[c]&&(m.instances[c]=t.componentInstance)};var w=m.props&&m.props[c];return w&&(i(f[c],{route:p,configProps:w}),u(g,a,p,w)),s(g,a,n)}};function u(t,e,r,n){var o=e.props=function(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0;default:0}}(r,n);if(o){o=e.props=i({},o);var a=e.attrs=e.attrs||{};for(var u in o)t.props&&u in t.props||(a[u]=o[u],delete o[u])}}var s=/[!'()*]/g,c=function(t){return"%"+t.charCodeAt(0).toString(16)},p=/%2C/g,f=function(t){return encodeURIComponent(t).replace(s,c).replace(p,",")},h=decodeURIComponent;function l(t){var e={};return(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach(function(t){var r=t.replace(/\+/g," ").split("="),n=h(r.shift()),o=r.length>0?h(r.join("=")):null;void 0===e[n]?e[n]=o:Array.isArray(e[n])?e[n].push(o):e[n]=[e[n],o]}),e):e}function d(t){var e=t?Object.keys(t).map(function(e){var r=t[e];if(void 0===r)return"";if(null===r)return f(e);if(Array.isArray(r)){var n=[];return r.forEach(function(t){void 0!==t&&(null===t?n.push(f(e)):n.push(f(e)+"="+f(t)))}),n.join("&")}return f(e)+"="+f(r)}).filter(function(t){return t.length>0}).join("&"):null;return e?"?"+e:""}var v=/\/?$/;function y(t,e,r,n){var o=n&&n.options.stringifyQuery,i=e.query||{};try{i=m(i)}catch(t){}var a={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:i,params:e.params||{},fullPath:w(e,o),matched:t?function(t){var e=[];for(;t;)e.unshift(t),t=t.parent;return e}(t):[]};return r&&(a.redirectedFrom=w(r,o)),Object.freeze(a)}function m(t){if(Array.isArray(t))return t.map(m);if(t&&"object"==typeof t){var e={};for(var r in t)e[r]=m(t[r]);return e}return t}var g=y(null,{path:"/"});function w(t,e){var r=t.path,n=t.query;void 0===n&&(n={});var o=t.hash;return void 0===o&&(o=""),(r||"/")+(e||d)(n)+o}function b(t,e){return e===g?t===e:!!e&&(t.path&&e.path?t.path.replace(v,"")===e.path.replace(v,"")&&t.hash===e.hash&&x(t.query,e.query):!(!t.name||!e.name)&&(t.name===e.name&&t.hash===e.hash&&x(t.query,e.query)&&x(t.params,e.params)))}function x(t,e){if(void 0===t&&(t={}),void 0===e&&(e={}),!t||!e)return t===e;var r=Object.keys(t),n=Object.keys(e);return r.length===n.length&&r.every(function(r){var n=t[r],o=e[r];return"object"==typeof n&&"object"==typeof o?x(n,o):String(n)===String(o)})}function k(t,e,r){var n=t.charAt(0);if("/"===n)return t;if("?"===n||"#"===n)return e+t;var o=e.split("/");r&&o[o.length-1]||o.pop();for(var i=t.replace(/^\//,"").split("/"),a=0;a<i.length;a++){var u=i[a];".."===u?o.pop():"."!==u&&o.push(u)}return""!==o[0]&&o.unshift(""),o.join("/")}function R(t){return t.replace(/\/\//g,"/")}var E=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},O=B,A=L,C=function(t,e){return T(L(t,e),e)},_=T,j=V,S=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function L(t,e){for(var r,n=[],o=0,i=0,a="",u=e&&e.delimiter||"/";null!=(r=S.exec(t));){var s=r[0],c=r[1],p=r.index;if(a+=t.slice(i,p),i=p+s.length,c)a+=c[1];else{var f=t[i],h=r[2],l=r[3],d=r[4],v=r[5],y=r[6],m=r[7];a&&(n.push(a),a="");var g=null!=h&&null!=f&&f!==h,w="+"===y||"*"===y,b="?"===y||"*"===y,x=r[2]||u,k=d||v;n.push({name:l||o++,prefix:h||"",delimiter:x,optional:b,repeat:w,partial:g,asterisk:!!m,pattern:k?U(k):m?".*":"[^"+q(x)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&n.push(a),n}function $(t){return encodeURI(t).replace(/[\/?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function P(t){return encodeURI(t).replace(/[?#]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function T(t,e){for(var r=new Array(t.length),n=0;n<t.length;n++)"object"==typeof t[n]&&(r[n]=new RegExp("^(?:"+t[n].pattern+")$",M(e)));return function(e,n){for(var o="",i=e||{},a=(n||{}).pretty?$:encodeURIComponent,u=0;u<t.length;u++){var s=t[u];if("string"!=typeof s){var c,p=i[s.name];if(null==p){if(s.optional){s.partial&&(o+=s.prefix);continue}throw new TypeError('Expected "'+s.name+'" to be defined')}if(E(p)){if(!s.repeat)throw new TypeError('Expected "'+s.name+'" to not repeat, but received `'+JSON.stringify(p)+"`");if(0===p.length){if(s.optional)continue;throw new TypeError('Expected "'+s.name+'" to not be empty')}for(var f=0;f<p.length;f++){if(c=a(p[f]),!r[u].test(c))throw new TypeError('Expected all "'+s.name+'" to match "'+s.pattern+'", but received `'+JSON.stringify(c)+"`");o+=(0===f?s.prefix:s.delimiter)+c}}else{if(c=s.asterisk?P(p):a(p),!r[u].test(c))throw new TypeError('Expected "'+s.name+'" to match "'+s.pattern+'", but received "'+c+'"');o+=s.prefix+c}}else o+=s}return o}}function q(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function U(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function I(t,e){return t.keys=e,t}function M(t){return t&&t.sensitive?"":"i"}function V(t,e,r){E(e)||(r=e||r,e=[]);for(var n=(r=r||{}).strict,o=!1!==r.end,i="",a=0;a<t.length;a++){var u=t[a];if("string"==typeof u)i+=q(u);else{var s=q(u.prefix),c="(?:"+u.pattern+")";e.push(u),u.repeat&&(c+="(?:"+s+c+")*"),i+=c=u.optional?u.partial?s+"("+c+")?":"(?:"+s+"("+c+"))?":s+"("+c+")"}}var p=q(r.delimiter||"/"),f=i.slice(-p.length)===p;return n||(i=(f?i.slice(0,-p.length):i)+"(?:"+p+"(?=$))?"),i+=o?"$":n&&f?"":"(?="+p+"|$)",I(new RegExp("^"+i,M(r)),e)}function B(t,e,r){return E(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?function(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return I(t,e)}(t,e):E(t)?function(t,e,r){for(var n=[],o=0;o<t.length;o++)n.push(B(t[o],e,r).source);return I(new RegExp("(?:"+n.join("|")+")",M(r)),e)}(t,e,r):function(t,e,r){return V(L(t,r),e,r)}(t,e,r)}O.parse=A,O.compile=C,O.tokensToFunction=_,O.tokensToRegExp=j;var H=Object.create(null);function z(t,e,r){e=e||{};try{var n=H[t]||(H[t]=O.compile(t));return"string"==typeof e.pathMatch&&(e[0]=e.pathMatch),n(e,{pretty:!0})}catch(t){return""}finally{delete e[0]}}function F(t,e,r,n){var o="string"==typeof t?{path:t}:t;if(o._normalized)return o;if(o.name){var a=(o=i({},t)).params;return a&&"object"==typeof a&&(o.params=i({},a)),o}if(!o.path&&o.params&&e){(o=i({},o))._normalized=!0;var u=i(i({},e.params),o.params);if(e.name)o.name=e.name,o.params=u;else if(e.matched.length){var s=e.matched[e.matched.length-1].path;o.path=z(s,u,e.path)}else 0;return o}var c=function(t){var e="",r="",n=t.indexOf("#");n>=0&&(e=t.slice(n),t=t.slice(0,n));var o=t.indexOf("?");return o>=0&&(r=t.slice(o+1),t=t.slice(0,o)),{path:t,query:r,hash:e}}(o.path||""),p=e&&e.path||"/",f=c.path?k(c.path,p,r||o.append):p,h=function(t,e,r){void 0===e&&(e={});var n,o=r||l;try{n=o(t||"")}catch(t){n={}}for(var i in e)n[i]=e[i];return n}(c.query,o.query,n&&n.options.parseQuery),d=o.hash||c.hash;return d&&"#"!==d.charAt(0)&&(d="#"+d),{_normalized:!0,path:f,query:h,hash:d}}var N,D=[String,Object],J=[String,Array],K=function(){},Q={name:"RouterLink",props:{to:{type:D,required:!0},tag:{type:String,default:"a"},exact:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,ariaCurrentValue:{type:String,default:"page"},event:{type:J,default:"click"}},render:function(t){var e=this,r=this.$router,n=this.$route,o=r.resolve(this.to,n,this.append),a=o.location,u=o.route,s=o.href,c={},p=r.options.linkActiveClass,f=r.options.linkExactActiveClass,h=null==p?"router-link-active":p,l=null==f?"router-link-exact-active":f,d=null==this.activeClass?h:this.activeClass,m=null==this.exactActiveClass?l:this.exactActiveClass,g=u.redirectedFrom?y(null,F(u.redirectedFrom),null,r):u;c[m]=b(n,g),c[d]=this.exact?c[m]:function(t,e){return 0===t.path.replace(v,"/").indexOf(e.path.replace(v,"/"))&&(!e.hash||t.hash===e.hash)&&function(t,e){for(var r in e)if(!(r in t))return!1;return!0}(t.query,e.query)}(n,g);var w=c[m]?this.ariaCurrentValue:null,x=function(t){X(t)&&(e.replace?r.replace(a,K):r.push(a,K))},k={click:X};Array.isArray(this.event)?this.event.forEach(function(t){k[t]=x}):k[this.event]=x;var R={class:c},E=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:s,route:u,navigate:x,isActive:c[d],isExactActive:c[m]});if(E){if(1===E.length)return E[0];if(E.length>1||!E.length)return 0===E.length?t():t("span",{},E)}if("a"===this.tag)R.on=k,R.attrs={href:s,"aria-current":w};else{var O=function t(e){if(e)for(var r,n=0;n<e.length;n++){if("a"===(r=e[n]).tag)return r;if(r.children&&(r=t(r.children)))return r}}(this.$slots.default);if(O){O.isStatic=!1;var A=O.data=i({},O.data);for(var C in A.on=A.on||{},A.on){var _=A.on[C];C in k&&(A.on[C]=Array.isArray(_)?_:[_])}for(var j in k)j in A.on?A.on[j].push(k[j]):A.on[j]=x;var S=O.data.attrs=i({},O.data.attrs);S.href=s,S["aria-current"]=w}else R.on=k}return t(this.tag,R,this.$slots.default)}};function X(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}var Y="undefined"!=typeof window;function W(t,e,r,n){var o=e||[],i=r||Object.create(null),a=n||Object.create(null);t.forEach(function(t){!function t(e,r,n,o,i,a){var u=o.path;var s=o.name;0;var c=o.pathToRegexpOptions||{};var p=function(t,e,r){r||(t=t.replace(/\/$/,""));if("/"===t[0])return t;if(null==e)return t;return R(e.path+"/"+t)}(u,i,c.strict);"boolean"==typeof o.caseSensitive&&(c.sensitive=o.caseSensitive);var f={path:p,regex:function(t,e){var r=O(t,[],e);0;return r}(p,c),components:o.components||{default:o.component},instances:{},name:s,parent:i,matchAs:a,redirect:o.redirect,beforeEnter:o.beforeEnter,meta:o.meta||{},props:null==o.props?{}:o.components?o.props:{default:o.props}};o.children&&o.children.forEach(function(o){var i=a?R(a+"/"+o.path):void 0;t(e,r,n,o,f,i)});r[f.path]||(e.push(f.path),r[f.path]=f);if(void 0!==o.alias)for(var h=Array.isArray(o.alias)?o.alias:[o.alias],l=0;l<h.length;++l){var d=h[l];0;var v={path:d,children:o.children};t(e,r,n,v,i,f.path||"/")}s&&(n[s]||(n[s]=f))}(o,i,a,t)});for(var u=0,s=o.length;u<s;u++)"*"===o[u]&&(o.push(o.splice(u,1)[0]),s--,u--);return{pathList:o,pathMap:i,nameMap:a}}function Z(t,e){var r=W(t),n=r.pathList,o=r.pathMap,i=r.nameMap;function a(t,r,a){var u=F(t,r,!1,e),c=u.name;if(c){var p=i[c];if(!p)return s(null,u);var f=p.regex.keys.filter(function(t){return!t.optional}).map(function(t){return t.name});if("object"!=typeof u.params&&(u.params={}),r&&"object"==typeof r.params)for(var h in r.params)!(h in u.params)&&f.indexOf(h)>-1&&(u.params[h]=r.params[h]);return u.path=z(p.path,u.params),s(p,u,a)}if(u.path){u.params={};for(var l=0;l<n.length;l++){var d=n[l],v=o[d];if(G(v.regex,u.path,u.params))return s(v,u,a)}}return s(null,u)}function u(t,r){var n=t.redirect,o="function"==typeof n?n(y(t,r,null,e)):n;if("string"==typeof o&&(o={path:o}),!o||"object"!=typeof o)return s(null,r);var u=o,c=u.name,p=u.path,f=r.query,h=r.hash,l=r.params;if(f=u.hasOwnProperty("query")?u.query:f,h=u.hasOwnProperty("hash")?u.hash:h,l=u.hasOwnProperty("params")?u.params:l,c){i[c];return a({_normalized:!0,name:c,query:f,hash:h,params:l},void 0,r)}if(p){var d=function(t,e){return k(t,e.parent?e.parent.path:"/",!0)}(p,t);return a({_normalized:!0,path:z(d,l),query:f,hash:h},void 0,r)}return s(null,r)}function s(t,r,n){return t&&t.redirect?u(t,n||r):t&&t.matchAs?function(t,e,r){var n=a({_normalized:!0,path:z(r,e.params)});if(n){var o=n.matched,i=o[o.length-1];return e.params=n.params,s(i,e)}return s(null,e)}(0,r,t.matchAs):y(t,r,n,e)}return{match:a,addRoutes:function(t){W(t,n,o,i)}}}function G(t,e,r){var n=e.match(t);if(!n)return!1;if(!r)return!0;for(var o=1,i=n.length;o<i;++o){var a=t.keys[o-1],u="string"==typeof n[o]?decodeURIComponent(n[o]):n[o];a&&(r[a.name||"pathMatch"]=u)}return!0}var tt=Y&&window.performance&&window.performance.now?window.performance:Date;function et(){return tt.now().toFixed(3)}var rt=et();function nt(){return rt}function ot(t){return rt=t}var it=Object.create(null);function at(){"scrollRestoration"in window.history&&(window.history.scrollRestoration="manual");var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,""),r=i({},window.history.state);return r.key=nt(),window.history.replaceState(r,"",e),window.addEventListener("popstate",ct),function(){window.removeEventListener("popstate",ct)}}function ut(t,e,r,n){if(t.app){var o=t.options.scrollBehavior;o&&t.app.$nextTick(function(){var i=function(){var t=nt();if(t)return it[t]}(),a=o.call(t,e,r,n?i:null);a&&("function"==typeof a.then?a.then(function(t){dt(t,i)}).catch(function(t){0}):dt(a,i))})}}function st(){var t=nt();t&&(it[t]={x:window.pageXOffset,y:window.pageYOffset})}function ct(t){st(),t.state&&t.state.key&&ot(t.state.key)}function pt(t){return ht(t.x)||ht(t.y)}function ft(t){return{x:ht(t.x)?t.x:window.pageXOffset,y:ht(t.y)?t.y:window.pageYOffset}}function ht(t){return"number"==typeof t}var lt=/^#\d/;function dt(t,e){var r="object"==typeof t;if(r&&"string"==typeof t.selector){var n=lt.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(n){var o=t.offset&&"object"==typeof t.offset?t.offset:{};e=function(t,e){var r=document.documentElement.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:n.left-r.left-e.x,y:n.top-r.top-e.y}}(n,o=function(t){return{x:ht(t.x)?t.x:0,y:ht(t.y)?t.y:0}}(o))}else pt(t)&&(e=ft(t))}else r&&pt(t)&&(e=ft(t));e&&window.scrollTo(e.x,e.y)}var vt=Y&&function(){var t=window.navigator.userAgent;return(-1===t.indexOf("Android 2.")&&-1===t.indexOf("Android 4.0")||-1===t.indexOf("Mobile Safari")||-1!==t.indexOf("Chrome")||-1!==t.indexOf("Windows Phone"))&&(window.history&&"function"==typeof window.history.pushState)}();function yt(t,e){st();var r=window.history;try{if(e){var n=i({},r.state);n.key=nt(),r.replaceState(n,"",t)}else r.pushState({key:ot(et())},"",t)}catch(r){window.location[e?"replace":"assign"](t)}}function mt(t){yt(t,!0)}function gt(t,e,r){var n=function(o){o>=t.length?r():t[o]?e(t[o],function(){n(o+1)}):n(o+1)};n(0)}function wt(t){return function(e,r,o){var i=!1,a=0,u=null;bt(t,function(t,e,r,s){if("function"==typeof t&&void 0===t.cid){i=!0,a++;var c,p=Rt(function(e){(function(t){return t.__esModule||kt&&"Module"===t[Symbol.toStringTag]})(e)&&(e=e.default),t.resolved="function"==typeof e?e:N.extend(e),r.components[s]=e,--a<=0&&o()}),f=Rt(function(t){var e="Failed to resolve async component "+s+": "+t;u||(u=n(t)?t:new Error(e),o(u))});try{c=t(p,f)}catch(t){f(t)}if(c)if("function"==typeof c.then)c.then(p,f);else{var h=c.component;h&&"function"==typeof h.then&&h.then(p,f)}}}),i||o()}}function bt(t,e){return xt(t.map(function(t){return Object.keys(t.components).map(function(r){return e(t.components[r],t.instances[r],t,r)})}))}function xt(t){return Array.prototype.concat.apply([],t)}var kt="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;function Rt(t){var e=!1;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(!e)return e=!0,t.apply(this,r)}}var Et={redirected:1,aborted:2,cancelled:3,duplicated:4};function Ot(t,e){return Ct(t,e,Et.redirected,'Redirected when going from "'+t.fullPath+'" to "'+function(t){if("string"==typeof t)return t;if("path"in t)return t.path;var e={};return _t.forEach(function(r){r in t&&(e[r]=t[r])}),JSON.stringify(e,null,2)}(e)+'" via a navigation guard.')}function At(t,e){return Ct(t,e,Et.cancelled,'Navigation cancelled from "'+t.fullPath+'" to "'+e.fullPath+'" with a new navigation.')}function Ct(t,e,r,n){var o=new Error(n);return o._isRouter=!0,o.from=t,o.to=e,o.type=r,o}var _t=["params","query","hash"];var jt=function(t,e){this.router=t,this.base=function(t){if(!t)if(Y){var e=document.querySelector("base");t=(t=e&&e.getAttribute("href")||"/").replace(/^https?:\/\/[^\/]+/,"")}else t="/";"/"!==t.charAt(0)&&(t="/"+t);return t.replace(/\/$/,"")}(e),this.current=g,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[],this.listeners=[]};function St(t,e,r,n){var o=bt(t,function(t,n,o,i){var a=function(t,e){"function"!=typeof t&&(t=N.extend(t));return t.options[e]}(t,e);if(a)return Array.isArray(a)?a.map(function(t){return r(t,n,o,i)}):r(a,n,o,i)});return xt(n?o.reverse():o)}function Lt(t,e){if(e)return function(){return t.apply(e,arguments)}}jt.prototype.listen=function(t){this.cb=t},jt.prototype.onReady=function(t,e){this.ready?t():(this.readyCbs.push(t),e&&this.readyErrorCbs.push(e))},jt.prototype.onError=function(t){this.errorCbs.push(t)},jt.prototype.transitionTo=function(t,e,r){var n=this,i=this.router.match(t,this.current);this.confirmTransition(i,function(){var t=n.current;n.updateRoute(i),e&&e(i),n.ensureURL(),n.router.afterHooks.forEach(function(e){e&&e(i,t)}),n.ready||(n.ready=!0,n.readyCbs.forEach(function(t){t(i)}))},function(t){r&&r(t),t&&!n.ready&&(n.ready=!0,o(t,Et.redirected)?n.readyCbs.forEach(function(t){t(i)}):n.readyErrorCbs.forEach(function(e){e(t)}))})},jt.prototype.confirmTransition=function(t,e,r){var i=this,a=this.current,u=function(t){!o(t)&&n(t)&&(i.errorCbs.length?i.errorCbs.forEach(function(e){e(t)}):console.error(t)),r&&r(t)},s=t.matched.length-1,c=a.matched.length-1;if(b(t,a)&&s===c&&t.matched[s]===a.matched[c])return this.ensureURL(),u(function(t,e){return Ct(t,e,Et.duplicated,'Avoided redundant navigation to current location: "'+t.fullPath+'".')}(a,t));var p=function(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}(this.current.matched,t.matched),f=p.updated,h=p.deactivated,l=p.activated,d=[].concat(function(t){return St(t,"beforeRouteLeave",Lt,!0)}(h),this.router.beforeHooks,function(t){return St(t,"beforeRouteUpdate",Lt)}(f),l.map(function(t){return t.beforeEnter}),wt(l));this.pending=t;var v=function(e,r){if(i.pending!==t)return u(At(a,t));try{e(t,a,function(e){!1===e?(i.ensureURL(!0),u(function(t,e){return Ct(t,e,Et.aborted,'Navigation aborted from "'+t.fullPath+'" to "'+e.fullPath+'" via a navigation guard.')}(a,t))):n(e)?(i.ensureURL(!0),u(e)):"string"==typeof e||"object"==typeof e&&("string"==typeof e.path||"string"==typeof e.name)?(u(Ot(a,t)),"object"==typeof e&&e.replace?i.replace(e):i.push(e)):r(e)})}catch(t){u(t)}};gt(d,v,function(){var r=[];gt(function(t,e,r){return St(t,"beforeRouteEnter",function(t,n,o,i){return function(t,e,r,n,o){return function(i,a,u){return t(i,a,function(t){"function"==typeof t&&n.push(function(){!function t(e,r,n,o){r[n]&&!r[n]._isBeingDestroyed?e(r[n]):o()&&setTimeout(function(){t(e,r,n,o)},16)}(t,e.instances,r,o)}),u(t)})}}(t,o,i,e,r)})}(l,r,function(){return i.current===t}).concat(i.router.resolveHooks),v,function(){if(i.pending!==t)return u(At(a,t));i.pending=null,e(t),i.router.app&&i.router.app.$nextTick(function(){r.forEach(function(t){t()})})})})},jt.prototype.updateRoute=function(t){this.current=t,this.cb&&this.cb(t)},jt.prototype.setupListeners=function(){},jt.prototype.teardownListeners=function(){this.listeners.forEach(function(t){t()}),this.listeners=[]};var $t=function(t){function e(e,r){t.call(this,e,r),this._startLocation=Pt(this.base)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;if(!(this.listeners.length>0)){var e=this.router,r=e.options.scrollBehavior,n=vt&&r;n&&this.listeners.push(at());var o=function(){var r=t.current,o=Pt(t.base);t.current===g&&o===t._startLocation||t.transitionTo(o,function(t){n&&ut(e,t,r,!0)})};window.addEventListener("popstate",o),this.listeners.push(function(){window.removeEventListener("popstate",o)})}},e.prototype.go=function(t){window.history.go(t)},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){yt(R(n.base+t.fullPath)),ut(n.router,t,o,!1),e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){mt(R(n.base+t.fullPath)),ut(n.router,t,o,!1),e&&e(t)},r)},e.prototype.ensureURL=function(t){if(Pt(this.base)!==this.current.fullPath){var e=R(this.base+this.current.fullPath);t?yt(e):mt(e)}},e.prototype.getCurrentLocation=function(){return Pt(this.base)},e}(jt);function Pt(t){var e=decodeURI(window.location.pathname);return t&&0===e.toLowerCase().indexOf(t.toLowerCase())&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var Tt=function(t){function e(e,r,n){t.call(this,e,r),n&&function(t){var e=Pt(t);if(!/^\/#/.test(e))return window.location.replace(R(t+"/#"+e)),!0}(this.base)||qt()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this;if(!(this.listeners.length>0)){var e=this.router.options.scrollBehavior,r=vt&&e;r&&this.listeners.push(at());var n=function(){var e=t.current;qt()&&t.transitionTo(Ut(),function(n){r&&ut(t.router,n,e,!0),vt||Vt(n.fullPath)})},o=vt?"popstate":"hashchange";window.addEventListener(o,n),this.listeners.push(function(){window.removeEventListener(o,n)})}},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){Mt(t.fullPath),ut(n.router,t,o,!1),e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,function(t){Vt(t.fullPath),ut(n.router,t,o,!1),e&&e(t)},r)},e.prototype.go=function(t){window.history.go(t)},e.prototype.ensureURL=function(t){var e=this.current.fullPath;Ut()!==e&&(t?Mt(e):Vt(e))},e.prototype.getCurrentLocation=function(){return Ut()},e}(jt);function qt(){var t=Ut();return"/"===t.charAt(0)||(Vt("/"+t),!1)}function Ut(){var t=window.location.href,e=t.indexOf("#");if(e<0)return"";var r=(t=t.slice(e+1)).indexOf("?");if(r<0){var n=t.indexOf("#");t=n>-1?decodeURI(t.slice(0,n))+t.slice(n):decodeURI(t)}else t=decodeURI(t.slice(0,r))+t.slice(r);return t}function It(t){var e=window.location.href,r=e.indexOf("#");return(r>=0?e.slice(0,r):e)+"#"+t}function Mt(t){vt?yt(It(t)):window.location.hash=t}function Vt(t){vt?mt(It(t)):window.location.replace(It(t))}var Bt=function(t){function e(e,r){t.call(this,e,r),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(t,e,r){var n=this;this.transitionTo(t,function(t){n.stack=n.stack.slice(0,n.index+1).concat(t),n.index++,e&&e(t)},r)},e.prototype.replace=function(t,e,r){var n=this;this.transitionTo(t,function(t){n.stack=n.stack.slice(0,n.index).concat(t),e&&e(t)},r)},e.prototype.go=function(t){var e=this,r=this.index+t;if(!(r<0||r>=this.stack.length)){var n=this.stack[r];this.confirmTransition(n,function(){e.index=r,e.updateRoute(n)},function(t){o(t,Et.duplicated)&&(e.index=r)})}},e.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},e.prototype.ensureURL=function(){},e}(jt),Ht=function(t){void 0===t&&(t={}),this.app=null,this.apps=[],this.options=t,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=Z(t.routes||[],this);var e=t.mode||"hash";switch(this.fallback="history"===e&&!vt&&!1!==t.fallback,this.fallback&&(e="hash"),Y||(e="abstract"),this.mode=e,e){case"history":this.history=new $t(this,t.base);break;case"hash":this.history=new Tt(this,t.base,this.fallback);break;case"abstract":this.history=new Bt(this,t.base);break;default:0}},zt={currentRoute:{configurable:!0}};function Ft(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}Ht.prototype.match=function(t,e,r){return this.matcher.match(t,e,r)},zt.currentRoute.get=function(){return this.history&&this.history.current},Ht.prototype.init=function(t){var e=this;if(this.apps.push(t),t.$once("hook:destroyed",function(){var r=e.apps.indexOf(t);r>-1&&e.apps.splice(r,1),e.app===t&&(e.app=e.apps[0]||null),e.app||e.history.teardownListeners()}),!this.app){this.app=t;var r=this.history;if(r instanceof $t||r instanceof Tt){var n=function(){r.setupListeners()};r.transitionTo(r.getCurrentLocation(),n,n)}r.listen(function(t){e.apps.forEach(function(e){e._route=t})})}},Ht.prototype.beforeEach=function(t){return Ft(this.beforeHooks,t)},Ht.prototype.beforeResolve=function(t){return Ft(this.resolveHooks,t)},Ht.prototype.afterEach=function(t){return Ft(this.afterHooks,t)},Ht.prototype.onReady=function(t,e){this.history.onReady(t,e)},Ht.prototype.onError=function(t){this.history.onError(t)},Ht.prototype.push=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise(function(e,r){n.history.push(t,e,r)});this.history.push(t,e,r)},Ht.prototype.replace=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise(function(e,r){n.history.replace(t,e,r)});this.history.replace(t,e,r)},Ht.prototype.go=function(t){this.history.go(t)},Ht.prototype.back=function(){this.go(-1)},Ht.prototype.forward=function(){this.go(1)},Ht.prototype.getMatchedComponents=function(t){var e=t?t.matched?t:this.resolve(t).route:this.currentRoute;return e?[].concat.apply([],e.matched.map(function(t){return Object.keys(t.components).map(function(e){return t.components[e]})})):[]},Ht.prototype.resolve=function(t,e,r){var n=F(t,e=e||this.history.current,r,this),o=this.match(n,e),i=o.redirectedFrom||o.fullPath;return{location:n,route:o,href:function(t,e,r){var n="hash"===r?"#"+e:e;return t?R(t+"/"+n):n}(this.history.base,i,this.mode),normalizedTo:n,resolved:o}},Ht.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==g&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(Ht.prototype,zt),Ht.install=function t(e){if(!t.installed||N!==e){t.installed=!0,N=e;var r=function(t){return void 0!==t},n=function(t,e){var n=t.$options._parentVnode;r(n)&&r(n=n.data)&&r(n=n.registerRouteInstance)&&n(t,e)};e.mixin({beforeCreate:function(){r(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),e.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,n(this,this)},destroyed:function(){n(this)}}),Object.defineProperty(e.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(e.prototype,"$route",{get:function(){return this._routerRoot._route}}),e.component("RouterView",a),e.component("RouterLink",Q);var o=e.config.optionMergeStrategies;o.beforeRouteEnter=o.beforeRouteLeave=o.beforeRouteUpdate=o.created}},Ht.version="3.3.4",Y&&window.Vue&&window.Vue.use(Ht),e.a=Ht}}]);