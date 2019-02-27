<template>
  <div>
    <ul v-for="post, index in userPostings">
      <div class="card" style="width: 90%;">
        <div class="card-header">{{post.title}}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <p>{{post.upvotes.length - post.downvotes.length }} vote(s) {{post.answers.length}} answer(s)  <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModalLong"
              @click="editPost(post, index)"
              style="margin:5px"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-primary"
              @click.prevent="deletePost(post)"
              style="margin:5px"
            >
              <i class="fas fa-trash-alt"></i>
            </button></p>
          </li>
        </ul>
      <update :selected-post="selectedPost"/>
      </div>
    </ul>
    <!-- {{userPosting}} -->
  </div>
</template>
<script>
import axios from "@/api/server";
import update from "@/components/editpost.vue";
export default {
  name: "archieve",
  components : {
      update
  },
  data() {
    return {
      userPostings: {},
      selectedPost : {title : '', description : ''}
    };
  },
  created() {
    this.getUserPostings();
  },
  methods: {
    getUserPostings() {
      let user = localStorage.getItem("user");
      let data = this.$store.state.allPostings.filter(posting => {
        return posting.user._id == user;
      });
      this.userPostings = data;
    },
    editPost(post) {
        this.selectedPost = post
    },
    deletePost(post) {
        swal({
        title: "Are you sure?",
        text: "You will not be able to recover this file!",
        icon: "warning",
        buttons: [
          'No, cancel it!',
          'Yes, I am sure!'
        ],
        dangerMode: true,
      }).then((isConfirm) => {
        if (isConfirm) {
          swal({
            title: 'Deleted!',
            text: 'your article are successfully deleted!',
            icon: 'success'
          })
            .then(() => {
              axios
                .delete(`/postings/${post._id}`, {
                  headers: {
                    token: localStorage.getItem('token')
                  }
                })
                .then(() => {
                  console.log(this.userPostings);
                  
                  let data = this.userPostings.filter(function(a) {
                    console.log(a._id, post._id);
                    
                    return a._id !== post._id
                  })
                  this.userPostings = data
                })
            })
            .catch(err => {
              swal('our server are busy, please try again')
            })
        } else {
          swal("Cancelled", "Your posting is safe :)", "error");
        }
      })
      // swal('are you sure')
    }
  }
};
</script>

