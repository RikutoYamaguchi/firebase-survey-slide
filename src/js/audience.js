import Vue from 'vue'
import Audience from './vue/Audience'
import './bootstrap'

import store from './store'

new Vue({
  el: '#app',
  render: h => h(Audience),
  store,
})
