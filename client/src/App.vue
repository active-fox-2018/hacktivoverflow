<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import api from '@/api/index.js'
export default {
  components: {
    Navbar
  },
  methods: {

  },
  created () {
    this.$store.dispatch('checkLoginStatus')
    this.$store.dispatch('fetchQuestions')
    this.$store.dispatch('fetchUserQuestions')
  }
}
</script>


<style>
  body {
    background: white;
  }
</style>
