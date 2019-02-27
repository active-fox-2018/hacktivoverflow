import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/server.js'
import Swal from 'sweetalert2'
import router from './router'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
});

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userId: '',
    questions: [],
    watchedTags: [],
    items: []
  },
  mutations: {
    checkLogin(state, payload) {
      state.userId = payload.data._id || ''
      state.isLogin = payload.status
      state.watchedTags = payload.data.tags
    },
    getQuestions(state, payload) {
      state.questions = payload
    },
    createQuestion(state, payload) {
      state.questions.unshift(payload)
    },
    getTags(state, payload) {
      state.items = payload
    },
    updateUserTags(state, payload) {
      state.watchedTags = payload
    }
  },
  actions: {
    checkLogin({commit}, payload) {
      if (localStorage.getItem('token')) {
        api
          .post(`/verifyToken`, {token: localStorage.getItem('token')})
          .then(({data}) => {
            if (!data.msg) {
              commit('checkLogin', {data, status: true})
            } else {
              commit('checkLogin', {data: '', status: false})
            }
          })
          .catch(({response}) => {
            commit('checkLogin', {data: '', status: false})
          })
      } else {
        if (payload === 'logout') {
          Toast.fire({
            type: 'success',
            title: 'Logout successfully',
          })
        }
        commit('checkLogin', {data: '', status: false})
      }
    },
    login({commit, dispatch}, user) {
      api
        .post(`/login`, user)
        .then(({data}) => {
          Toast.fire({
            type: 'success',
            title: 'Login successfully',
          })
          router.push({name: 'home'})
          localStorage.setItem('token', data.token)
          dispatch('checkLogin')
        })
        .catch(({response}) => {
          console.log(response);
          Swal.fire({
            type: 'error',
            title: response.data.msg
          })
        })
    },
    getQuestions({commit}) {
      api
        .get(`/questions`)
        .then(({data}) => {
          commit('getQuestions', data)
        })
        .catch(({response}) => {
          console.log(response);
        })
    },
    createQuestion({commit, dispatch}, question) {
      api
        .post(`/questions`, question, { headers: { token: localStorage.getItem('token') } })
        .then(({data}) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your question has been added',
            showConfirmButton: false,
            timer: 2000
          })
          dispatch('getTags')
          commit('createQuestion', data)
          router.push({name: 'home'})
        })
        .catch(({response}) => {
          console.log(response);
        })
    },
    deleteData({commit}, id) {
      api
        .delete(`questions/${id}`, { headers: { token: localStorage.getItem('token') } })
        .then(({data}) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your question has been deleted',
            showConfirmButton: false,
            timer: 2000
          })
          router.push({name: "home"})
        })
        .catch(({response}) => {
          console.log(response);
        })
    },
    getTags({commit}) {
      api
        .get(`/tags`)
        .then(({data}) => {
          commit('getTags', data.map(e => e.text))
        })
        .catch(({response}) => {
          console.log(response);
        })
    },
    updateUserTags({commit}, tags) {
      api
        .put('/users', {tags}, {headers: {token: localStorage.getItem('token')}})
        .then(({data}) => {
          commit('updateUserTags', data)
        })
        .catch(({response}) => {
          console.log(response);
        })
    }
  }
})
