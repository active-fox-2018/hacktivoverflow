<template>
  <div id="signup">
   
    <!-- <div class="container">
      <div class="row"> -->
        <div class="col-9">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Register Form</h5>

              <form class="form-signup" @submit.prevent="register">
                <div class="form-label-group">
                   <label for="inputEmail">Full Name</label>
                  <input
                    type="text"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Full Name"
                    v-model="name"
                  >
                 
                </div>
                <div class="form-label-group">
                  <label for="inputName">Email</label>
                  <input
                    type="email"
                    id="inputName"
                    class="form-control"
                    placeholder="Email"
                    v-model="email"
                  >
                </div>

                <div class="form-label-group">
                  <label for="inputPassword">Password</label>
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                    v-model="password"
                  >
                </div><br>

                <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    <!-- </div>
  </div> -->
</template>

<script>
import axios from '@/api/server'
export default {
  name: "signup",
  data() {
      return {
          name : '',
          email : '',
          password : ''
      }
  },
  methods : {
    register() {
      this.$store.dispatch('register',  {
              name : this.name,
              email : this.email,
              password : this.password
          })
     
    }
  }
}
</script>
