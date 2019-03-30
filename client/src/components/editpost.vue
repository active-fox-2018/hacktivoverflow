<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModalLong"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLongTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">update your post</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- <form method="post" v-on:submit.prevent="updatePost"> -->
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="colFormLabel"
                placeholder="new task"
                v-model="selectedPost.title"
              >
            </div>
          </div>
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                id="colFormLabel"
                placeholder="description"
                v-model="selectedPost.description"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" @click.prevent="updatePost" data-dismiss="modal">Save changes</button>
          </div>
          <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api/server";
export default {
  name: "update",
  data() {
    return {
      image: ""
    };
  },
  props: ["selected-post"],
  methods: {
    updatePost() {
      axios.put(
        `/postings/${this.selectedPost._id}`,
        {
          title: this.selectedPost.title,
          description: this.selectedPost.description
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(data => {
            swal('data updated')        
        })
        .catch(err => {
            swal('oops, something bad happen')
        })
    }
  }
};
</script>

