import Vue from 'vue'
import Facilitation from './vue/Facilitation'
import './bootstrap'

import store from './store'

new Vue({
  el: '#app',
  render: h => h(Facilitation),
  store
})
