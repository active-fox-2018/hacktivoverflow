<template>
  <v-layout>
     <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="lime lighten-1"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
      <v-btn
       color="deep-orange accent-3"
        flat
        @click="deleteQuestion"
      >
        Delete
      </v-btn>
    </v-snackbar>
    <v-flex xs12>
      <v-card class="pa-2">
         <v-card-title color="white" light>
           <v-layout row fill-height>
             <v-flex class="text-xs-center mx-3" xs1>
              <v-btn flat icon color="blue lighten-2" @click.prevent="questionVote('upVotes')">
                <v-icon>thumb_up</v-icon>
              </v-btn>
               <h2>{{upVotes.length - downVotes.length}}</h2>
              <v-btn flat icon color="red lighten-2" @click.prevent="questionVote('downVotes')">
                <v-icon>thumb_down</v-icon>
              </v-btn>
             </v-flex>
             <v-flex>
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-card-text v-html="description">
              </v-card-text>
              <v-card-text>Asked by: {{user.name}}</v-card-text>
             </v-flex>
             <v-flex class="text-xs-center mx-3" xs1 v-if="$store.state.id === user._id">
               <router-link :to="{ name: 'editQuestion', params: { id: id}}" style="text-decoration:none">
              <v-btn flat icon color="blue lighten-2">
                <v-icon>fas fa-edit</v-icon>
              </v-btn>
               </router-link>
              <v-btn flat icon color="red lighten-2" @click.prevent="askToDelete">
                <v-icon>fas fa-trash</v-icon>
              </v-btn>
             </v-flex>
           </v-layout>
         </v-card-title>
         <v-card flat class="pa-4">
           <h3>Answer:</h3>
           <v-layout v-for="(answer) in answers"  :key="answer._id" row wrap>
             <v-flex xs12>
             <v-card row wrap xs12 flat>
               <v-card-title class="text-xs-left">
                 <h3>{{answer.title}}</h3>
               </v-card-title>
               <v-card color="lime lighten-5" flat>
               <v-card-text v-html="answer.description">
               </v-card-text>
               <v-card-text class="text-lg-left">
                  <i>
                  Answered By: {{answer.UserId.name}}
                  </i>
               </v-card-text>
               </v-card>
               <v-divider :id="answer._id+1"/>
             </v-card>
             </v-flex>
             <v-flex>
              <v-list-tile-action-text>{{answer.upVotes.length - answer.downVotes.length}}</v-list-tile-action-text>
                <v-btn flat icon color="blue lighten-2"  @click.prevent="answerVote(answer._id, 'upVotes')">
                  <v-icon small>thumb_up</v-icon>
                </v-btn>
                <v-btn flat icon color="red lighten-2" @click.prevent="answerVote(answer._id, 'downVotes')">
                  <v-icon small>thumb_down</v-icon>
                 </v-btn>
                <v-btn flat icon color="blue lighten-2" v-if="answer.UserId._id === $store.state.id" :to="{ name: 'editAnswer', params: {id: answer._id}}">
                  <v-icon small>fas fa-edit</v-icon>
                </v-btn>
             </v-flex>
           </v-layout>
         </v-card>
        <formQnA @reload='reloadData' :snackbar="changeSnackbar"/>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import formQnA from '@/components/formQnA.vue'
import snackbar from '@/components/snackbar.vue'
import axios from 'axios'
export default {
  components: {
    formQnA,
    snackbar
  },
  created() {
    this.getAllData()
  },
  data() {
    return {
      id: '',
      title: '',
      description: '',
      tags: '',
      user: '',
      upVotes: [],
      downVotes: [],
      answers: [],
      y: 'top',
      x: null,
      mode: '',
      snackbar: '',
      text: '',
      deleteButton: false
    }
  },
  methods: {
    getAllData() {
      axios({
        method: 'get',
        url: `${this.$store.state.serverUrl}/questions/${this.$route.params.questionId}`
      })
      .then(({data}) => {
        this.id = data.question._id
        this.user = data.question.UserId
        this.title = data.question.title
        this.upVotes = data.question.upVotes
        this.downVotes = data.question.downVotes
        this.description = data.question.description
        this.tags = data.question.tags
        this.answers = data.question.AnswerId
      })
      .catch(err => {
        console.log(err)
        this.$router.push('/')
      })
    },
    questionVote(vote) {
      axios({
        method: 'patch',
        url: `${this.$store.state.serverUrl}/questions/${this.$route.params.questionId}/${vote}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.getAllData()
      })
      .catch(err => {
        console.log(err)
        this.snackbar = true
        this.text = 'you have to login first'
      })
    },
    answerVote(id, vote) {
          axios({
        method: 'patch',
        url: `${this.$store.state.serverUrl}/answers/${id}/${vote}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.getAllData()
      })
      .catch(err => {
        console.log(err)
        this.snackbar = true
        this.text = 'you have to login first'
      })
    },
    reloadData() {
      this.getAllData()
    },
    changeSnackbar(payload) {
      this.snackbar = payload.snackbar
      this.text = payload.text
    },
    askToDelete() {
      this.deleteButton = true
      this.snackbar = true
      this.text = 'are you sure to delete?'
    },
    deleteQuestion() {
      axios({
        method: 'delete',
        url: `${this.$store.state.serverUrl}/questions/${this.id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log(data)
        this.$store.dispatch('getAllQuestions')
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
         this.$router.push('/')
      })
    }
  }
}
</script>

<style>

</style>
