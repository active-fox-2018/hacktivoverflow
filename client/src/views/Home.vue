<template>
  <div class="home row">
    <div class="col-2 left-bar">
    </div>
    <div class="col ">
      <questionList v-if="$route.name !== 'quesDetail'"/>
      <quesDetail v-else />
    </div>
    <div class="col-3 right-bar mt-3 mr-4" v-if="$route.name !== 'quesDetail'">
      <watchedTag v-if="user"/>
      <githubJobs />
    </div>
  </div>
</template>

<script>
import questionList from '@/components/questionCard.vue'
import quesDetail from '@/components/quesDetail.vue'
import watchedTag from '@/components/watchedTag.vue'
import githubJobs from '@/components/githubJob.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    questionList,
    quesDetail,
    watchedTag,
    githubJobs
  },
  created () {
    this.$store.dispatch('getAllQuestions')
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
