<template>
  <div
    class="modal fade"
    id="exampleModalCenter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">write your answer</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <textarea rows="5" class="form-control" v-model="newAnswer"></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">cancel</button>
          <button @click.prevent="addAnswer" type="button" class="btn btn-primary">post answer</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/api/server";
export default {
  name: "answer",
  data() {
    return {
      newAnswer: ""
    };
  },
  props: ['posting-id'],
  methods: {
    addAnswer() {
      axios
        .post(
          "/answers",
          {
            description: this.newAnswer,
            postingId: this.postingId
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
            console.log(data);
            data.data.user = data.user
          this.$emit('newdata', data.data)
          swal("answer posted");
        })
        .catch(({ response }) => {
          swal(response.data.message);
          // console.log(response);
        });
    }
  }
};
</script>

