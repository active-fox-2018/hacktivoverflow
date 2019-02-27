<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 md12 lg8 >
        <v-card color="white" light>
          <v-card-title primary class="title">Questions</v-card-title>
          <v-flex class="pa-2" v-for="question in $store.state.questions" :key="question._id">
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
                   <v-chip @click.prevent="searchTag(tag)" outline color="primary" v-for="tag in question.Tags" :key="tag._id">{{tag}}</v-chip>
                </v-card-text>
              </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-card>
      </v-flex>
      <tagbox v-if="!$store.login"/>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import tagbox from '@/components/tagsbox.vue'
export default {
  created() {
    this.$store.dispatch('getAllQuestions')
  },
  name: 'mainbox',
  components: {
    tagbox
  },
  data () {
    return {

    }
  },
  methods: {
    searchTag(tag) {
      axios({
        method: 'get',
        url: `${this.$store.state.serverUrl}/search?search=${tag}`
      })
      .then(({data}) => {
        this.$store.state.questions = data
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
