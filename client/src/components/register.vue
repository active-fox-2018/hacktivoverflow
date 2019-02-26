<template>
    <div>
        <div class="container login-form md-raised">
            <form @submit.prevent="register" class="login-form-container md-raised">
            <md-field>
                <label>Name</label>
                <md-input class="input-login" v-model="name" type="text"></md-input>
            </md-field>

            <md-field>
                <label style="color: black">Email</label>
                <md-input class="input-login" v-model="email" ></md-input>
            </md-field>

            <md-field>
                <label>Password</label>
                <md-input class="input-login" v-model="password" type="password"></md-input>
            </md-field>

            <h6>Birthday</h6>
            <md-field class="mt-0 pt-1">
                <md-datepicker class="input-login" v-model="birthday" />
            </md-field>

            <md-dialog-actions>
                <md-button class="md-primary form-text mt-3" type="submit">Register</md-button>
            </md-dialog-actions>
            </form>
        </div>
    </div>
</template>

<script>
import alertify from 'alertifyjs'

export default {
  name: 'register',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      birthday: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
        birthday: this.birthday
      })
        .then(_ => {
          if (_ !== true) {
            alertify.error(`${_.data.msg}`)
          } else {
            this.$router.push({
              name: 'home'
            })
          }
        })
    }
  }
}
</script>

<style>

</style>
