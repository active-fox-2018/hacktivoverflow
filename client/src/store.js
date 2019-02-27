import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import hacktivOverflowApi from '@/api/hacktivOverflowApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    isLogin: false,
    user: { _id: '' },
    questions: []
  },
  mutations: {
    loginUser (state, payload) {
      state.isLogin = true
      state.token = payload.token
      state.user = payload.data
      localStorage.setItem('token', payload.token)
    },

    logout (state) {
      state.isLogin = false
      localStorage.removeItem('token')
      Swal.fire({
        position: 'bottom-end',
        type: 'success',
        title: `Feel Free To Come Back Again`,
        showConfirmButton: false,
        timer: 1500
      })
      state.user = { _id: '' }
    },

    updateStoreQuestions (state, payload) {
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i]._id === payload._id) {
          state.questions.splice(i, 1, payload)
        }
      }
    },

    addStoreQuestions (state, payload) {
      state.questions.push(payload)
    },

    removeStoreQuestions (state, payload) {
      state.questions.splice(state.questions.indexOf(payload), 1)
    },

    getStoreQuestions (state, payload) {
      state.questions = payload
    }
  },
  actions: {
    login (context, payload) {
      hacktivOverflowApi
        .post('/users/login', payload)
        .then(({ data }) => {
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          context.commit('loginUser', data)
        })
        .catch(error => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: error.response.data.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    getQuestions (context) {
      hacktivOverflowApi
        .get('/questions', {
          headers: {
            'token': context.state.token
          }
        })
        .then(({ data }) => {
          context.commit('getStoreQuestions', data.data)
        })
        .catch(error => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: error.response.data.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    voteQuestions (context, payload) {
      hacktivOverflowApi
        .put(`/questions/vote/${payload.questionId}`, {
          status: payload.status
        }, {
          headers: {
            token: context.state.token
          }
        })
        .then(({ data }) => {
          context.commit('updateStoreQuestions', data.data)
        })
        .catch(error => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: error.response.data.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    addQuestion (context, payload) {
      hacktivOverflowApi
        .post('/questions', payload, {
          headers: {
            'token': context.state.token
          }
        })
        .then(({ data }) => {
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          context.commit('addStoreQuestions', data.data)
        })
        .catch(error => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: error.response.data.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    editQuestion (context, payload) {
      hacktivOverflowApi
        .put(`/questions/${payload.id}`, payload.data, {
          headers: {
            'token': context.state.token
          }
        })
        .then(({ data }) => {
          context.commit('updateStoreQuestions', data.afterUpdate)
        })
        .catch(error => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: error.response.data.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    removeQuestion (context, payload) {
      hacktivOverflowApi
        .delete(`/questions/${payload.id}`, {
          headers: {
            'token': context.state.token
          }
        })
        .then(({ data }) => {
          context.commit('removeStoreQuestions', data.data)
        })
        .catch(error => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: error.response.data.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }
})
