<template>
  <div id="sidenav" class="col-3">
    <p>
      <router-link to="/">
        <i class="fas fa-book-reader"></i> Read
      </router-link>
    </p>
    <p>
      <router-link to="/create">
        <i class="fas fa-blog"></i> Create
      </router-link>
    </p>
    <p>
      <router-link to="/archieve">
        <i class="fas fa-archive"></i> Archieve
      </router-link>
    </p>
    <p>Tags List</p>
    <div v-for="tag in allTags">
      <p style="border:3px solid">
        <a href @click.prevent="search(tag.name)">{{tag.name}}</a>
      </p>
    </div>
    <!-- <p><a href="#"><i class="fab fa-gratipay"></i> Favorite </a></p> -->
  </div>
</template>

<script>
import axios from "@/api/server";
export default {
  name: "sidenav",
  data() {
    return {
      allTags: ""
    };
  },
  created() {
    this.getAllTag();
  },
  methods: {
    search(tag) {
      this.$router.push({ path: `/search/${tag}` });
    },
    getAllTag() {
      axios
        .get("/tags", {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.allTags = data;
        })
        .catch(err => {
          swal("internal server error");
        });
    }
  }
};
</script>
