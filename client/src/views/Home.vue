<template>
  <div class="home">
    <navbar/>
    <div class="container">
      <div class="row">
        <sidenav/>
        <div class="col-9">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from "@/components/navbar.vue";
import sidenav from "@/components/sidenav.vue";

export default {
  name: "home",
  components: {
    navbar,
    sidenav
  },
  created() {
    this.$store.commit("cekLogin");
  }
};
</script>
