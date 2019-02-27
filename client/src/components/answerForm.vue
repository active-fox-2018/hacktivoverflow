<template>
    <div style="background-color: white;" class="p-2 mt-5 ml-3 mb-5 row mr-4">
        <form @submit.prevent="answer" style="width: 100%;">
            <h3>
                Your answer:
            </h3>
             <md-field>
                <label>Title</label>
                <md-input class="input-login " v-model="title"></md-input>
            </md-field>
            <wysiwyg v-model="description" />
            <md-button type="submit" class="md-raised float-right" style="background-color: #efefef">answer</md-button>
        </form>
    </div>
</template>

<script>
import api from '@/api/my.js'
import alertify from 'alertifyjs'

export default {
  name: 'answerForm',
  data () {
    return {
      ques: {},
      answers: 0,
      description: '',
      title: ''
    }
  },
  methods: {
    upAnsw (id) {
      api({
        method: 'put',
        url: `/answers/${id}/up`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.getAnswer()
        })
        .catch(err => {
          console.log(err.response)
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Oopss something went wrong!`)
          }
        })
    },
    downAnsw (id) {
      api({
        method: 'put',
        url: `/answers/${id}/down`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.getAnswer()
        })
        .catch(err => {
          console.log(err.response)
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Oopss something went wrong!`)
          }
        })
    },
    answer () {
      api({
        method: 'post',
        url: `/answers/${this.$route.params.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          title: this.title,
          description: this.description
        }
      })
        .then(({ data }) => {
          this.title = ''
          this.description = ''
          this.$emit('answer', data)
        })
        .catch(err => {
          console.log(err.response)
          if (err.response.data.msg) {
            alertify.error(`${err.response.data.msg}`)
          } else {
            alertify.error(`Oopss something went wrong!`)
          }
        })
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
