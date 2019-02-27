<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Register</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Register User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                <v-text-field label="Name" required v-model="name"></v-text-field>
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
          <v-btn color="blue darken-1" flat @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

import hacktivOverflowApi from '@/api/hacktivOverflowApi.js'
import Swal from 'sweetalert2'

export default {
  data: () => ({
    dialog: false,
    name: '',
    email: '',
    password: ''
  }),
  methods: {
    register () {
      this.dialog = false
      hacktivOverflowApi
        .post('/users/register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          Swal.fire({
            position: 'bottom-end',
            type: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.name = ''
          this.email = ''
          this.password = ''
          this.dialog = false
        })
        .catch(error => {
          Swal.fire({
            position: 'bottom-end',
            type: 'error',
            title: error.response.data.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },

    close () {
      this.name = ''
      this.email = ''
      this.password = ''
      this.dialog = false
    }
  }
}

</script>
