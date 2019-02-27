<template>
  <v-card>
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex flexbox  align-center justify-center>
          <v-btn
            v-if="isLogin"
            flat color="blue"
            @click="$store.dispatch('voteQuestions', {
              status: 1,
              questionId: question._id
            })">Upvote</v-btn>
          <v-flex column>
            <span class="subheadline"> {{
              this.question.votes.filter(vote => vote.status == 1).length - this.question.votes.filter(vote => vote.status == -1).length
              }} </span>
            <span class="subheadline"> Votes </span>
          </v-flex>
          <v-btn
            v-if="isLogin"
            flat color="blue"
            @click="$store.dispatch('voteQuestions', {
              status: -1,
              questionId: question._id
            })"
            >Downvote</v-btn>
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
          <v-btn flat color="blue" @click="goToPage('questions-page', question._id)">{{question.title}}</v-btn>
          <p>{{question.description}}</p>
          <v-layout>
          <v-btn flat color="blue">Tags 1</v-btn>
          <v-btn flat color="blue">Tags 2</v-btn>
          <v-btn flat color="blue">Tags 3</v-btn>
        </v-layout>
        </v-flex>
      </v-layout>
      <v-layout col align-end justify-end>
        <v-layout row align-end justify-end>
          <v-btn flat color="blue">{{question.created_at}}</v-btn>
        </v-layout>
        <v-layout row align-end justify-end>
          <div v-if="user">
            <div v-if="question.userId">
              <EditQuestion
                v-if="user._id.toString() === question.userId.toString()"
                :question="updated"
                v-model="updated"/>
              <RemoveQuestion
                v-if="user._id.toString() === question.userId.toString()"
                :question="updated"
                v-model="updated"/>
            </div>
          </div>
        </v-layout>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>

import EditQuestion from '@/components/editQuestion'
import RemoveQuestion from '@/components/deleteQuestion'

export default {
  props: ['question'],
  components: {
    EditQuestion,
    RemoveQuestion
  },
  data () {
    return {
      updated: ''
    }
  },
  methods: {
    goToPage (pageName, paramsId) {
      this.$router.push({ name: pageName, params: { id: paramsId } })
    }
  },
  watch: {
    question (val) {
      if (val !== this.updated) {
        this.updated = val
      }
    }
  },
  created () {
    this.updated = this.question
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    user () {
      return this.$store.state.user
    }
  }
}
</script>
