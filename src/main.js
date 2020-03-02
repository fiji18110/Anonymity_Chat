import Vue from 'vue'
import firebase from 'firebase'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'

// Vue.use(Meta)
VueClipboard.config.autoSetContainer = true // add this line

Vue.use(VueClipboard)
Vue.use(VueAxios, axios)
var VueCookie = require('vue-cookie')
// Tell Vue to use the plugin
// import moment from 'vue-moment'
// moment.locale('ja');
Vue.use(VueCookie)

// Vue.use(moment);

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAQcJNUNtVwkp6tituj9RybLNpyNUCy68c',
  authDomain: 'chat-app-ns.firebaseapp.com',
  databaseURL: 'https://chat-app-ns.firebaseio.com',
  projectId: 'chat-app-ns',
  storageBucket: 'chat-app-ns.appspot.com',
  messagingSenderId: '356127108994'
}
firebase.initializeApp(config)
const app = new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
app.$mount('#app')
