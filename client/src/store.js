/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/index.js'
import router from './router.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    userQuestions: [],
    tagged: [],
    userTags: []
  },
  mutations: {
    mutateIsLogin (state, payload) {
      state.isLogin = payload
    },
    mutatePostUserQuestion (state, payload) {
      state.userQuestions.unshift(payload)
    },
    mutatePostQuestion (state, payload) {
      state.questions.unshift(payload)
    },
    mutateFetchQuestions (state, payload) {
      state.questions = payload.reverse()
    },
    mutateUserQuestions (state, payload) {
      state.userQuestions = payload.reverse()
    },
    mutateUpdateQuestions (state, payload) {
      let index = state.questions.findIndex(el => {
        return el._id == payload._id
      })
      state.questions.splice(index, 1, payload)
    },
    mutateUpdateUserQuestions (state, payload) {
      let index = state.userQuestions.findIndex(el => {
        return el._id == payload._id
      })
      state.userQuestions.splice(index, 1, payload)
    },
    mutateDeleteQuestion (state, payload) {
      let data = state.userQuestions.filter(el => {
        return el._id !== payload._id
      })
      state.userQuestions = data
    },
    mutatePostAnswer (state, payload) {
      let index = state.questions.findIndex(el => {
        return el._id == payload._id
      })
      state.questions[0].answerId = payload.answerId
    },
    mutateTagged (state, payload) {
      state.tagged = payload
    },
    mutateWatchTags (state, payload) {
      state.userTags = payload.reverse()
    }
  },
  actions: {
    async checkLoginStatus ({commit}) {
      try {
        const data = await api.get('/users/verify-user', {headers: {token: localStorage.token}})
        commit('mutateIsLogin', true)
        commit('mutateWatchTags', data.data.tags)
      } catch (error) {
        commit('mutateIsLogin', false)
        // router.push('/login')
      }
    },
    async login({commit}, payload) {
      try {
        const data = await api.post('/users/login', payload)
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('userId', data.data.id)
        router.push('/')
        commit('mutateIsLogin', true)
        return true
      } catch (error) {
        return error.response
      }
    },
    async register ({commit}, payload) {
      try {
        const data = await api.post('/users/register', payload)
        router.push('/')
        return true
      } catch (error) {
        return error.response
      }
    },
    async fetchQuestions ({commit}, payload){
      try {
        const fetch = await api.get('/questions')
        commit('mutateFetchQuestions', fetch.data)
      } catch (error) {
        console.log(error.response)
      }
    },
    async postQuestion ({commit}, payload) {
      try {
        const data = await api
                              .post('/questions', payload, {
                                headers: {
                                  token: localStorage.token
                                }
                              })
        commit('mutatePostUserQuestion', data.data)
        commit('mutatePostQuestion', data.data)
        return true
      } catch (error) {
        return err.response
      }
    },
    upvoteQuestion ({commit}, payload) {
      return api({
        url: `/questions/upvote/${payload}`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        return data
      })
      .catch((err) => {
        return err.response
      })
    },
    downvoteQuestion ({commit}, payload) {
      return api({
        url: `/questions/downvote/${payload}`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        // let newdata = [...data]
        // commit('mutateUpdateQuestions', data)
        return data
      })
      .catch((err) => {
        console.log(err.response)
      });
    },
    async fetchUserQuestions ({commit}, payload) {
      try {
        let fetch = await api({
          url: '/questions/user',
          method: 'get',
          headers: {
            token: localStorage.token
          }
        })
        commit('mutateUserQuestions', fetch.data)
      } catch (error) {
        console.log(error.response)
      }
    },
    tagged ({commit}, payload) {
      let data = [...this.state.questions]
      let tagged = data.filter(el => {
        return el.tags.indexOf(payload) > -1
      })
      commit('mutateTagged', tagged)
    },
    async addTags({commit}, payload) {
      try {
        let data = await api({
          url: '/users/add-tags',
          method: 'patch',
          data: {
            tag: payload
          },
          headers: {
            token: localStorage.token
          }
        })
        commit('mutateWatchTags', data.data.tags)
        return true
      } catch (error) {
        return error.response
      }
    },
    async removeTags ({commit}, payload) {
      try {
        let data = await api({
          url: '/users/remove-tags',
          method: 'patch',
          data: {
            tag: payload
          },
          headers: {
            token: localStorage.token
          }
        })
        commit('mutateWatchTags', data.data.tags)
        alertify.success('Tag Removed')
        return true
      } catch (error) {
        console.log(error.response)
      }
    }
  }
})
