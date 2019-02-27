<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <button @click="$router.push('/')">HACKTIVOVERFLOW</button>
    </v-toolbar-title>
    <v-spacer/>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="items"
      :search-input.sync="search"
      cache-items
      class="mx-3"
      flat
      hide-no-data
      hide-details
      label="Search..."
      solo-inverted
    ></v-autocomplete>
    <v-spacer/>
    <Login v-if="!isLogin"/>
    <Register v-if="!isLogin"/>
    <v-btn v-if="isLogin" @click="$store.commit('logout')">
      Log Out
    </v-btn>
  </v-toolbar>
</template>

<script>
import Login from '@/components/login'
import Register from '@/components/register'

export default {
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: null
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  components: {
    Login,
    Register
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },
  methods: {
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>
