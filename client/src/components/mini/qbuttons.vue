<template>
  <div class="btn-group">
    <vs-button disabled color="#197278" type="line">
      <h5>{{ votes }}</h5>
      <h6>Votes</h6>
    </vs-button>&ensp;&ensp;&ensp;
    <vs-button disabled color="#464655" type="line">
      <h5>{{ theAnswers.length }}</h5>
      <h6>Answers</h6>
    </vs-button>&ensp;
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['ques'],
  name: 'qbuttons',
  created() {
    // this.$store.dispatch('getQues', ques)
    this.$store.dispatch('getAnswersbytheQuestion', this.ques)
  },
  data() {
    return {
      votes: this.ques.upvotes.length - this.ques.downvotes.length,
    }
  },
  computed: {
    ...mapState({
      // theQuestions: state => state.theQuestions,
      theAnswers: state => state.theAnswers,
    })
  },
  watch: {
    votes() {
      console.log(this.ques, '=== watch')
      return this.ques.upvotes.length - this.ques.downvotes.length
    }
  }
}
</script>

<style>
.btn-group {
  float: left;
}
</style>
