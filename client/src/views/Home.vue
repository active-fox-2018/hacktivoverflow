<template>
  <div class="home">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "home",
  created() {
    if (localStorage.getItem("token")) {
      this.changeLoginState(true);
    }
  },
  components: {
    Navbar
  },
  methods: {
    ...mapMutations(["changeLoginState"]),
  }
};
</script>
