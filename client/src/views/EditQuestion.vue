<template>
  <div class="container">
    <h3>Edit question</h3>
    <div class="row">
      <div class="col-8">
        <form @submit.prevent="updateQuestion()">
          <div class="form-group">
            <label><strong>Title</strong></label>
            <input v-model="title" type="text" class="form-control" placeholder="What's your programming question? Be Specific">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1"><strong>Question Details</strong></label>
            <wysiwyg v-model="description"/>
          </div>
          <form @submit.prevent="addTags">
              <label>Add Tags</label>
              <input v-model="tag" type="text" class="form-control">
              <small>press enter to add tag</small>
          </form>
          <div v-if="tags.length > 0">
            <button type="button" class="tag mr-1 mb-2" v-for="(tag, index) in tags" :key="index">
              <div class="row">
                <div class="col d-flex align-items-center">{{tag}} <span @click="removeTag(tag)" class="ml-2" style="color:red">&times;</span></div>
              </div>
            </button>
          </div>
          <button type="submit" class="btn btn-primary">Update Question</button>
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
import alertify from 'alertifyjs'
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
    updateQuestion () {
      api({
        url: `questions/${this.$route.params.id}`,
        method: 'put',
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.title,
          description: this.description,
          tags: this.tags
        }
      })
      .then(({ data }) => {
        console.log(data)
        this.$store.commit('mutateUpdateQuestions', data)
        this.$store.commit('mutateUpdateUserQuestions', data)
        this.$router.push('/my-questions')
      })
      .catch((err) => {
        console.log(err)
      });
    },
    addTags () {
      this.tags.push(this.tag)
      this.tag = ''
    },
    findQuestion () {
      api({
        url: `questions/${this.$route.params.id}`,
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
      .then(({ data }) => {
        this.title = data.title
        this.description = data.description
        this.tags = data.tags
      }).catch((err) => {
        console.log(err)
      });
    },
    removeTag (tag) {
      let newTags = this.tags.filter(el => {
        return el !== tag
      })
      this.tags = newTags
    }
  },
  created () {
    this.findQuestion ()
  }
}
</script>

<style>

</style>
