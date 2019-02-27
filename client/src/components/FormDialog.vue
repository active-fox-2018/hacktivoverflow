<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card style="width:450px">
      <q-tabs
        v-model="tab"
        dense
        class="text-white bg-black"
        active-color="white"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="signin" label="Sign In" />
        <q-tab name="signup" label="Sign Up" />
        <q-btn flat round dense icon="fas fa-times" v-close-dialog @click="$emit('changestatus')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="signin">
          <div class="text-h6">Sign In</div>
          <q-separator></q-separator>
          <br>
          <label>Email</label>
          <q-input rounded outlined v-model="emailSignIn"/>
          <br>
          <label>Password</label>
          <q-input rounded outlined v-model="passwordSignIn" type="password"/>
          <br>
          <q-btn color="white" class="text-black" @click="signInUser()" label="Sign In" />
        </q-tab-panel>

        <q-tab-panel name="signup">
          <div class="text-h6">Sign Up</div>
          <q-separator></q-separator>
          <br>
          <label>Fullname</label>
          <q-input rounded outlined v-model="fullNameSignUp"/>
          <label>Username</label>
          <q-input rounded outlined v-model="usernameSignUp"/>
          <label>Email</label>
          <q-input rounded outlined v-model="emailSignUp"/>
          <br>
          <label>Password</label>
          <q-input rounded outlined v-model="passwordSignUp" type="password"/>
          <br>
          <q-btn color="white" class="text-black" @click="signUpUser()" label="Sign Up" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script>
import axios from 'axios'
let link = 'http://35.187.249.199'

export default {
  name: 'FormDialog',
  props: ['showDialog'],
  data () {
    return {
      tab: 'signin',
      emailSignIn: '',
      passwordSignIn: '',
      fullNameSignUp: '',
      usernameSignUp: '',
      emailSignUp: '',
      passwordSignUp: ''
    }
  },
  methods: {
    signInUser () {
      this.$store.dispatch('userSignIn', {email: this.emailSignIn, password: this.passwordSignIn})
      this.emailSignIn = ''
      this.passwordSignIn = ''
      this.showDialog = false
      this.$emit('close-dialog')
    },
    signUpUser() {
      this.$store.dispatch('userSignUp', {fullname: this.fullNameSignUp, username: this.usernameSignUp, email: this.emailSignUp, password: this.passwordSignUp})
      this.emailSignUp = ''
      this.passwordSignUp = ''
      this.fullNameSignUp = ''
      this.usernameSignUp = ''
    }
  }
}
</script>