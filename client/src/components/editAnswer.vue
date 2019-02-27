<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModalLong2"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLongTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">update your answer</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- <form method="post" v-on:submit.prevent="updatePost"> -->
          <div class="form-group row">
            <label for="colFormLabel" class="col-sm-2 col-form-label">Description</label>
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                id="colFormLabel"
                placeholder="description"
                v-model="selectedAnswer.description"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" @click.prevent="updateAnswer" data-dismiss="modal">Save changes</button>
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
  name: "editAnswer",
  data() {
    return {
      image: ""
    };
  },
  props: ["selected-answer"],
  methods: {
    updateAnswer() {
      axios.put(
        `/answers/${this.selectedAnswer._id}`,
        {
          description: this.selectedAnswer.description
        },
        {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(data => {
            swal('data updated')
            // console.log(data);         
        })
        .catch(err => {
            swal('oops, something bad happen')
            // console.log(err);        
        })
    }
  }
};
</script>

