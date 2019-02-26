<template>
  <div class="home row">
    <div class="col-2 left-bar">
      smdkmdmfmo
    </div>
    <div class="col ">
      <questionList v-if="$route.name !== 'quesDetail'"/>
      <quesDetail v-else />
    </div>
    <div class="col-3 right-bar mt-3 mr-4" v-if="$route.name !== 'quesDetail'">
      <watchedTag />
      <div class="row border border-dark watched-tag mt-4">
          github job
      </div>
    </div>
  </div>
</template>

<script>
import questionList from '@/components/questionCard.vue'
import quesDetail from '@/components/quesDetail.vue'
import watchedTag from '@/components/watchedTag.vue'
export default {
  name: 'home',
  components: {
    questionList,
    quesDetail,
    watchedTag
  },
  created () {
    this.$store.dispatch('getAllQuestions')
  }
}
</script>
