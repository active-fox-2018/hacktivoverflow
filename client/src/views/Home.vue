<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-9">
          <div class="row">
            <div class="col">Top Question</div>
            <div class="col d-flex justify-content-end">
              <router-link to="/question">
                <button>Ask Question</button>
              </router-link>
            </div>
          </div>
          <div class="row d-flex justify-content-end">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="">Left</button>
              <button type="button" class="">Middle</button>
              <button type="button" class="">Right</button>
            </div>
          </div>
          <hr>
          <div class="row">
            <Question-Card></Question-Card>
          </div>
        </div>
        <div class="col-3">
          <div class="watch-tags">
            Watch Tags Here
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'
export default {
  components: {
    QuestionCard
  }
}
</script>

<style>

</style>
