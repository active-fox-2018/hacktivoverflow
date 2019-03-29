<template>
  <div id="search" class="col-12">
    <ul v-for="post,index in allPostings">
      <div class="card">
        <div class="card-header">
          <a href @click.prevent="selectedPosting(post, index)">posted by : {{post.user.name}}</a>
        </div>
        <div class="card-body">
          <p class="card-title">
            <a href @click.prevent="selectedPosting(post, index)">{{post.title}}</a>
          </p>
        </div>
        <div>
          <ul v-for="tag in post.tags" class="container" style="display:inline">
            <li style="display:inline; ">
              <a href @click.prevent="search(tag.name)">{{tag.name}}</a>
            </li>
          </ul>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from "@/api/server";
export default {
  name: "search",
  data() {
    return {
      allPostings: "",
      querySearch: this.$route.params.query
    };
  },
    watch : {
      '$route.params.query'(v) {
        this.querySearch = v
        this.searchedTag();
      }
    },
  computed: {
    allData() {
      return this.$store.state.allPostings;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  created() {
    this.querySearch = this.$route.params.query;
    this.searchedTag();
  },
  methods: {
    search(tag) {
      this.$router.push({ path: `/search/${tag}` });
    },
    searchedTag() {
      let regex = new RegExp(".*" + this.querySearch + ".*", "i");
      let array = [];
      let data = this.allData.filter(post =>
        post.tags.every(c => c.name.match(regex))
      );
      this.allPostings = data;
    },
    selectedPosting(posting, index) {
      this.$router.push({
        path: `/posting/${posting._id}/${index}`
      });
    },
    addVote(post, index, command) {
      let currentUser = localStorage.getItem("user");

      let upvoter = false;
      let downvoter = false;

      this.$store.state.allPostings[index].upvotes.forEach(element => {
        if (element == currentUser) {
          upvoter = true;
        }
      });

      this.allPostings[index].downvotes.forEach(el => {
        if (el == currentUser) {
          downvoter = true;
        }
      });
      let model = "postings";

      // proses pemilihan
      if (command == "upvotes") {
        if (!upvoter && !downvoter) {
          this.$store.dispatch("addVote", {
            id: post._id,
            index: index,
            command: "upvotes",
            model: model
          });
        } else if (!upvoter && downvoter) {
          this.$store.dispatch("removeVote", {
            id: post._id,
            index: index,
            command: "downvotes",
            model: model
          });
        } else {
          swal("you already upvoter");
        }
      } else if (command == "downvotes") {
        if (!upvoter && !downvoter) {
          this.$store.dispatch("addVote", {
            id: post._id,
            index: index,
            command: "downvotes",
            model: model
          });
        } else if (upvoter && !downvoter) {
          this.$store.dispatch("removeVote", {
            id: post._id,
            index: index,
            command: "upvotes",
            model: model
          });
        } else {
          swal("you already dowvoter");
        }
      }
    }
  }
};
</script>

