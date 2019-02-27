<template>
  <div id="app">
    <myNav />
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
import myNav from '@/components/navBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    myNav
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.$store.dispatch('getAllQuestions')
    this.$store.dispatch('getJobs')
    if (localStorage.token) {
      this.$store.dispatch('getOneUser')
    }
  },
  watch: {
    user (val) {
      if (val) {
        if (val.tags.length !== 0) {
          this.$store.dispatch('getJobs', val.tags[0])
        }
      }
    }
  }
}
</script>
