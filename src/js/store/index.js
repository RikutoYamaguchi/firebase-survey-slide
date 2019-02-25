import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentProject: null,
  },
  mutations: {
    setCurrentProject(state, currentProject) {
      state.currentProject = currentProject
    },
  },
  actions: {
     async initialize({ commit }) {
       const currentProjectRef = this.$database.ref('currentProject')
       const currentRefSnapshot = await currentProjectRef.once('value')
       const currentProject = currentRefSnapshot.val()
       commit('setCurrentProject', currentProject)
    }
  },
  getters: {
    currentProject(state) {
      return state.currentProject
    }
  }
})

export default store
