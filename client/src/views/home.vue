<template>
  <v-content>
    <navbar/>
    <subnavbar/>
    <questioncards
      v-model="questions"
      v-for="question in questions"
      :key="question.id"
      :question="question"/>
  </v-content>
</template>

<script>
import Navbar from '@/components/navbar'
import Subnavbar from '@/components/subnavbar'
import Questioncards from '@/components/questionsCard'

export default {
  components: {
    Navbar,
    Subnavbar,
    Questioncards
  },
  data () {
    return {
    }
  },
  computed: {
    questions: {
      get () {
        return this.$store.state.questions
      },
      set (newValue) {
        return this.$store.state.questions
      }
    },
    token () {
      return this.$store.state.token
    }
  },
  created () {
    this.$store.dispatch('getQuestions')
  }
}

</script>
