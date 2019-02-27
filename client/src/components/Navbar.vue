<template>
  <v-toolbar dark>
    <v-toolbar-title class="white--text font-weight-regular" @click.prevent="getHomePage">
      <v-btn flat large>HOME</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-form @submit.prevent="searchQuestion(query)">
      <v-container>
        <v-text-field v-model="query">
          <template slot="label">Search question ...
            <v-icon style="vertical-align: middle; padding-left: 26px;">search</v-icon>
          </template>
        </v-text-field>
      </v-container>
    </v-form>

    <v-btn icon @click.prevent="signOut" v-if="isLogin">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
    <span v-else>
      <v-btn :to="'/authpage/login'" flat color="white">login</v-btn>
      <v-btn :to="'/authpage/register'" outline color="white">sign up</v-btn>
    </span>
  </v-toolbar>
</template>

<script>
import swal from "sweetalert";
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      dialog: false,
      query: ""
    };
  },
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
    getHomePage() {
      this.$router.push({ path: "/" });
    },
    signOut() {
      swal("are you sure you want to sign out?", {
        buttons: {
          cancel: true,
          signOut: {
            text: "Sign Out",
            value: "signOut"
          }
        }
      }).then(value => {
        if (value == "signOut") {
          localStorage.removeItem("token");
          this.$store.commit("changeLoginState", false);
        }
      });
    },
    dispatchSearch() {
      this.$store.dispatch("search", this.query);
    },
    searchQuestion(searchQuery){
      this.$router.push({path:'/search', query:{title: searchQuery}})
      this.query = ""
    }
  }
};
</script>

<style>
</style>
