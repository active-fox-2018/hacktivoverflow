<template>
  <div id="posting">
    <h3>{{selectedPosting.title}}</h3>
    <p>{{selectedPosting.description}}</p>
    <!-- <input v-model="newAnswer"> -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModalCenter"
    >answer</button>
    <!-- <button @click="addAnswer">submit</button> -->
    <div>
      <ul v-for=" answer, index in selectedPosting.answers">
        <div class="card">
          <div class="card-header"></div>
          <div class="card-body">
            <p>posted by : {{answer.user.name}}</p>
            <p>{{answer.description}}</p>
            <div class="card-footer">
              <p style="font-size: 15px;">
                {{answer.upvotes.length - answer.downvotes.length }} vote(s)
                <button
                  class="btn btn-primary"
                  @click="addVote(answer, index, 'upvotes')"
                  style="margin:5px"
                >
                  <i class="fas fa-thumbs-up"></i>
                </button>
                <button
                  class="btn btn-primary"
                  @click="addVote(answer, index, 'downvotes')"
                  style="margin:5px"
                >
                  <i class="fas fa-thumbs-down"></i>
                </button>
                <button
                  v-if="user == answer.user._id || user == answer.user"
                  class="btn btn-primary"
                  style="margin:5px"
                  type="button"
                  data-toggle="modal"
                  data-target="#exampleModalLong2"
                  @click="editAnswer(answer, index)"
                >
                  edit your answer
                </button>
              </p>
            </div>
          </div>
        </div>
      </ul>
    </div>
    <label>add Answer</label>
    <br>
    <editAnswer :selected-answer="selectedAnswer"/>
    <addAnswer :posting-id="selectedPosting._id" @newdata="refreshData"/>
    <!-- <button @click="addAnswer">submit</button> -->
  </div>
</template>
<script>
import axios from "@/api/server";
import addAnswer from "@/components/addAnswer";
import editAnswer from "@/components/editAnswer";
// import router from "@/router"
export default {
  name: "posting",
  components: {
    addAnswer,
    editAnswer
  },
  data() {
    return {
      newAnswer: "",
      selectedAnswer : '',
      data: this.$route.params.id,
      index: this.$route.params.index,
      user: localStorage.getItem("user")
    };
  },
  computed: {
    allPostings() {
      return this.$store.state.allPostings;
    },
    selectedPosting() {
      let result = "";
      for (let i = 0; i < this.allPostings.length; i++) {
        if (this.allPostings[i]._id == this.data) {
          result = this.allPostings[i];
        }
      }
      return result;
    }
  },
  methods: {
    refreshData(payload) {
      this.selectedPosting.answers.push(payload);
    },

    editAnswer(answer) {
      this.selectedAnswer = answer
    },
    addVote(post, index, command) {
      let currentUser = localStorage.getItem("user");
      let upvoter = false;
      let downvoter = false;

      this.selectedPosting.answers[index].upvotes.forEach(element => {
        if (element == currentUser) {
          upvoter = true;
        }
      });

      this.selectedPosting.answers[index].downvotes.forEach(el => {
        if (el == currentUser) {
          downvoter = true;
        }
      });
      // proses pemilihan
      let model = "answers";
      if (command == "upvotes") {
        if (!upvoter && !downvoter) {
          this.$store.dispatch("addVote", {
            id: post._id,
            postingIndex: this.index,
            postingId: this.data,
            index: index,
            command: "upvotes",
            model: model
          });
        } else if (!upvoter && downvoter) {
          this.$store.dispatch("removeVote", {
            id: post._id,
            index: index,
            command: "downvotes",
            model: model,
            postingIndex: this.index,
            postingId: this.data
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
            model: "answers",
            model: model,
            postingIndex: this.index,
            postingId: this.data
          });
        } else if (upvoter && !downvoter) {
          this.$store.dispatch("removeVote", {
            id: post._id,
            index: index,
            command: "upvotes",
            model: model,
            postingIndex: this.index,
            postingId: this.data
          });
        } else {
          swal("you already dowvoter");
        }
      }
    }
  }
};
</script>
