<template>
  <div class="container">
    <div v-for="(question, index) in questions" :key="index">
      <div class="row">
        <div class="col-4 align-self-center">
          <div class="row">
            <div class="col d-flex justify-content-center" style="font-size:12px">{{question.votes}}</div>
            <div class="col d-flex justify-content-center" style="font-size:12px">{{question.answerId.length}}</div>
            <!-- <div class="col d-flex justify-content-center" style="font-size:12px">0</div> -->
          </div>
          <div class="row">
            <div class="col d-flex justify-content-center" style="font-size:12px">votes</div>
            <div class="col d-flex justify-content-center" style="font-size:12px">answers</div>
            <!-- <div class="col d-flex justify-content-center" style="font-size:12px">views</div> -->
          </div>
        </div>
        <div class="col-8 align-self-center">
          <div v-if="$route.name == 'myQuestions'" class="row mb-1">
            <router-link :to="`/edit-question/${question._id}`">
              <button class="mr-2">Edit</button>
            </router-link>
              <button @click="deleteQuestion(question._id)">Delete</button>
          </div>
          <div class="row">
            <router-link :to="`/question-detail/${question._id}`">
              <h5>{{question.title}}</h5>
            </router-link>
          </div>
          <div class="row">
              <div v-for="(tag, index) in question.tags" :key="index">
                <router-link :to="`/questions/tag/${tag}`">
                  <button @click="tagged(tag)" type="button" class="tag mr-1 mb-2">
                    {{tag}}
                  </button>
                </router-link>
              </div>
          </div>
          <div class="row"><p style="font-size:10px">{{question.stringDate}}, {{question.stringTime}}</p></div>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import alertify from 'alertifyjs'

export default {
  props: ['questions'],
  methods: {
    async deleteQuestion (questionId) {
      try {
        let data = await api.delete(`/questions/${questionId}`, {headers: {token: localStorage.token}})
        alertify.success('You delete this article')
        if(data.data) {
          this.$store.commit('mutateDeleteQuestion', data.data)
        }
      } catch (error) {
        alertify.error('Failed delete article. Please try again')
      }
    },
    tagged (tag) {
      this.$store.dispatch('tagged', tag)
    }
  }
}
</script>

<style>

</style>
