<template>
  <div class="container">
    <h3>Ask a question</h3>
    <div class="row">
      <div class="col-8">
        <form>
          <div class="form-group">
            <label><strong>Title</strong></label>
            <input type="email" class="form-control" placeholder="What's your programming question? Be Specific">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1"><strong>Question Details</strong></label>
            <input type="text" class="form-control">
          </div>
          <div>
            <label for="exampleInputPassword1"><strong>Tags</strong></label>
            <input type="text" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Post Your Question</button>
        </form>
      </div>
      <div class="col-4">
        <div class="card text-white bg-warning mb-3" style="max-width: 18rem;">
          <div class="card-header">How to Ask</div>
          <div class="card-body">
            <p>Is your question about programming?</p>
            <p>We prefer questions that can be answered, not just discussed.</p>
            <p>Provide details. Share your research.</p>
            <p>If your question is about this website, ask it on meta instead.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data () {
    return {
      title: '',
      description: '',
      tags: [],
      tag: ''
    }
  },
  components: {
  },
  methods: {
    postQuestion () {
      let data = {

      }
      this.$store.dispatch('postQuestion', data)
    }
  }
}
</script>

<style>

</style>
