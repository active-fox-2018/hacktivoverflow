import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

Vue.use(Vuex)
const server = `http://localhost:3000`

export default new Vuex.Store({
  state: {
    isLogin: null,
    allQuestions: [],
    theQuestion: '',
    myQuestions: [],
    soonUpdated: null,
    currentVotes: null,
    theAnswers: [],
  },
  mutations: {
    isLogin (state, payload) {
      state.isLogin = payload
    },
    getAllQuestions (state, payload) {
      state.allQuestions = payload
    },
    theQues (state, payload) {
      state.theQuestion = payload
    },
    myQuestions (state, payload) {
      state.myQuestions = payload
    },
    storeSoonUpdated (state, payload) {
      state.soonUpdated = payload
    },
    votes(state, payload) {
      state.currentVotes = payload.upvotes.length - payload.downvotes.length
    }, 
    theAnswers(state, payload) {
      state.theAnswers = payload
    },
    addAns(state, payload) {
      state.theAnswers.push(payload)
    }
  },
  actions: {

    // USER
    register ({ commit }, data) {
      axios.post(`${server}/register`, {
        username: data.username,
        email: data.email,
        password: data.password
      })
        .then(({ data }) => {
          router.push({ path: '/login' })
          console.log(data)
        })
        .catch((err) => {
          console.log(`register error ==`, err)
        })
    },
    userLogin ({ dispatch }, data) {
      axios.post(`${server}/login`, {
        email: data.email,
        password: data.password
      })
        .then(({ data }) => {
          console.log(data.msg)
          localStorage.setItem('token', data.token)
          dispatch('isLogin')
        })
        .catch(err => {
          console.log(`login error -- `, err)
        })
    },
    isLogin ({ commit }) {
      axios.get(`${server}/auth`, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          commit('isLogin', data)
          router.push('/')
        })
        .catch(err => {
          console.log(`actions isLogin err ----`, err)
        })
    },
    logout ({ commit }) {
      commit('isLogin', null)
      localStorage.removeItem('token')
      router.push('/')
    },

    // QUESTIONS
    getAllQuestions ({ commit }) {
      axios.get(`${server}/questions/read`)
        .then(({ data }) => {
          console.log(data.msg)
          commit('getAllQuestions', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addQues ({ commit }, data) {
      axios.post(`${server}/questions/add`, {
        title: data.title,
        description: data.description
      }, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data.msg)
          router.push({ path: '/' })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getQues ({ commit }, data) {
      // console.log(data._id, '===========')
      axios.get(`${server}/questions/${data._id}`)
        .then(({ data }) => {
          commit('theQues', data.data)
          commit('votes', data.data)
          router.push({ path: '/question' })
          console.log(data.msg)
          console.log(data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    myQues ({ commit }) {
      axios.get(`${server}/questions/me`, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data.msg)
          console.log(data.data)
          commit('myQuestions', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateQuestion ({ commit }, data) {
      axios.put(`${server}/questions/${data.id}`, data, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data)
          router.push('/ques/me')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion ({ commit }, data) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this imaginary file!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`${server}/questions/${data._id}`, {
              headers: { token: localStorage.getItem('token') }
            })
              .then(() => {
                swal('Deleted!', {
                  icon: 'success'
                })
                router.push('/ques/me')
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    },
    upvoteQues ({ commit,dispatch }, data) {
      axios.get(`${server}/questions/upvote/${data._id}`, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data.msg)
          commit('votes', data.data)
          dispatch('getAllQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    },
    downvoteQues ({ commit, dispatch }, data) {
      axios.get(`${server}/questions/downvote/${data._id}`, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data.msg)
          commit('votes', data.data)
          dispatch('getAllQuestions')
        })
        .catch(err => {
          console.log(err)
        })
    },

    // ANSWERS
    addComment({ commit }, data) {
      axios.post(`${server}/answers`, data, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          swal('success', 'answer added', 'success')
          console.log(data)
          commit('addAns', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAnswersbytheQuestion ({commit}, data) {
      axios.get(`${server}/answers/${data._id}`)
        .then(({ data }) => {
          console.log(data)
          commit('theAnswers', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    ansUpvote({ commit, dispatch }, data) {
      axios.get(`${server}/answers/upvote/${data._id}`, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data.msg)
          // commit('votes', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    ansDownvote({ commit, dispatch }, data) {
      axios.get(`${server}/answers/downvote/${data._id}`, {
        headers: { token: localStorage.getItem('token') }
      })
        .then(({ data }) => {
          console.log(data.msg)
          // commit('votes', data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }


  }
})
