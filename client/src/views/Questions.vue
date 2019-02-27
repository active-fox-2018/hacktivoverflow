<template>
  <List :questions="questions"></List>
</template>

<script>
import { mapState } from 'vuex'
import List from '../components/List.vue'

export default {
  name: 'Questions',
  components: {
    List
  },
  created () {
    this.$store.dispatch('fetchQuestions')
  },
  computed: {
    ...mapState([
      'questions'
    ])
  }

}
</script>

<style>

</style>
