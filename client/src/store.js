import Vue from 'vue'
import Vuex from 'vuex'
import swal from 'sweetalert'
import axios from '@/api/server.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    allQuestions: []
  },
  mutations: {
    changeLoginState(state, boolean) {
      state.isLogin = boolean
    },
    mutateAllQuestionsState(state, allQuestions){
      state.allQuestions = allQuestions
    }
  },
  actions: {
    getAllQuestions({ commit }) {
      axios
        .get(`/questions`, {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(res => {
          commit('mutateAllQuestionsState', res.data.questions)
          console.log(this.state.questions)
        })
        .catch(err => {
          swal({
            title: "Oops!",
            text: err.response.data.message,
            icon: "error",
          })
        })
    },
  }
})
