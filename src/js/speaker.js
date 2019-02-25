import Vue from 'vue'
import Speaker from './vue/Speaker'
import './bootstrap'

import store from './store'

new Vue({
  el: '#app',
  render: h => h(Speaker),
  store
})
