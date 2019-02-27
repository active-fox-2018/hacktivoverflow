<template>
  <v-card class="elevation-12">
       <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="blue"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-toolbar dark color="primary">
      <v-toolbar-title v-if="!registerStatus">Login form</v-toolbar-title>
            <v-toolbar-title v-if="registerStatus">Register form</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field 
        label="Name"
        required
        v-if="registerStatus" prepend-icon="person" name="login" type="text" v-model="name" ></v-text-field>
        <v-text-field 
        :rules="emailRules"
        label="E-mail"
        required
        prepend-icon="email" name="login" type="text" v-model="email"></v-text-field>
        <v-text-field 
        :rules="passRule"
        required
        id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <a v-if="!registerStatus" @click.prevent="changeToRegister(true)">
      Don't Have an Account?
      </a>
      <a v-if="registerStatus" @click.prevent="changeToRegister(false)">
      Already have an account?
      </a>
      <v-spacer></v-spacer>
      <v-btn v-if="!registerStatus" color="primary" @click.prevent="userLogin">Login</v-btn>
         <v-btn v-if="registerStatus" color="primary" @click.prevent="userRegister">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from 'axios'
export default {
  props: ['registerStatus'],
  name: 'loginform',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      valid: true,
      name: '',
      passRule: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 20) || 'Password must be less than 20 characters',
        v => (v && v.length >= 5) || 'Password must be more than 5 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      snackbar: false,
      y: 'top',
      x: null,
      mode: '',
      text: ''
    }
  },
  methods: {
    changeToRegister(status) {
      this.$emit('registerStatus', status)
    },
    userLogin() {
      axios({
        method: 'post',
        url: `${this.$store.state.serverUrl}/login`,
        data: {
          email: this.email,
          password: this.password  
        }
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
         this.$store.commit('userAuthetication', {status: true, id: data.id})
        this.$router.push('/')
      })
      .catch(err => {
        console.log(err)
        if(err.response && err.response.status == 404) {
          this.text = 'email / password wrong'
        } else {
          this.text = 'Sorry, we have internal server error'
        }
        this.snackbar = true
      })
    },
    userRegister() {
      axios({
        method: 'post',
        url: `${this.$store.state.serverUrl}/register`,
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .then(({data}) => {
        console.log(data)
        this.text = 'your account is registered. please login.'
        this.snackbar = true
         this.$emit('registerStatus', false)

      })
      .catch(err => {
        console.log(err)
        this.text = 'Sorry we cannot register you'
        this.snackbar = true
      })
      console.log('userRegister invoke')
    }
  }
}
</script>

<style>

</style>
