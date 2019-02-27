<template>
  <v-container>
    <form>
      <v-text-field
        v-validate="'required'"
        v-model="name"
        :error-messages="errors.collect('name')"
        label="Name"
        data-vv-name="name"
        required
      ></v-text-field>
      <v-text-field
        v-validate="'required|email'"
        v-model="email"
        :error-messages="errors.collect('email')"
        label="E-mail"
        data-vv-name="email"
        required
      ></v-text-field>
      <v-text-field
        v-validate="'required'"
        v-model="password"
        :error-messages="errors.collect('password')"
        label="Password"
        data-vv-name="password"
        type="password"
        required
      ></v-text-field>

      <v-btn @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </form>
  </v-container>
</template>
<script>
import Vue from "vue"
import VeeValidate from "vee-validate"
import api from '@/api/server.js'
import Swal from 'sweetalert2'

Vue.use(VeeValidate);

export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    name: "",
    email: "",
    password: "",
    dictionary: {
      attributes: {
        email: "E-mail Address"
      },
      custom: {
        name: {
          required: () => "Name can not be empty"
        },
        password: {
          required: () => "Password can not be empty"
        }
      }
    }
  }),
  mounted() {
    this.$validator.localize("en", this.dictionary);
  },
  methods: {
    submit () {
      this.$validator.validateAll()
        .then(valid => {
          if (valid) {
            let newUser = {
              name: this.name,
              email: this.email,
              password: this.password
            }
            api
              .post(`/register`, newUser)
              .then(({data}) => {
                Swal.fire({
                  type: 'success',
                  title: 'Register Successfully',
                  text: 'Please Login...'
                })
                this.$router.push({name: 'login'})
              })
              .catch(({response}) => {
                Swal.fire({
                  type: 'error',
                  title: response.data.err.email.message
                })
              })
          }
        })
    },
    clear() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.$validator.reset();
    }
  }
};
</script>