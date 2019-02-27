<template>
  <nav class="navbar navbar-success bg-success">
    <router-link class="navbar-brand" to="/">Hacktiv-Overflow</router-link>
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-light my-2 my-sm-0" type="submit">SEARCH</button>
    </form>
    <div>
    <router-link to="/signup"><button type="button" class="btn btn-light my-2 my-sm-0" style="margin:5px">SIGNUP</button></router-link> 
    <router-link v-if="!isLogin" to="/login"><button type="button" class="btn btn-light my-2 my-sm-0" style="margin:5px">LOGIN</button></router-link>
    <router-link v-if="isLogin" to="/login"><button type="button" class="btn btn-light my-2 my-sm-0" style="margin:5px" @click.prevent="logout">LOGOUT</button></router-link>
    </div>
  </nav>
</template>
<script>
export default {
    name : 'navbar',
    data () {
      return {
        // isLogin : false
      }
    },
    created () {
      this.$store.commit('cekLogin')
    },
    computed : {
      isLogin() {
        return this.$store.state.isLogin[0]
      }
    },
    methods : {
      logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$store.commit('logout')
      }
    }
}
</script>
