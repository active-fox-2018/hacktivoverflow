<template>
  <div>
    <div class="form-group">
      <label for="titleInput">Title</label>
      <input type="text" class="form-control" id="titleInput" v-model="titleInput">
    </div>
    <div class="form-group">
      <label for="descriptionInput">Question</label>
      <textarea class="form-control" id="descriptionInput" rows="3" v-model="descriptionInput"></textarea>
    </div>
    <button type="button" class="btn btn-primary" @click="updateQuestion()">Save</button>
    <button type="button" class="btn btn-primary" @click="$emit('edit-form-shown',false)">Cancel</button>
  </div>
</template>

<script>
import { updateQuestion } from "@/apis/question.js";

export default {
  props: ["question"],
  created() {},
  data() {
    return {
      titleInput: "",
      descriptionInput: ""
    };
  },
  methods: {
    updateQuestion() {
      updateQuestion(question.id, {
        title: this.titleInput,
        description: this.descriptionInput,
        updatedAt: new Date()
      });
    }
  }
};
</script>
