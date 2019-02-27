<template>
  <div>
    <div v-for="(answer, index) in question.answers" :key="index">
      <v-card>
        <v-divider></v-divider>
        <p
          class="text-xs-left ml-2 mt-2 blue--text"
          v-if="answer.author"
        >By {{answer.author.username}}</p>
        <v-layout justify-space-between column>
          <v-flex v-if="editForm==answer._id">
            <v-textarea
              v-model="currentAnswerEdit"
              solo
              class="subheading font-weight-light text-xs-left ml-2 mb-2"
            ></v-textarea>
            <v-btn @click.prevent="saveEditedAnswer(answer)" class="blue white--text">save changes</v-btn>
            <v-btn flat class="blue--text" @click.prevent="editForm=''">cancel</v-btn>
          </v-flex>
          <v-flex v-if="editForm!==answer._id">
            <h1 class="subheading font-weight-light text-xs-left ml-2 mb-2">{{answer.description}}</h1>
          </v-flex>
          <br>
          <v-flex v-if="editForm!==answer._id">
            <v-layout align-start>
              <div class="mr-3">
                <p class="my-0">{{answer.upvoters.length}}</p>
                <v-btn icon @click.prevent="upvoteAnswer(answer)">
                  <v-icon>thumb_up</v-icon>
                </v-btn>
              </div>
              <div class="mr-3">
                <p class="my-0">{{answer.downvoters.length}}</p>
                <v-btn icon @click.prevent="downvoteAnswer(answer)">
                  <v-icon>thumb_down</v-icon>
                </v-btn>
              </div>
              <v-btn
                v-if="isAnswerAuthor(answer)"
                class="mt-2"
                color="blue-grey lighten-2 white--text"
                @click.prevent="editThisAnswer(answer)"
              >Edit</v-btn>
              <v-btn
                v-if="isAnswerAuthor(answer)"
                class="mt-2"
                color="red lighten-2 white--text"
              >Delete</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </div>
  </div>
</template>

<script>
import server from "@/api/server.js";

export default {
  name: "QuestionAnswer",
  props: ["question"],
  data() {
    return {
      currentAnswerEdit: "",
      editForm: ""
    };
  },
  methods: {
    isAnswerAuthor(answer) {
      return answer.author._id.toString() ==
        localStorage.getItem("userId").toString()
        ? true
        : false;
    },
    editThisAnswer(answer) {
      this.editForm = answer._id;
      this.currentAnswerEdit = answer.description;
    },
    saveEditedAnswer(answer) {
      server
        .put(
          `/answers/${answer._id}`,
          {
            description: this.currentAnswerEdit
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$emit("refreshQuestion");
          this.$router.push({ path: `/question/${this.$route.params.id}` });
          this.editForm = "";
        })
        .catch(({ reponse }) => {
          console.error(response);
        });
    },
    upvoteAnswer(answer) {
      server
        .put(
          `answers/upvote/${answer._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$emit("refreshQuestion");
          this.$router.push({ path: `/question/${this.$route.params.id}` });
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    downvoteAnswer(answer) {
      server
        .put(
          `answers/downvote/${answer._id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          this.$emit("refreshQuestion");
          this.$router.push({ path: `/question/${this.$route.params.id}` });
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
