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
export default {
  name: 'app',
  components: {
    myNav
  },
  created () {
    this.$store.dispatch('getAllQuestions')
    if (localStorage.token) {
      this.$store.dispatch('getOneUser')
    }
  }
}
</script>
