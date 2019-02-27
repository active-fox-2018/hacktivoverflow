<template>
  <div>
    <v-card>
      <v-layout align-center justify-space-between row>
        <h1 class="display-1 ml-2 font-weight-regular mt-4 mb-3">{{question.title}}</h1>
        <v-layout align-center justify-end row>
          <v-btn
            v-if="isAuthor"
            class="mt-2"
            color="red lighten-2 white--text"
            @click.prevent="deleteQuestion"
          >Delete</v-btn>
          <v-btn
            v-if="isAuthor"
            :to="{path: `/edit-question/${question._id}`}"
            class="mt-2"
            color="blue-grey white--text"
          >Edit</v-btn>
        </v-layout>
      </v-layout>
      <p class="text-xs-left ml-2 blue--text" v-if="question.author">By {{question.author.username}}</p>
      <div class="text-xs-left mb-2">
        <v-chip v-for="(tag, index) in question.tags" :key="index">{{tag.name}}</v-chip>
      </div>
      <v-layout align-left justify-space-between row>
        <p class="title ml-2 font-weight-light text-xs-left">{{question.description}}</p>
      </v-layout>
      <br>
      <v-layout align-center justify-left row>
        <div v-if="question.upvoters">
          <p class="mb-0">{{question.upvoters.length}}</p>
          <v-btn @click.prevent="upvoteQuestion" flat icon class="mt-0">
            <v-icon>thumb_up</v-icon>
          </v-btn>
        </div>
        <div v-if="question.downvoters">
          <p class="mb-0">{{question.downvoters.length}}</p>
          <v-btn @click.prevent="downvoteQuestion" flat icon class="mt-0">
            <v-icon>thumb_down</v-icon>
          </v-btn>
        </div>
      </v-layout>
    </v-card>
    <hr>

    <div>
      <h1 class="headline font-weight-light ml-2 mt-4 mb-3 text-xs-left">Your Answer</h1>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-textarea
              v-model="answerDescription"
              outline
              auto-grow
              label="Describe your answer in details"
              required
            ></v-textarea>
          </v-flex>
          <v-btn @click.prevent="addAnswer" color="blue darken-1 white--text">Submit</v-btn>
        </v-layout>
      </v-container>
      <hr>
      <h1
        class="headline font-weight-light ml-2 mt-4 mb-3 text-xs-left"
        v-if="question.answers"
      >{{question.answers.length}} Answers</h1>
    </div>
    <Answers @refreshQuestion="getQuestion" :question="question"/>
  </div>
</template>

<script>
import server from "@/api/server.js";
import Answers from "@/components/Answers.vue";
import swal from "sweetalert";

export default {
  name: "Question",
  data() {
    return {
      question: "",
      answerDescription: ""
    };
  },
  components: {
    Answers
  },
  created() {
    this.getQuestion();
  },
  computed: {
    isAuthor() {
      if (this.question.author) {
        return this.question.author._id == localStorage.getItem("userId")
          ? true
          : false;
      }
    }
  },
  methods: {
    getQuestion() {
      server
        .get(`/questions/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.question = data.data;
        })
        .catch(response => {
          console.error(response);
        });
    },
    addAnswer() {
      server
        .post(
          `/answers`,
          {
            questionId: this.question._id,
            description: this.answerDescription
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          swal("Submitted", "you're answered has been published", "success");
        })
        .then(() => {
          this.answerDescription = "";
          this.getQuestion();
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    deleteQuestion() {
      console.log(`--------------`, this.$route.params.id);
      swal({
        title: "Are you sure?",
        text: "This will permanently delete your question",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            return server
              .delete(`/questions/${this.$route.params.id}`, {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then(() => {
                console.log("masuk");
                this.$router.push({ path: "/" });
              });
          }
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    upvoteQuestion() {
      server
        .put(
          `questions/upvote/${this.$route.params.id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.getQuestion();
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    downvoteQuestion() {
      server
        .put(
          `questions/downvote/${this.$route.params.id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.getQuestion();
        })
        .catch(({ response }) => {
          console.error(response);
        });
    }
  }
};
</script>

<style>
</style>
