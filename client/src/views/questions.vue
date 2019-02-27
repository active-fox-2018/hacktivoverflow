<template>
  <div>
    <Navbar flex/>
    <v-card style="margin-top: 60px">
    <v-container fill-height>
      <v-layout fill-height>
        <v-flex flexbox  align-center justify-center>
          <v-btn
            v-if="isLogin"
            flat color="blue"
            @click="voteQuestion(1)">Upvote</v-btn>
          <v-flex column>
            <span class="subheadline"> {{
              this.question.votes.filter(vote => vote.status == 1).length - this.question.votes.filter(vote => vote.status == -1).length
              }} </span>
            <span class="subheadline"> Votes </span>
          </v-flex>
          <v-btn
            v-if="isLogin"
            flat color="blue"
            @click="voteQuestion(-1)">Downvote</v-btn>
          <v-flex column>
            <span class="subheadline"> 0 </span>
            <span class="subheadline"> Answers </span>
          </v-flex>
          <v-flex column>
            <span class="subheadline"> 0 </span>
            <span class="subheadline"> Views </span>
          </v-flex>

        </v-flex>
        <v-flex flexbox column>
          <v-btn flat color="blue">{{question.title}}</v-btn>
          <p>{{question.description}}</p>
          <v-layout>
          <v-btn flat color="blue">Tags 1</v-btn>
          <v-btn flat color="blue">Tags 2</v-btn>
          <v-btn flat color="blue">Tags 3</v-btn>
        </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row align-end justify-end>
        <v-btn flat color="blue">{{question.created_at}}</v-btn>
      </v-layout>
      <div v-if="user">
        <CreateAnswer
          v-if="isLogin"
          @add-answer="createAnswer($event)"/>
        <EditQuestion
          v-if="user._id.toString() === question.userId.toString()"
          :question="question"/>
      </div>
    </v-container>
  </v-card>
    <h1>Answer</h1>
    <AnswersCard
      v-for="answer in answers"
      :key="answer._id"
      :answer="answer"
      @vote="voteAnswers"
      @edit-answer="editAnswers($event)"
      @remove-answer="removeAnswers($event)"/>
  </div>
</template>

<script>
import Navbar from '@/components/navbar'
import Swal from 'sweetalert2'
import hacktivOverflowApi from '@/api/hacktivOverflowApi'
import AnswersCard from '@/components/answersCard'
import CreateAnswer from '@/components/createAnswer'
import EditQuestion from '@/components/editQuestion'

export default {
  components: {
    Navbar,
    AnswersCard,
    CreateAnswer,
    EditQuestion
  },
  data () {
    return {
      question: {
        votes: [],
        userId: ''
      },
      answers: [],
      update: false
    }
  },
  created () {
    this.getQuestionsById()
  },
  watch: {
    update (val) {
      if (val) {
        this.getQuestionsById()
        this.update = false
      }
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    isLogin () {
      return this.$store.state.isLogin
    },
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    getQuestionsById () {
      hacktivOverflowApi
        .get(`/questions/findById/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question = data.data
          this.getAnswers()
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

    voteQuestion (num) {
      this.$store.dispatch('voteQuestions', {
        status: num,
        questionId: this.question._id
      })
      this.update = true
    },

    getAnswers () {
      hacktivOverflowApi
        .get(`/answers/question/${this.question._id}`, {
          headers: {
            'token': this.token
          }
        })
        .then(({ data }) => {
          this.answers = data.data || []
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

    createAnswer (payload) {
      payload.questionId = this.question._id
      hacktivOverflowApi
        .post(`/answers`, payload, {
          headers: {
            token: this.token
          }
        })
        .then(({ data }) => {
          this.answers.push(data.data)
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

    editAnswers (payload) {
      hacktivOverflowApi
        .put(`/answers/${payload._id}`, payload, {
          headers: {
            'token': this.token
          }
        })
        .then(({ data }) => {
          for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i]._id.toString() === data.afterUpdate._id.toString()) {
              this.answers.splice(i, 1, data.afterUpdate)
            }
          }
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

    removeAnswers (payload) {
      hacktivOverflowApi
        .delete(`/answers/${payload._id}`, {
          headers: {
            'token': this.token
          }
        })
        .then(({ data }) => {
          for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i]._id.toString() === payload._id.toString()) {
              this.answers.splice(i, 1)
            }
          }
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

    voteAnswers (payload) {
      hacktivOverflowApi
        .put(`/answers/vote/${payload.answerId}`, payload, {
          headers: {
            'token': this.token
          }
        })
        .then(({ data }) => {
          for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i]._id === data.data._id) {
              this.answers.splice(i, 1, data.data)
            }
          }
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
}
</script>
