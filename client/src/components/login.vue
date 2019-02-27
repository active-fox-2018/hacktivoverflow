<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Login</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Login User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Email" required v-model="email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    email: '',
    password: ''
  }),
  methods: {
    login () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', payload)
      this.dialog = false
    },

    close () {
      this.email = ''
      this.password = ''
      this.dialog = false
    }
  }
}
</script>
