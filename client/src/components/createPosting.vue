<template>
  <div id="createpost">
    <div class="col-12">
      <form action method="POST" @submit.prevent="createPost">
        <div class="form-group">
          <label for="title">
            Title
            <span class="require">*</span>
          </label>
          <input type="text" class="form-control" name="title" v-model="title">
        </div>

        <div class="form-group">
          <label for="description">
            Description
            <span class="require">*</span>
          </label>
          <textarea rows="5" class="form-control" name="description" v-model="description"></textarea>
        </div>
        <VueTagsInput v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags"/>

        <div class="form-group">
          <p>
            <span class="require">*</span> - required fields
          </p>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-success">Post Question</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  name: "createpost",
  components : {
    VueTagsInput
  },
  data() {
    return {
      title: "",
      description: "",
      tag: "",
      tags: []
    };
  },
  methods: {
    createPost() {
      // console.log(this.tags);
      
      // console.log;
      let newPosting = {
        title: this.title,
        description: this.description,
        tags : this.tags
      };
      this.$store.dispatch("createPost", newPosting);
    }
  }
};
</script>

