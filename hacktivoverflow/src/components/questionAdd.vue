<template>
  <div class="card">
    <div class="row">
      <div class="col-sm-2">
        <h2 class="d-flex align-items-center justify-content-center flex-column">Ask something</h2>
      </div>
      <div class="col-sm-10">
        <div>
          <div class="form-group">
            <label for="titleInput">Title</label>
            <input
              type="text"
              class="form-control"
              id="titleInput"
              placeholder="Title"
              v-model="titleInput"
            >
          </div>
          <div class="form-group">
            <label for="descriptionInput">Description</label>
            <input
              type="text"
              class="form-control"
              id="descriptionInput"
              placeholder="Description"
              v-model="descriptionInput"
            >
          </div>
          <button type="button" class="btn btn-primary" @click="addQuestion()">Ask</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addQuestion } from "@/apis/question.js";

export default {
  data() {
    return {
      titleInput: "",
      descriptionInput: ""
    };
  },
  methods: {
    addQuestion() {
      console.log("woi");
      addQuestion({
        title: this.titleInput,
        description: this.descriptionInput,
        createdAt: new Date(),
        updatedAt: new Date(),
        upvoter: [],
        downvoter: []
      });
    }
  }
};
</script>
