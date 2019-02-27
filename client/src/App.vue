<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <router-link to="/" style="text-decoration:none">
            <v-list-tile-title>Home</v-list-tile-title>
              </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!$store.state.login">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
              <router-link to="/login" style="text-decoration:none">
            <v-list-tile-title>Login</v-list-tile-title>
              </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$store.state.login">
          <v-list-tile-action>
            <v-icon>logout</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click="logoutUser">
              <router-link to="/" style="text-decoration:none">
            <v-list-tile-title>Logout</v-list-tile-title>
              </router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="$store.state.login">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/user" style="text-decoration:none">
              <v-list-tile-title>My Questions</v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="light-blue accent-4" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="reloadDataHome">
        <router-link to="/" style="text-decoration:none; color:white">
        Hackferflow
        </router-link>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-title>
        <v-form @submit.prevent="searchQuestion">
          <v-text-field
          hide-details
          prepend-icon="search"
          single-line
          v-model="search"
          ></v-text-field>
        </v-form>
      </v-toolbar-title>
      <v-toolbar-title>
        <router-link to="/ask_question" style="text-decoration:none">
          <v-btn small fab color="grey">
            <v-icon>edit</v-icon>
          </v-btn>
        </router-link>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer color="transparent" app>
      <span class="black--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  created() {
    this.reloadDataHome()
  },
  components: {
  },
  data () {
    return {
      drawer: null,
      statusLogin: false,
      search: ''
    }
  },
  props: {
    source: String
  },
  methods: {
    logoutUser() {
      localStorage.removeItem('token')
       this.$store.commit('userAuthetication', false)
    },
    searchQuestion() {
      axios({
        method: 'get',
        url: `${this.$store.state.serverUrl}/search?search=${this.search}`
      })
      .then(({data}) => {
        this.$store.state.questions = data
      })
      .catch(err => {
        console.log(err)
      })
    },
    reloadDataHome() {
      this.$store.dispatch('getAllQuestions')
      if(localStorage.getItem('token')) {
        this.$store.dispatch('userAuthetication')
        .then(() => {
          this.statusLogin = true
        })
        .catch(err => {
          this.statusLogin = false
        })
      }
    }
  }
}
</script>
