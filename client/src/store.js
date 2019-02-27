import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serverUrl: 'http://localhost:3000',
    questions : [],
    login: false,
    id: null
  },
  mutations: {
    getAllQuestions(state, payload) {
      state.questions = payload
    },
    userAuthetication(state, payload) {
      state.login = payload.status
      state.id = payload.id
    }
  },
  actions: {
    getAllQuestions ({commit}) {
      axios({
        method: 'get',
        url: `${this.state.serverUrl}/questions`,
      })
      .then(({data}) => {
        console.log(data)
        commit('getAllQuestions', data.questions)
      })
      .catch(err => {
        console.log(err)
      })
    },
    userAuthetication({commit}) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `${this.state.serverUrl}/authentication`,
          headers: {
            token : localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          commit('userAuthetication', {status: true, id: data.id})
          resolve()
        })
        .catch(err => {
          commit('userAuthetication',  {status: false, id: null})
          localStorage.removeItem('token')
          reject()
        })
      })
      
    }
  }
})
