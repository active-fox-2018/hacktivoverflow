<template>
  <div>
    <div v-if="isLoading" class="container">
      <div class="spinner-grow text-primary" role="status"></div>
      <div class="spinner-grow text-secondary" role="status"></div>
      <div class="spinner-grow text-success" role="status"></div>
      <div class="spinner-grow text-danger" role="status"></div>
      <div class="spinner-grow text-warning" role="status"></div>
      <div class="spinner-grow text-info" role="status"></div>
      <div class="spinner-grow text-light" role="status"></div>
      <div class="spinner-grow text-dark" role="status"></div>
    </div>

    <div class="container">
      <div class="row container">
        <div class="col-1">
          <div class="row d-flex justify-content-center">
            <img @click="upVoteQuestion(detail._id)" src="../assets/up.png">
          </div>
          <div class="row d-flex justify-content-center">{{detail.votes}}</div>
          <div class="row d-flex justify-content-center">
            <img @click="downVoteQuestion(detail._id)" src="../assets/down.png">
          </div>
        </div>
        <div class="col-11">
          <div class="row container" style="margin-bottom:-2%">
            <h3>{{detail.title}}</h3>
          </div>
          <hr>
          <div class="row container" style="margin-bottom:-1%">
            <p v-html="detail.description"></p>
          </div>
            <hr>
          <div class="row container">
            <button type="button" class="tag mr-1 mb-2" v-for="(tag, index) in detail.tags" :key="index">
              <div class="row container">
                <div class="col d-flex align-items-center">{{tag}}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <hr>

      <!-- Answer -->
      <div class="container">
        <div class="row"><h5>{{answers.length}} Answer:</h5></div>
        <div v-for="(answer, index) in answers" :key="index">
          <div class="row">
            <div class="row container">
              <div class="col-1">
                <div class="row d-flex justify-content-center">
                  <img @click="upvoteAnswer(answer._id)" src="../assets/up.png">
                </div>
                <div class="row d-flex justify-content-center">{{answer.votes}}</div>
                <div class="row d-flex justify-content-center">
                  <img @click="downvoteAnswer(answer._id)" src="../assets/down.png">
                </div>
              </div>
              <div class="col-11">
                <div class="row container" style="margin-bottom:-1%">
                  <p v-html="answer.answer"></p>
                </div>
              </div>
            </div>
          </div>
          <hr>
        </div>
        <form @submit.prevent="postAnswer()">
          <wysiwyg v-model="answer"/>
          <button type="submit">Post Answer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      detail: {},
      isLoading: true,
      answer: '',
      answers: []
    }
  },
  methods: {
    async fetchQuestion () {
      this.isLoading = true
      try {
          const fetch = await api.get(`/questions/${this.$route.params.id}`)
          this.detail = fetch.data
          this.answers = fetch.data.answerId
          this.isLoading = false
          console.log(this.detail, '===========')
      }
      catch (error) {
        console.log(error)
      }
    },
    upVoteQuestion (questionId) {
      this.$store
          .dispatch('upvoteQuestion', questionId)
          .then(data => {
            this.$store.commit('mutateUpdateQuestions', data)
            this.detail = data
          })
    },
    downVoteQuestion (questionId) {
      this.$store
          .dispatch('downvoteQuestion', questionId)
          .then(data => {
            this.$store.commit('mutateUpdateQuestions', data)
            this.detail = data
          })
    },
    async postAnswer () {
      try {
          const data = await api.post(`/answers/${this.$route.params.id}`,{
            answer: this.answer
          },{
            headers: {
              token: localStorage.token
            }
          })
          this.answers = data.data.answerId.reverse()
          this.answer = ''
          console.log(data.data.answerId, '======== data habis post')
          this.$store.commit('mutatePostAnswer', data.data)
      }
      catch (error) {
        console.log(error)
      }
    },
    upvoteAnswer (answerId) {
      console.log('upvote', answerId)
      api({
        url: `/answers/upvote/${answerId}`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        let index = this.answers.findIndex(el => {
          return el._id == data._id
        })
        this.answers.splice(index, 1, data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    downvoteAnswer (answerId) {
      api({
        url: `/answers/downvote/${answerId}`,
        method: 'patch',
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        let index = this.answers.findIndex(el => {
          return el._id == data._id
        })
        this.answers.splice(index, 1, data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.fetchQuestion()
  }
}
</script>

<style>

</style>
