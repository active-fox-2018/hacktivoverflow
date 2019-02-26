<template>
    <div>
        <md-toolbar >
            <h1 class="md-title click-able" style="flex: 1" @click="home">ActiveOverflow</h1>
            <b-form-input style="flex: 2" class="search-bar" v-model="search" @keyup="filter" type="text" placeholder="search" />

            <router-link v-if="user" :to="{ name: 'ask' }">
                <md-button>ask</md-button>
            </router-link>

            <md-menu md-direction="bottom-end" :mdCloseOnClick="true" :mdCloseOnSelect="true">
                <md-button md-menu-trigger><md-icon>person</md-icon></md-button>
                <md-menu-content class="click-able">
                    <div v-if="user">
                        <md-menu-item class="option">Dashboard</md-menu-item>
                        <md-menu-item @click.prevent="logout" class="option">Logout</md-menu-item>
                    </div>
                    <div v-else>
                        <router-link class="black-text" :to="{ name: 'login'}" >
                            <md-menu-item class="option">
                                Login
                            </md-menu-item>
                        </router-link>
                        <router-link class="black-text" :to="{ name: 'register'}" >
                            <md-menu-item class="option">
                                Register
                            </md-menu-item>
                        </router-link>
                    </div>
                </md-menu-content>
            </md-menu>
        </md-toolbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'myNav',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    logout () {
      this.$store.commit('logout')
    },
    filter () {
      if (this.search === '') {
          this.$store.dispatch('getAllQuestions')
        } else {
          this.$store.commit('filterQues', this.search)
      }
    },
    home () {
      this.$router.push({ name: 'home' }); 
      this.$store.dispatch('getAllQuestions')
    }
  }
}
</script>

<style>

</style>
