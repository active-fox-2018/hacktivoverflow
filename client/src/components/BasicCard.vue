<template>
  <v-container py-1 my-1 px-0>
    <v-card>
      <v-layout>
        <v-flex xs1>
          <v-layout column class="text-xs-center">
            <v-flex xs6 mt-3>
              <p>{{votes}}</p>
              <p>votes</p>
            </v-flex>
            <v-flex xs6>
              <p>{{answers}}</p>
              <p>answers</p>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs11>
          <v-card-title>
            <router-link :to="{ name: 'questionDetail', params: { questionId: question._id }}" style="text-decoration:none">
              <span class="title">{{question.title}}</span>
            </router-link>
          </v-card-title>
          <v-card-text>
            <v-chip v-for="(tag, i) in question.tags" :key="i" color="orange" text-color="white" @click="tagClick(tag)">{{tag}}</v-chip>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ['question'],
  data() {
    return {
      votes: 0,
      answers: 0
    }
  },
  mounted() {
    this.getVotes(),
    this.getAnswers()
  },
  watch: {
    question() {
      this.getVotes(),
      this.getAnswers()
    }
  },
  methods: {
    getVotes() {
      let result = 0
      this.question.votes.forEach(vote => {
        if (vote.status === 'upvote') {
          result += 1
        } else {
          result -= 1
        }
        this.votes = result
      });
    },
    getAnswers() {
      this.answers = this.question.answers.length
    },
    tagClick(tag) {
      this.$router.push({name: 'home', query: {query: tag}})
    }
  },
}
</script>