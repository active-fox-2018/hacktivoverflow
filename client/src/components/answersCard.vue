<template>
  <v-card>
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex flexbox  align-center justify-center>
          <v-btn
            v-if="isLogin"
            flat color="blue"
            @click="$emit('vote', {
              status: 1,
              answerId: answer._id
            })">Upvote</v-btn>
          <v-flex column>
            <span class="subheadline"> {{
              this.answer.votes.filter(vote => vote.status == 1).length - this.answer.votes.filter(vote => vote.status == -1).length
              }} </span>
            <span class="subheadline"> Votes </span>
          </v-flex>
          <v-btn
            v-if="isLogin"
            flat color="blue"
            @click="$emit('vote', {
              status: -1,
              answerId: answer._id
            })"
            >Downvote</v-btn>
        </v-flex>
      </v-layout>
      <v-flex flexbox column>
        <p>{{answer.title}}</p>
        <p>{{answer.description}}</p>
      </v-flex>
      <EditAnswer
        v-if="user._id.toString() === answer.userId"
        :answer="answer"
        @edit-answer="($emit('edit-answer', $event))"/>
      <RemoveAnswer
        v-if="user._id.toString() === answer.userId"
        :answer="answer"
        @remove-answer="($emit('remove-answer', $event))"/>
      <v-layout row align-end justify-end>
        <v-btn flat color="blue">{{answer.created_at}}</v-btn>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>

import EditAnswer from '@/components/editAnswer'
import RemoveAnswer from '@/components/deleteAnswer'

export default {
  props: ['answer'],
  components: {
    EditAnswer,
    RemoveAnswer
  },
  data () {
    return {
    }
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
