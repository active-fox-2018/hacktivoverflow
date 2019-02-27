<template>
<v-card class="pa-2">
      <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="blue"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="title"
      :rules="titleRules"
      label="Title"
      required
    ></v-text-field>
    <v-combobox
       v-if="$route.name !== 'question' && $route.name !== 'editAnswer'"
    v-model="chips"
    :items="items"
    label="tags"
    chips
    clearable
    prepend-icon="filter_list"
    solo
    multiple
    flat
  >
    <template slot="selection" slot-scope="data">
      <v-chip
        :selected="data.selected"
        close
        @input="remove(data.item)"
      >
        <strong>{{ data.item }}</strong>&nbsp;
      </v-chip>
    </template>
  </v-combobox>
    <wysiwyg v-model="description"/>
    <v-btn
      color="blue-grey lighten-4"
      @click="createQuestion"
      v-if="$route.path === '/ask_question'"
      class="mt-4"
    >
      Ask Question
      
    </v-btn>

    <v-btn
      color="blue-grey lighten-4"
      v-if="$route.name == 'question'"
      class="mt-4"
      @click="createAnswer"
    >
      Answer Question
    </v-btn>

    <v-btn
      color="blue-grey lighten-4"
      v-if="$route.name == 'editQuestion'"
      class="mt-4"
      @click="editQuestion"
    >
      Edit Question
    </v-btn>
        <v-btn
      color="blue-grey lighten-4"
      v-if="$route.name == 'editAnswer'"
      class="mt-4"
      @click="editAnswer"
    >
      Edit Answer
    </v-btn>
  </v-form>
</v-card>
</template>

<script>
import axios from 'axios'
export default {
  name: 'formBox',
  created() {
    if(this.$route.name == 'editQuestion') {
      axios({
        method: 'get',
        url: `${this.$store.state.serverUrl}/questions/${this.$route.params.id}`
      })
      .then(({data}) => {
        this.title = data.question.title
        this.description = data.question.description
        this.chips = data.question.Tags
      })
      .catch(err => {
        console.log(err, '=======')
        this.$router.push('/')

      })
    } else if (this.$route.name == 'editAnswer') {
      console.log('===')
      axios({
        method: 'get',
        url: `${this.$store.state.serverUrl}/answers/${this.$route.params.id}`
      })
      .then(({data}) => {
        this.title = data.answer.title
        this.description = data.answer.description
        this.chips = data.answer.Tags
      })
      .catch(err => {
        console.log(err)
        this.$router.push('/')
      })
    }
  },
  data () {
    return {
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required'
      ],
      checkbox: false,
      description: '',
      chips: [],
      items: [],
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      text: ''
    }
  },

  methods: {
    createQuestion () {
      axios({
        method: 'post',
        url: `${this.$store.state.serverUrl}/questions`,
        data: {
          title: this.title,
          description: this.description,
          tags: this.chips
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$store.dispatch('getAllQuestions')
        this.text = 'Thank you for asking.'
        this.snackbar = true
        this.$router.push('/')

      })
      .catch(err => {
        console.log(err)
        if(err.response.status !== 500) {
          this.text = 'Sorry you have to login first.'
          this.snackbar = true
          this.$router.push('/login')
        }
      })

    },
    remove (item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
    createAnswer() {
       axios({
        method: 'post',
        url: `${this.$store.state.serverUrl}/answers`,
        data: {
          title: this.title,
          description: this.description,
          questionId: this.$route.params.questionId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        this.$store.dispatch('getAllQuestions')
        this.text = 'Thank you for sharing.'
        this.snackbar = true
        this.title = ''
        this.description = ''
        this.$emit('reload')

      })
      .catch(err => {
        if(err.response.status !== 500) {
          this.text = 'Sorry you have to login first.'
          this.snackbar = true
        } 
      })
    },
    editQuestion() {
      axios({
        method: 'put',
        url: `${this.$store.state.serverUrl}/questions/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
            title: this.title,
            description: this.description,
            tags: this.chips
          }
      })
      .then(({data}) => {
        this.$store.dispatch('getAllQuestions')
        this.text = 'Thank you for sharing.'
        this.snackbar = true
        this.title = ''
        this.description = ''
        this.$emit('reload')
        this.$router.push(`/question/${data.question._id}`)
      })
      .catch(err => {
          if(err.response.status !== 500) {
          this.text = 'Sorry you have to login first.'
          this.snackbar = true
        } else {
          this.text = 'Sorry we have server problem.'
          this.snackbar = true
        }
      })
    },
    editAnswer() {
       axios({
        method: 'put',
        url: `${this.$store.state.serverUrl}/answers/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
            title: this.title,
            description: this.description
          }
      })
      .then(({data}) => {
        this.$store.dispatch('getAllQuestions')
        this.title = ''
        this.description = ''
        this.$emit('reload')
        this.$router.push(`/question/${data.answer.QuestionId}`)
      })
      .catch(err => {
          if(err.response.status !== 500) {
          this.text = 'Sorry you have to login first.'
          this.snackbar = true
        } else {
          this.text = 'Sorry we have server problem.'
          this.snackbar = true
        }
      })
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
