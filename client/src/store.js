import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/my.js'
import router from '@/router.js'
import alertify from 'alertifyjs'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    allQuestions: [],
    jobs: null
  },
  mutations: {
    setUser (state, data) {
      state.user = data
    },
    logout (state) {
      state.user = null
      localStorage.removeItem('token')
      router.push({ name: 'home' })
    },
    pushQuestion (state, data) {
      state.allQuestions.unshift(data)
    },
    setQuestion (state, payload) {
      state.allQuestions = payload
    },
    filterQues (state, query) {
      let q = new RegExp(query.toLowerCase())
      state.allQuestions = state.allQuestions.filter(function (el) {
        return el.title.toLowerCase().match(q) || el.tags.join(' ').toLowerCase().match(q) || String(el.user._id) === String(query)
      })
    },
    setJobs (state, payload) {
      state.jobs = payload
    }
  },
  actions: {
    async login ({ commit }, data) {
      // return api({
      //   method: 'post',
      //   url: '/users/login',
      //   data
      // })
      //   .then(({ data }) => {
      //     // console.log(data)
      //     commit('setUser', data.data)
      //     localStorage.setItem('token', data.token)
      //     alertify.message(`Welcome, ${data.data.name}`)
      //     return true
      //   })
      //   .catch((err) => {
      //     return err.response
      //   })

      try {
        let result = await api({
          method: 'post',
          url: '/users/login',
          data
        })
        commit('setUser', result.data.data)
        localStorage.setItem('token', result.data.token)
        return true
      } catch (err) {
        return err.response
      }
    },
    getOneUser ({ commit }) {
      api({
        method: 'get',
        url: '/users',
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('setUser', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    register ({ commit }, data) {
      return api({
        method: 'post',
        url: '/users',
        data
      })
        .then(({ data }) => {
          commit('setUser', data.data)
          localStorage.setItem('token', data.token)
          alertify.message(`Welcome, ${data.data.name}`)
          return true
        })
        .catch(err => {
          return err.response
        })
    },
    addQuestion ({ commit }, data) {
      api({
        method: 'post',
        url: '/questions',
        data,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          commit('pushQuestion', data)
          alertify.message(`Success posting your question`)
          router.push({ name: 'home' })
        })
        .catch(err => {
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooopss something went wrong!`)
          }
        })
    },
    getAllQuestions ({ commit }) {
      api({
        method: 'get',
        url: '/questions'
      })
        .then(({ data }) => {
          commit('setQuestion', data)
        })
        .catch(err => {
          console.log(err.response)
          alertify.error(`Ooopss something went wrong!`)
        })
    },
    editQuestion ({ commit, dispatch }, data) {
      api({
        method: 'put',
        url: `/questions/${data._id}`,
        headers: {
          token: localStorage.token
        },
        data: data.data
      })
        .then(({ data2 }) => {
          dispatch('getAllQuestions')
          router.push({ name: 'quesDetail', params: { id: data._id } })
        })
        .catch(err => {
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooopss something went wrong!`)
          }
        })
    },
    getOneQuestion ({ commit }, id) {
      return api({
        method: 'get',
        url: `/questions/${id}`
      })
        .then(({ data }) => {
          return data
        })
        .catch(err => {
          console.log(err.response)
          alertify.error(`Oopps somethig went wrong!`)
          return err.response
        })
    },
    updateUser ({ commit }, tag) {
      api({
        method: 'put',
        url: `/users`,
        headers: {
          token: localStorage.token
        },
        data: {
          tags: tag
        }
      })
        .then(({ data }) => {
          commit('setUser', data)
        })
        .catch(err => {
          console.log(err.response)
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Ooopss something went wrong!`)
          }
        })
    },
    getJobs ({ commit }, query) {
      let params = {}
      if (query) {
        params = {
          search: query
        }
      }
      api({
        method: 'get',
        url: `/github`,
        params
      })
        .then(({ data }) => {
          commit('setJobs', data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
})
