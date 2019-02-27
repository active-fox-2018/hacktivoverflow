<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-8">
          <div class="row mb-2">
            <div class="col">
              <h5>Top Question</h5>
            </div>
            <div class="col d-flex justify-content-end">
              <router-link to="/question">
                <button class="button">Ask Question</button>
              </router-link>
            </div>
          </div>
          <div class="row ">
            <div class="btn-group container d-flex justify-content-end" role="group" aria-label="Basic example">
              <!-- <button type="button" class="button">Left</button>
              <button type="button" class="button">Middle</button>
              <button type="button" class="button">Right</button> -->
            </div>
          </div>
          <hr>
          <div class="row">
            <Question-Card :questions="questions"></Question-Card>
          </div>
        </div>
        <div class="col-4 fixed">
          <Watch-Tags></Watch-Tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
import WatchTags from '@/components/WatchTags.vue'
export default {
  components: {
    QuestionCard,
    WatchTags
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  },
}
</script>

<style>

</style>
