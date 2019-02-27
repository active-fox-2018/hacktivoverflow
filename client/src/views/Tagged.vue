<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col">
          <h3>Questions Tagged [{{$route.params.tag}}]</h3>
        </div>
        <div class="col">
          <button>Ask Question</button>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div v-if="tagged.length > 0">
            <Question-Card :questions="tagged"></Question-Card>
          </div>
          <div v-else class="mt-4">
            <h3>Sorry... No Results for this tags</h3>
          </div>
        </div>
        <div class="col-4">
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
    WatchTags,
  },
  computed: {
    tagged () {
      return this.$store.state.tagged
    }
  },
  created () {
    // this.getTags()
    // this.tagged()
    // console.log(this.tagged)
  }
}
</script>

<style>

</style>
