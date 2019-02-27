<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#" @click.prevent="home">
      <img src="https://img.icons8.com/color/30/000000/cat-footprint.png">WOVERFLOW</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarColor02"
      aria-controls="navbarColor02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-if="isLogin">
          <a class="nav-link" @click.prevent="myQuestions">Ques</a>
        </li>
        <li class="nav-item" v-if="isLogin">
          <a class="nav-link" @click.prevent="myAnswers">Ans</a>
        </li>
      </ul>

      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control mr-sm-2"
          type="text"
          placeholder="Search"
          v-model="search"
          @keyup.enter="searchBy"
        >
      </form>

      <ul class="navbar-nav">
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click.prevent="register"
          v-if="!isLogin"
        >Register</button>
        &ensp;
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click.prevent="login"
          v-if="!isLogin"
        >Login</button>

        <button
          type="button"
          class="btn btn-outline-secondary"
          @click.prevent="logout"
          v-if="isLogin"
        >Logout</button>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar',
  created() {
    
  },
  data () {
    return {
      activeItem: 0,
      search: ''
    }
  },
  methods: {
    home () {
      this.$router.push({ path: '/' })
    },
    register () {
      this.$router.push({ path: '/register' })
    },
    login () {
      this.$router.push({ path: '/login' })
    },
    logout () {
      this.$store.dispatch('logout')
    },
    searchBy () {

    },
    myQuestions () {
      this.$router.push('/ques/me')
    },
    myAnswers () {

    }
  },
  computed: mapState(['isLogin']),
  watch: {}
}
</script>

<style>
.navbar {
  font-size: 16px;
}

.navbar-brand {
  font-size: 20px;
}

p {
  color: white;
}
</style>
