<template>
  <v-container>
    <v-flex mb-4>
      <p class="headline">{{question.title}}</p>
      <hr>
      <DetailCard :data="question" @vote="vote"/>
    </v-flex>

    <v-flex mb-4 v-if="answers.length">
      <p class="title" >{{answers.length}} Answers</p>
      <hr>
      <DetailCard v-for="answer in answers" :key="answer._id" :data="answer.answerId" @vote="vote"/>
    </v-flex>
    <hr>

    <v-flex mt-4>
      <p class="title">Youre answer</p>
      <v-form>
        <wysiwyg v-model="description"/>
        <v-btn @click="submit">Submit</v-btn>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
import api from '@/api/server.js'
import DetailCard from "@/components/DetailCard"
import {mapState} from "vuex"
import Swal from "sweetalert2"

export default {
  components: {
    DetailCard
  },
  computed: mapState(["isLogin"]),
  data() {
    return {
      question: {},
      answers: [],
      description: ""
    }
  },
  created() {
    this.getQuestion()
  },
  methods: {
    getQuestion() {
      api
        .get(`/questions/${this.$route.params.questionId}`)
        .then(({ data }) => {
          this.getVotes(data)
          data.answers.forEach(answer => {
            this.getVotes(answer.answerId)
          });
          this.question = data
          this.answers = data.answers
        })
        .catch(err => {
          console.log(err)
        })
    },
    getVotes(data) {
      let result = 0
      data.votes.forEach(vote => {
        if (vote.status === "upvote") {
          result += 1
        } else {
          result -= 1
        }
      })
      data.count = result
    },
    vote(input) {
      api
        .put(`/${input.data}/vote/${input.id}`, {status: input.status}, {headers: { token: localStorage.getItem('token') }})
        .then(({data}) => {
          this.getQuestion()
        })
        .catch(({response}) => {
          console.log(response);
        })
    },
    submit() {
      let answer = {
        description: this.description
      }
      if (this.isLogin) {
        if (answer.description) {
          api
            .post(`/answers/${this.$route.params.questionId}`, answer, { headers: { token: localStorage.getItem('token') } })
            .then(({data}) => {
              console.log('========');
              Swal.fire({
                position: 'top-end',
                type: 'success',
                title: `Your answer has been added`,
                showConfirmButton: false,
                timer: 2000
              })
              this.getQuestion()
              this.description = ''
            })
            .catch(({response}) => {
              console.log('eeeeeeeeee');

              console.log(response);
            })
        } else {
          Swal.fire({
            type: 'info',
            title: "Please Write youre answer"
          })
        }
      } else {
          Swal.fire({
            type: 'info',
            title: "Please Login First"
          })
      }
    }
  }
}
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
