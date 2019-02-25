/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/index.js'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // formUser: {
    //   name: '',
    //   email: '',
    //   password: ''
    // }
  },
  mutations: {

  },
  actions: {
    login({commit}, payload) {
      api
        .post('/users/login', payload)
        .then(({ data }) => {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.id)
          console.log(data)
        }).catch((err) => {
          console.log(err)
        });
    },
    register ({commit}, payload) {
      api
        .post('/users/register', payload)
        .then(({ data }) => {
          console.log(data)
        }).catch((err) => {
          console.log(err)
        });
    }
    // register ({commit}) {
    //   api
    //     .post('/users/register', {
    //       data: {
    //         name: this.state.formUser.name,
    //         email: this.state.formUser.email,
    //         password: this.state.formUser.password
    //       }
    //     })
    //     .then(({ data }) => {
    //       console.log(data)
    //     }).catch((err) => {
    //       console.log(err)
    //     });
    // }
  }
})
