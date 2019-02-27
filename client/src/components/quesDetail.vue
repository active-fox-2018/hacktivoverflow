<template>
<div>
    <div class="mt-5 ml-5 row mr-4" style="overflow-y: scroll; height: 100vh;">
        <div class="col-1  click-able">
               <h2 class="row">
                    <i @click="upvotesQ" class="fas fa-sort-up"></i>
               </h2>
               <h4 class="row" v-if="ques.upvotes && ques.downvotes">
                   {{ ques.upvotes.length - ques.downvotes.length }}
               </h4>
               <h2 class="row">
                   <i @click="downvotesQ" class="fas fa-sort-down"></i>
               </h2>
        </div>
        <div class="col">
            <div class="row">
                <h2 class="col">
                    {{ ques.title }}
                </h2>
                <div class="col-2 ml-5 text-right" v-if="user && ques.user">
                  <router-link style="color: black;" :to="{ name: 'editQues', params: { id: ques._id}}">
                    <i v-if="user._id === ques.user._id" class="click-able material-icons mx-3">edit</i>
                  </router-link>
                    <i v-if="user._id === ques.user._id" @click="deleteQues" class="click-able material-icons mx-3"> delete </i>
                </div>
            </div>
            <div class="row">
                <md-button style="background-color: rgb(236,241,243); max-height: 3vh" v-for="(tag, j) in ques.tags" :key="j" class="md-dense md-raised">{{ tag }}</md-button>
            </div>
            <hr>
            <div class="row" v-html="ques.description">
            </div>
            <div class="row text-right">
                <div class="col" style="color: grey;" v-if="ques.user">
                    asked by {{ ques.user.name }}
                    {{ new Date(ques.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}
                    {{ new Date(ques.createdAt).toLocaleTimeString()}}
                </div>
            </div>
        </div>
    </div>
    <div v-if="answers.length !== 0" class=" mt-5 ml-5 row mr-4">
        <h1>
            {{ answers.length }} Answers
        </h1>
    </div>
    <hr>
    <div v-if="answers.length !== 0">
        <div class=" mt-5 ml-5 row mr-4"  v-for="(ans, i) in answers" :key="i">
            <div class="col-1">
                <h2 class="row">
                    <i @click="upAnsw(ans._id)" class="fas fa-sort-up click-able"></i>
                </h2>
                <h4 class="row">
                    {{ ans.upvotes.length - ans.downvotes.length }}
                </h4>
                <h2 class="row">
                    <i @click="downAnsw(ans._id)" class="fas fa-sort-down click-able"></i>
                </h2>
            </div>
            <div class="col" style="overflow-y: scroll; height: 50vh;">
              <div class="row">
                <h2 class="col">
                    {{ ans.title }}
                </h2>
                <div class="col-2 ml-5 text-right" v-if="user && ans.user">
                  <router-link style="color: black;" :to="{ name: 'editAns', params: { id: ans._id}}">
                    <i v-if="user._id === ans.user._id" class="click-able material-icons mx-3">edit</i>
                  </router-link>
                    <i v-if="user._id === ans.user._id" @click="deleteAns(ans._id, i)" class="click-able material-icons mx-3"> delete </i>
                </div>
              </div>
                <hr>
                <div class="row" v-html="ans.description">
                </div>
                <div class="row text-right">
                    <div class="col" style="color: grey;">
                        answer by {{ ans.user.name }}
                        {{ new Date(ans.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}
                        {{ new Date(ans.createdAt).toLocaleTimeString()}}
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- FORM ANSWER -->
    <answerForm @answer="pushAnsw" />
</div>
</template>

<script>
import api from '@/api/my.js'
import alertify from 'alertifyjs'
import swal from 'sweetalert'
import { mapState } from 'vuex'
import answerForm from '@/components/answerForm.vue'

export default {
  name: 'quesDetail',
  components: {
    answerForm
  },
  data () {
    return {
      ques: {},
      answers: 0,
      description: '',
      title: ''
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    fetch () {
      this.$store.dispatch('getOneQuestion', this.$route.params.id)
        .then(_ => {
          if (_ !== false) {
            this.ques = _
          }
        })
    },
    upvotesQ () {
      api({
        method: 'put',
        url: `/questions/${this.$route.params.id}/up`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.ques = data
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
    downvotesQ () {
      api({
        method: 'put',
        url: `/questions/${this.$route.params.id}/down`,
        headers: {
          token: localStorage.token
        }
      })
        .then(({ data }) => {
          this.ques = data
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
    getAnswer () {
      api({
        method: 'get',
        url: `/answers/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.answers = data
        //   console.log(data)
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
    deleteQues () {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this question",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          api({
            method: 'delete',
            url: `/questions/${this.$route.params.id}`,
            headers: {
              token: localStorage.token
            }
          })
            .then(data => {
              this.$router.push({ name: 'home'})
            })
            .catch(err => {
              if (err.response.data.msg) {
                alertify.error(`${err.response.data.msg}`)
              } else {
                alertify.error(`Ooopss something went wrong!`)
              }
            })
        }
      })
    },
    pushAnsw (data) {
      this.answers.unshift(data)
    },
    deleteAns (id, i) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            api({
              method: 'delete',
              url: `/answers/${id}`,
              headers: {
                token: localStorage.token
              }
            })
              .then(({ data }) => {
                this.answers.splice(i, 1)
                alertify.success(`Success delete answer`)
              })
              .catch(err => {
                console.log(err.response)
              })
        }
      });
    
    }
  },
  watch: {
    '$route' (to, from) {
      this.fetch()
      this.getAnswer()
    }
  },
  created () {
    this.fetch()
    this.getAnswer()
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
