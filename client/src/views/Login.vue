<template>
  <div class="container d-flex flex-column bd-highlight mb-3">
    <div class="row d-flex justify-content-center">
      <h1>Login</h1>
    </div>
    <div class="row d-flex justify-content-center">
      <form @submit.prevent="login()">
        <div class="container">
          <div class="row">
            <input v-model="email" type="email" placeholder="email">
          </div>
          <div class="row">
            <input v-model="password" type="password" placeholder="password">
          </div>
          <div class="row">
            <button type="submit">Log In</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', data)
      this.email = ''
      this.password = ''
    }
  },
}
</script>

<style>

</style>
