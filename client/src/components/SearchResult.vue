<template>
  <div>
    <v-card>
      <v-layout align-center justify-space-between row>
        <h1 class="display-1 font-weight-thin mt-4 mb-3">results</h1>
      </v-layout>
    </v-card>
    <hr>

    <div v-for="(question, index) in searchResults" :key="index">
      <v-card>
        <v-divider></v-divider>
        <v-layout align-center justify-space-between row>
          <h1 class="title font-weight-light ml-2 mt-4 mb-3">
            <v-btn
              flat
              :to="{path: `question/${question._id}`, params: {id:question._id}}"
            >{{question.title}}</v-btn>
          </h1>
          <v-layout align-center justify-end row fill-height>
            <div class="mr-3">
              <p>{{question.upvoters.length}}</p>
              <v-icon>thumb_up</v-icon>
            </div>
            <div class="mr-3">
              <p>{{question.downvoters.length}}</p>
              <v-icon>thumb_down</v-icon>
            </div>
            <div class="mr-3">
              <p>{{question.answers.length}}</p>
              <v-icon>question_answer</v-icon>
            </div>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import swal from "sweetalert";

export default {
  name: "SearchResult",

  created() {
    this.getAllQuestions();
    console.log(this.$route.query.title)
  },
  computed: {
    ...mapState(["allQuestions"]),
    searchResults() {

    }
  },
  methods: {
    ...mapActions(["getAllQuestions"]),
    askQuestion() {
      if (!localStorage.getItem("token")) {
        swal("you have to login first!", {
          buttons: ["continue browsing", "login now"]
        }).then(value => {
          if (value) this.$router.push({ path: "/authpage/register" });
        });
      } else {
        this.$router.push({ path: "/ask" });
      }
    }
  }
};
</script>

<style>
</style>
