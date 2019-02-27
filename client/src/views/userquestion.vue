<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 md12 lg8 >
        <v-card color="white" light>
          <v-card-title primary class="title">My Questions</v-card-title>
          <v-flex class="pa-2" v-for="question in questions" :key="question._id">
            <v-card color="whight" light>
              <v-layout row wrap>
              <v-flex xs4>
                <v-card-text>
                  <v-layout row wrap>
                    <v-card class="mx3 pa-2 text-xs-center" flat>
                      <h1>{{question.upVotes.length - question.downVotes.length}}</h1>
                      <p>Votes</p>
                    </v-card>
                    <v-card class="mx-3 pa-2 text-xs-center" flat>
                      <h1>{{question.AnswerId.length}}</h1>
                      <p>Answer</p>
                    </v-card>
                  </v-layout>
                </v-card-text>
              </v-flex>
              <v-flex>
                <v-card-text>
                  <router-link :to="{ name: 'question', params: { questionId: question._id }}" style="text-decoration:none">
                  <h2>{{question.title}}</h2>
                  </router-link>
                   <v-chip outline color="primary" v-for="tag in question.Tags" :key="tag._id">Tags</v-chip>
                </v-card-text>
              </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-card>
      </v-flex>
      <v-flex d-flex class="mt-3">
        <v-layout row wrap>
          <v-flex d-flex xs12 md12 lg12>
            <v-card color="white lighten-4" light>
              <v-card-title primary class="title">My Answers</v-card-title>
              <v-flex class="pa-2" v-for="answer in answers" :key="answer._id">
            <v-card color="whight" light>
              <v-layout row wrap>
              <v-flex xs1>
                <v-card-text>
                  <v-layout row wrap>
                    <v-card class="pa-2 text-xs-center" flat>
                      <h1>{{answer.upVotes.length - answer.downVotes.length}}</h1>
                      <p>Votes</p>
                    </v-card>
                  </v-layout>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card class="pa-2 text-xs-center" flat>
                  <router-link :to="{ name: 'question', params: { questionId: answer.QuestionId[0]._id }}" style="text-decoration:none">
                    <h2 class="text-xs-center">{{answer.QuestionId[0].title}}</h2>
                  </router-link>
                </v-card>
              </v-flex>
              <v-flex xs7>
                <v-card-text>
                  <p> your answer :  </p>
                  <p> {{answer.title}}</p>
                  <p v-html="answer.description"></p>
                </v-card-text>
              </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  created() {
    axios({
      method: 'get',
      url: `${this.$store.state.serverUrl}/user/questions`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .then(({data}) => {
      this.questions = data.questions
      return axios({
      method: 'get',
      url: `${this.$store.state.serverUrl}/user/answers`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
    })
    .then(({data}) => {
      this.answers = data.answers
    })
    .catch(err => {
      console.log(err)
    })
  },
  name: 'mainbox',
  components: {

  },
  data () {
    return {
      questions : [],
      answers: []
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
