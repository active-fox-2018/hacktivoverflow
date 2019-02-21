<template>
  <div class="card">
    <div class="row">
      <div class="col-sm-2">
        <h2 class="d-flex align-items-center justify-content-center flex-column">Add answer</h2>
      </div>
      <div class="col-sm-10">
        <div>
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
          <button type="button" class="btn btn-primary">Answer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      descriptionInput: ""
    };
  }
};
</script>
