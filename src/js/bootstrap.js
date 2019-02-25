import firebase from 'firebase/app'
import 'firebase/database'
import Vue from 'vue'
import Vuex from 'vuex'

import config from '../../config'

firebase.initializeApp(config);

const database = firebase.database()

Vue.prototype.$database = database
Vuex.Store.prototype.$database = database

