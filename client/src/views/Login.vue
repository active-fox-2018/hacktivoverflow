<template>
  <div class="container d-flex flex-column bd-highlight mb-3">
    <div class="row d-flex justify-content-center">
    </div>
    <div class="row d-flex justify-content-center login">
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="https://img.freepik.com/free-photo/overflowing-water-glass-dark-background_23-2147608450.jpg?size=338&ext=jpg" class="card-img">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Log In</h5>
              <form @submit.prevent="login()">
                <div class="container">
                  <div class="row">
                    <input v-model="email" type="email" placeholder="email">
                  </div>
                  <div class="row">
                    <input v-model="password" type="password" placeholder="password">
                  </div>
                  <div class="row">
                    <button class="button" type="submit">Log In</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alertify from "alertifyjs";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", data).then(_ => {
        if (_ !== true) {
          _.data.forEach(element => {
            alertify.error(`${element}`);
          });
        } else {
          this.email = "";
          this.password = "";
          this.$store.dispatch('checkLoginStatus')
        }
      });
    }
  }
};
</script>

<style>
</style>
