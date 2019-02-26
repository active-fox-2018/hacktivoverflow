<template>
    <div class="container login-form md-raised ">
        <form @submit.prevent="login" class="login-form-container md-raised rounded border">
          <md-field>
            <label style="color: black">Email</label>
            <md-input class="input-login" v-model="email" ></md-input>
          </md-field>

          <md-field>
            <label>Password</label>
            <md-input class="input-login" v-model="password" type="password"></md-input>
          </md-field>

          <md-dialog-actions>
            <md-button class="md-primary form-text mt-3" type="submit">Login</md-button>
          </md-dialog-actions>
        </form>
    </div>
</template>

<script>
import alertify from 'alertifyjs'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then( _ => {
          if (_ !== true) {
            alertify.error(`${_.data.msg}`)
          } else {
            this.$router.push({ name: 'home' })
          }
        })
        // .catch(err => {
        //   console.log(err.response)
        // })
    }
  }
}
</script>

<style>

</style>
