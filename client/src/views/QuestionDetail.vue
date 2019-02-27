<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h5>{{question.title}}</h5>
        <q-separator inset />
      </div>
      <div class="col-1 column item-center">
        <q-icon @click="voteQuestion(question._id, 1)" style="cursor:pointer" name="fas fa-caret-up fa-4x"></q-icon>
        <button style="color:black;border:none;width:35px" class="text-h5">{{question.upvotes.length - question.downvotes.length}}</button>
        <q-icon @click="voteQuestion(question._id, -1)" style="cursor:pointer" name="fas fa-caret-down fa-4x"></q-icon>
      </div>

      <div v-html="question.description" class="col-11">
        {{question.description}}
      </div>

      <div v-for="(tag, index) in question.tags" :key="index">
        <Chip :text="tag"></Chip>
      </div>
      <br>
    </div>

    <div class="text-grey-8 q-gutter-xs row justify-end">
      <div class="col-1">
        <q-btn @click="deleteQuestion" class="gt-xs col" size="10px" flat dense round icon="fa fa-trash-alt">
          <Tooltip :text="'Delete'"></Tooltip>
        </q-btn>      
      </div>
      <div class="col-1">
          <q-btn @click="getPermission('Question', question)" class="gt-xs col" size="10px" flat dense round icon="fa fa-edit" >
            <Tooltip  :text="'Edit'"></Tooltip>
          </q-btn>      
      </div>
    </div>
    <q-dialog v-model="showEditForm" width="900px">
      <q-card >
        <q-card-section class="row items-center">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="fas fa-times" flat round dense v-close-dialog />
        </q-card-section>
          <Form @close-dialog="showEditForm = false" :formDetail="{questionId: question._id, title: question.title, description: question.description, tags: question.tags}" formTitle="Edit Question"></Form>
        <q-card-section>
        </q-card-section>
      </q-card>
    </q-dialog>

    <h5>Answer</h5>

    <q-separator inset/>
    <div class="row" v-for="(answer, index) in question.answers" :key="index">
      <div class="col-12">
        <h5>{{answer.title}}</h5>
      </div>
      <div class="col-1 column item-center">
        <q-icon @click="voteAnswer(answer, 1)" style="cursor:pointer" name="fas fa-caret-up fa-4x"></q-icon>
        <button style="color:black;border:none;width:35px" class="text-h5">{{answer.upvotes.length - answer.downvotes.length}}</button>
        <q-icon @click="voteAnswer(answer, -1)" style="cursor:pointer" name="fas fa-caret-down fa-4x"></q-icon>
      </div>

      <div v-html="answer.description" class="col-11">
        {{answer.description}}
      </div>
      <div>
        <q-btn @click="deleteAnswer(answer)" class="gt-xs col" size="10px" flat dense round icon="fa fa-trash-alt">
          <Tooltip :text="'Delete'"></Tooltip>
        </q-btn>
      </div>
    </div>
    <q-separator inset/>
    <Form :formTitle="`Answer`" :questionId="question._id" ></Form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Chip from '../components/Chip.vue'
import Form from '../components/Form.vue'
import Tooltip from '../components/Tooltip.vue'

export default {
  name: 'QuestionDetail',
  data () {
    return {
      showEditForm: false,
      showEditFormAnswer: false
    }
  },
  components: {
    Chip,
    Form,
    Tooltip
  },
  computed: {
    ...mapState([
      'question'
    ])
  },
  created() {
    this.$store.dispatch('findQuestion', (this.$router.currentRoute.params.questionId))
  },
  methods: {
    voteQuestion (questionId, vote) {
      let isVoted = false
      this.question.upvotes.forEach(vote => {
        if (vote === localStorage.getItem('userId')) {
          isVoted = true
        }
      })
      this.question.downvotes.forEach(vote => {
        if (vote === localStorage.getItem('userId')) {
          isVoted = true
        }
      })
      if (isVoted) {
        this.$q.notify({color: 'negative', message: "Sorry, you can only vote once", position: 'top'})
      } else {
        this.$store.dispatch('voteQuestion', {questionId: questionId, vote: vote})
      }
    },
    voteAnswer (answer, vote) {
      let isVoted = false
      answer.upvotes.forEach(vote => {
        if (vote === localStorage.getItem('userId')) {
          isVoted = true
        }
      })
      answer.downvotes.forEach(vote => {
        if (vote === localStorage.getItem('userId')) {
          isVoted = true
        }
      })
      if (isVoted) {
        this.$q.notify({color: 'negative', message: "Sorry, you can only vote once", position: 'top'})
      } else {
        this.$store.dispatch('voteAnswer', {answerId: answer._id, vote: vote, questionId: this.question._id})
      }
    },
    deleteQuestion (data) {
      if (localStorage.getItem('userId') === this.question.user) {
        this.$store.dispatch('deleteQuestion', {questionId: this.question._id})
        this.$router.push({path: '/questions'})
      } else {
        this.$q.notify({color: 'negative', message: "Sorry, you are not authorized to delete this question", position: 'top'})
      }
    },
    deleteAnswer (answer) {
      if (localStorage.getItem('userId') === answer.user) {
        this.$store.dispatch('deleteAnswer', {answerId: answer._id, questionId: this.question._id})
        this.$router.push({path: `/detail/${this.questionId}`})
      } else {
        this.$q.notify({color: 'negative', message: "Sorry, you are not authorized to delete this answer", position: 'top'})
      }
    },
    getPermission (type, data) {
      if (localStorage.getItem('userId') === data.user) {
        if (type === 'Question') {
          this.showEditForm = true
        } else {
          this.showEditFormAnswer =  true
        }
      } else {
        this.$q.notify({color: 'negative', message: "Sorry, you are not authorized to edit this question", position: 'top'})
      }
    },
  }
}
</script>

<style>

</style>
