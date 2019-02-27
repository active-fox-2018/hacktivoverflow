<template>
  <div>
    <!-- navbar -->
    <v-toolbar color="amber" app clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>

      <v-toolbar-items class="mr-3">
        <router-link to="/" style="text-decoration:none">
          <v-layout align-center justify-center fill-height>
            <v-btn flat>
              <span class="title mx-1">Obien&nbsp;
                <span class="font-weight-light">Overflow</span>
              </span>
            </v-btn>
          </v-layout>
        </router-link>
      </v-toolbar-items>

      <v-form @submit.prevent="search">
        <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search" v-model="query"></v-text-field>
      </v-form>
      <v-spacer></v-spacer>

      <div v-if="isLogin === false">
        <v-btn flat to="/login">Login</v-btn>
        <v-btn flat to="/register">Register</v-btn>
      </div>
      <v-btn flat v-if="isLogin === true" @click="logout">Logout</v-btn>
    </v-toolbar>

    <!-- sidebar -->
    <v-navigation-drawer v-model="drawer" fixed clipped class="grey lighten-4" app>
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs12>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
          </v-layout>

          <v-divider v-else-if="item.divider" :key="i" dark class="my-1"></v-divider>

          <v-list-tile class="mt-1" v-else :key="i" :to="item.path">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState([
    "isLogin"
    ]),
  data() {
    return {
      drawer: null,
      items: [
        { icon: "lightbulb_outline", text: "Home", path: "/" },
        { divider: true },
        { heading: "PUBLIC" },
        { icon: "add", text: "Create new question", path: "/questions/create" }
        // { divider: true },
        // { icon: 'archive', text: 'Tags', path:'/a' },
        // { icon: 'delete', text: 'Users', path:'/a' },
      ],
      query: ''
    };
  },
  mounted() {
    this.$store.dispatch("checkLogin")
  },
  methods: {
    search() {
      this.$router.push({name: 'home', query: {query: this.query}})
    },
    logout() {
      localStorage.removeItem('token')
      this.$store.dispatch("checkLogin", 'logout')
    }
  },
  props: {
    source: String
  }
};
</script>