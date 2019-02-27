import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Notify } from 'quasar'

const link = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topQuestions: [],
    questions: [],
    userToken: null,
    question: {},
    watchedTags: [],
    tagDetail: {}
  },
  mutations: {
    signOutUser (state) {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      state.userToken = null
    },
    storeTopQuestions (state, payload) {
      state.topQuestions = payload
    },
    storeQuestions (state, payload) {
      state.questions = payload
    },
    storeAQuestion (state, payload) {
      state.question = payload
    },
    tokenUser (state) {
      state.userToken = localStorage.getItem('token') || null
    },
    storeWatchedTags (state, payload) {
      state.watchedTags = payload
    },
    storeTagDetail (state, payload) {
      state.tagDetail = payload
    },
    storeAddedTag (state, payload) {
      state.watchedTags.push(payload)
    }
  },
  actions: {
    fetchTopQuestions ({ state, commit }) {
      axios
        .get(`${link}/questions/topQuestions`)
        .then(({ data }) => {
          commit('storeTopQuestions', data.questions)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    fetchQuestions ({ state, commit }) {
      axios
        .get(`${link}/questions`)
        .then(({ data }) => {
          commit('storeQuestions', data.questions)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    findQuestion ({ state, commit }, payload) {
      axios
        .get(`${link}/questions/find/${payload}`)
        .then(({ data }) => {
          commit('storeAQuestion', data.question)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    voteQuestion ({ state, dispatch }, payload) {
      axios
        .patch(`${link}/questions/vote/${payload.questionId}`, { vote: payload.vote }, { headers: { token: state.userToken } })
        .then(({ data }) => {
          dispatch('findQuestion', data.updatedQuestion._id)
          Notify.create({ icon: 'fas fa-thumbs-up', message: data.status, position: 'top' })
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    userSignIn ({ state, commit }, payload) {
      axios
        .post(`${link}/users/login`, payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', payload.email)
          localStorage.setItem('userId', data.user._id)
          commit('tokenUser', data.token)
          Notify.create({ icon: 'fas fa-thumbs-up', message: data.status, position: 'top' })
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    userSignUp ({ state, commit }, payload) {
      axios
        .post(`${link}/users/register`, payload)
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: `${data.status}, please Login to continue`, position: 'top' })
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    askAQuestion ({ state, dispatch }, payload) {
      axios
        .post(`${link}/questions`, payload, { headers: { token: state.userToken } })
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: `${data.status}`, position: 'top' })
          dispatch('fetchQuestions')
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    answerAQuestion ({ state, dispatch }, payload) {
      axios
        .post(`${link}/answers/${payload.questionId}`, payload.answer, { headers: { token: state.userToken } })
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: `${data.status}`, position: 'top' })
          dispatch('findQuestion', payload.questionId)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    voteAnswer ({ state, dispatch }, payload) {
      axios
        .patch(`${link}/answers/vote/${payload.answerId}`, { vote: payload.vote }, { headers: { token: state.userToken } })
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: data.status, position: 'top' })
          dispatch('findQuestion', payload.questionId)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    deleteQuestion ({ state, dispatch }, payload) {
      axios
        .delete(`${link}/questions/${payload.questionId}`, { headers: { token: state.userToken } })
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: data.status, position: 'top' })
          dispatch('fetchQuestions')
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    deleteAnswer ({ state, dispatch }, payload) {
      axios
        .delete(`${link}/answers/${payload.answerId}`, { headers: { token: state.userToken, questionid: payload.questionId } })
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: data.status, position: 'top' })
          dispatch('findQuestion', payload.questionId)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    getWatchedTags ({ state, commit }) {
      axios
        .get(`${link}/users/tags`, { headers: { token: state.userToken } })
        .then(({ data }) => {
          commit('storeWatchedTags', data.watchedTags)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    addWatchedTag ({ state, commit }, payload) {
      axios
        .patch(`${link}/users/tags`, { tagId: payload.tagId }, { headers: { token: state.userToken } })
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: data.status, position: 'top' })
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    editQuestion ({ state, dispatch }, payload) {
      axios
        .put(`${link}/questions/${payload.questionId}`, payload.edit, { headers: { token: state.userToken } })
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: 'You have successfully updated you question', position: 'top' })
          dispatch('findQuestion', payload.questionId)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    seeTagQuestion ({ state, commit }, payload) {
      axios
        .get(`${link}/tags/${payload}`)
        .then(({ data }) => {
          commit('storeTagDetail', data)
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    },
    watchATag ({ state, dispatch }, payload) {
      axios
        .patch(`${link}/users/tags`, { tagId: payload.tagId }, { headers: { token: state.userToken } })
        .then(({ data }) => {
          Notify.create({ icon: 'fas fa-thumbs-up', message: data.status, position: 'top' })
          dispatch.getWatchedTags()
        })
        .catch((error) => {
          Notify.create({ color: 'negative', message: error.response.data.status, position: 'top' })
        })
    }
  }
})
