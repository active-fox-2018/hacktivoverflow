<template>
  <div class="login">
    <form>
      <h1>Sign In</h1>
      <br><br>
      <fieldset>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          >
          <small
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="password"
          >
        </div>
        <br>
        <button type="submit" class="btn btn-primary" @click.prevent="login">login</button>
      </fieldset>
    </form>
  </div>
</template>

<script>

export default {
  name: 'login',
  created () {
    if (localStorage.getItem('token')) {
      this.$router.push({ path: '/' })
    }
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>
.login {
  width: 50%;
  margin: auto;
  padding: 30px;
  margin-top: 10%;
  background-color: whitesmoke;
}
</style>
