<template>
  <List :questions="topQuestions"></List>
</template>

<script>
import { mapState } from 'vuex'
import List from '../components/List.vue'

export default {
  name: 'topQuestions',
  created () {
    this.$store.dispatch('fetchTopQuestions')
  },
  computed: {
    ...mapState([
      'topQuestions'
    ])
  },
  components: {
    List
  }
}
</script>

<style>

</style>
