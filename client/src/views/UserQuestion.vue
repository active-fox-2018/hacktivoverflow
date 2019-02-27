<template>
  <div class="container">
    <div v-if="questions.length > 0">
      <h1>Your Questions List</h1>
      <QuestionCard :questions="questions"></QuestionCard>
    </div>
    <div v-else class="mt-4">
      <div class="row d-flex justify-content-center">
        <h3>You Dont Have Any Questions Now!</h3>
      </div>
      <div class="row d-flex justify-content-center">
        <img src="https://www.incimages.com/uploaded_files/image/970x450/shutterstock_535555195_352748.jpg" style="width:50%; height:50%;">
      </div>
      <div class="row d-flex justify-content-center">
        <h3>Start Asking If You Have Any Question</h3>
      </div>
      <div class="row d-flex justify-content-center">
        <router-link to="/question">
          <button class="button" style="width:500px; height:100px;font-size:50px;">Ask Question</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard'
export default {
  data () {
    return {
    }
  },
  components: {
    QuestionCard
  },
  computed: {
    questions () {
      return this.$store.state.userQuestions
    }
  }
}
</script>

<style>

</style>
