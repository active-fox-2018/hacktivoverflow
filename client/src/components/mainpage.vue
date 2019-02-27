<template>
  <div id="mainpage" class="col-12">
    <ul v-for="post,index in allPostings">
      <div class="card">
        <div class="card-header">
          <a href @click.prevent="selectedPosting(post, index)">posted by : {{post.user.name}}</a>
        </div>
        <div class="card-body">
          <p class="card-title">
            <a href @click.prevent="selectedPosting(post, index)">{{post.title}}</a>
          </p>
          <p style="font-size: 15px;">{{post.upvotes.length - post.downvotes.length }} vote(s) {{post.answers.length}} answer(s) <button
              class="btn btn-primary"
              @click.prevent="addVote(post, index, 'upvotes')"
              style="margin:5px"
            >
              <i class="fas fa-thumbs-up"></i>
            </button>
            <button
              class="btn btn-primary"
              @click.prevent="addVote(post, index, 'downvotes')"
              style="margin:5px"
            >
              <i class="fas fa-thumbs-down"></i>
            </button></p>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from "@/api/server";
export default {
  name: "mainpage",
  computed: {
    allPostings() {
      return this.$store.state.allPostings;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  created() {
    this.$store.dispatch("getAllPostings");
  },
  methods: {
    selectedPosting(posting, index) {
      this.$router.push({
        path: `posting/${posting._id}/${index}`
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

