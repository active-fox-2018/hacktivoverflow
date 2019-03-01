<template>
  <nav class="navbar navbar-success bg-success">
    <router-link class="navbar-brand" to="/">Hacktiv-Overflow</router-link>
    <form class="form-inline" @submit.prevent="searchTag">
      <input class="form-control mr-sm-2" type="search" placeholder="Search by tag" aria-label="Search" v-model="tag"> 
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
import search from '@/components/searchpage'
export default {
    components : {
      search 
    },
    name : 'navbar',
    data () {
      return {
        tag : ''
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
      },
      searchTag() {
        this.$router.push({path :`/search/${this.tag}`})
      }
    }
}
</script>
