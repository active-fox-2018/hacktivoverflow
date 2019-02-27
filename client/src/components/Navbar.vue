<template>
  <nav class="navbar sticky-top">
    <div class="container">
      <div class="row container">
        <div class="col-3">
          <router-link to="/" style="text-decoration:none">
            <h2>The Overflow</h2>
          </router-link>
        </div>
        <div class="col-6">
          <form>
            <input type="text" placeholder="search..." style="width:100%">
          </form>
        </div>
        <div class="col-3">
          <router-link to="/login">
            <button v-if="this.isLogin == false">Log In</button>
          </router-link>
          <router-link to="/register">
            <button v-if="this.isLogin == false">Sign Up</button>
          </router-link>
          <router-link to="/my-questions">
            <button v-if="this.isLogin == true">My</button>
          </router-link>
            <button @click="logout()" v-if="this.isLogin == true">Log Out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from "vuex"
import alertify from 'alertifyjs'

export default {
  data () {
    return {

    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('mutateIsLogin', false)
      this.$store.commit('mutateWatchTags', [])
      this.$router.push('/')
      alertify.success('Thank You, Have a nice day!')
    }
  },
  computed: mapState(['isLogin']),
  created () {
    this.$store.dispatch('checkLoginStatus')
  }
};
</script>

<style>

</style>
