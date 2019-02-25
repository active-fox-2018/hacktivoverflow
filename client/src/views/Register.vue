<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <h1>Register</h1>
    </div>
    <div class="row d-flex justify-content-center">
      <form @submit.prevent="register()">
        <div class="container">
          <div class="row">
            <input v-model="name" type="text" placeholder="name">
          </div>
          <div class="row">
            <input v-model="email" type="email" placeholder="email">
          </div>
          <div class="row">
            <input v-model="password" type="password" placeholder="password">
          </div>
          <div class="row">
            <button type="submit">Register Now</button>
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
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', data)
      this.name = ''
      this.email = ''
      this.password = ''

      // this.$store.dispatch('register')
    }
  },
  // computed: {
  //   name () {
  //     return this.$store.state.formUser.name
  //   },
  //   email () {
  //     return this.$store.state.formUser.email
  //   },
  //   password () {
  //     return this.$store.state.formUser.password
  //   }
  // }
}
</script>

<style>

</style>
