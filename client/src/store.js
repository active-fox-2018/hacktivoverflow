import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

Vue.use(Vuex)

import axios from '@/api/server'
// import router from './router'

export default new Vuex.Store({
  state: {
    allPostings: [],
    // selectedPosting: '',
    currentUser: '',
    isLogin : [false]
  },
  mutations: {
    cekLogin(state,payload) {
      if(localStorage.getItem('token')) {
        state.isLogin.splice(0,1,true)
      }
    },
    login(state) {
      state.isLogin.splice(0,1,true)
      router.push({ path: '/' })
    },
    logout(state) {
      state.isLogin.splice(0,1, false)
      router.push({ path: '/' })
    },
    createPost(state, payload) {
      state.allPostings.unshift(payload)
      router.push({ path: '/' })
    },
    getAllPostings(state, payload) {
      state.allPostings = payload.reverse()
    },
    selectPosting(state, payload) {
      state.selectedPosting = payload
      router.push({ path: '/posting' })
    },
    addVote(state, payload) {
      const newData = { ...state.allPostings[payload.index], upvotes: payload.data.upvotes, downvotes: payload.data.downvotes};
      state.allPostings.splice(payload.index, 1, newData);
      router.push('/')
    },
    removeVote(state, payload) {
      const newData = { ...state.allPostings[payload.index], downvotes: payload.data.downvotes, upvotes: payload.data.upvotes };
      state.allPostings.splice(payload.index, 1, newData);
      router.push('/')
    },
    updateVoteInQuestion(state, payload) {
      state.allPostings[payload.postingIndex].answers.splice(payload.index, 1, payload.data)
      router.push(`/posting/${payload.postingId}/${payload.postingIndex}`)
    }
  },
  actions: {
    getAllPostings(context, payload) {
      axios
        .get('/postings')
        .then(({ data }) => {
          context.commit('getAllPostings', data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    register(context, payload) {
      axios
        .post('/users', payload)
        .then(data => {
          router.push('/login')
        })
        .catch(err => {
          console.error(err)
        })
    },
    login(context, payload) {
      axios
        .post('/users/login', payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', data.user._id)
          context.commit('login', data.user._id)
        })
        .catch(({response}) => {
          swal(response.data.error)
          console.log(JSON.stringify(response.data));
        })
    },
    createPost(context, payload) {
      axios
        .post('/postings', payload, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          context.commit('createPost', data)
        })
        .catch(({response}) => {
          swal(response.data.message)
          console.log(JSON.stringify(response.data.message));
        })
    },
    addVote(context, payload) {
      axios
        .patch(
          `/${payload.model}/${payload.id}`,
          { command: payload.command,
            process : '$push' },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          if (payload.model == 'postings') {
            context.commit('addVote', { data: data, index: payload.index })
          } else {
            context.commit('updateVoteInQuestion', { postingId: payload.postingId, postingIndex: payload.postingIndex, data: data, index: payload.index })
          }
        })
        .catch(err => {
          swal('you have login first')
          console.log(err);
        });
    },
    removeVote(context, payload) {

      axios
        .patch(
          `/${payload.model}/${payload.id}`,
          { command: payload.command,
          process : '$pull' },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        )
        .then(({ data }) => {
          if (payload.model == 'postings') {
            context.commit('removeVote', { data: data, index: payload.index })
          } else {
            context.commit('updateVoteInQuestion', { postingId: payload.postingId, postingIndex: payload.postingIndex, data: data, index: payload.index })
          }
        })
        .catch(err => {
          swal('you have login first')
          console.log(err);

        })
    },
  }
})
