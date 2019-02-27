<template>
  <v-container fluid>
    <v-layout align-center justify-content-center fill-height>
      <v-flex xs12>
        <v-card color="blue-grey lighten-5">
          <v-card-title>
            <span class="headline">What do you want to ask?</span>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" large flat :to="'/'">Cancel</v-btn>
            <v-btn large color="blue white--text" @click.prevent="createQuestion">Submit</v-btn>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <h2 class="text-xs-left font-weight-thin mb-2">Question Title</h2>
                  <v-text-field
                    v-model="title"
                    solo
                    label="e.g. updating node js in Ubuntu 16.0.4 "
                    required
                  ></v-text-field>
                </v-flex>
                <h2 class="text-xs-left font-weight-thin mb-2">Tags</h2>
                <v-flex xs12>
                  <vue-tags-input
                    v-model="tag"
                    :tags="tags"
                    @tags-changed="newTags => tags = newTags"
                  />
                </v-flex>
                <v-flex xs12>
                  <h2 class="text-xs-left font-weight-thin mb-2">Description</h2>
                  <v-textarea
                    v-model="description"
                    solo
                    auto-grow
                    label="Describe your problems, what solutions you have tried and what results do you expect"
                    required
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "@/api/server.js";
import VueTagsInput from "@johmun/vue-tags-input";
import swal from 'sweetalert'

export default {
  name: "AddQuestion",
  data() {
    return {
      title: "",
      description: "",
      tag: "",
      tags: []
    };
  },
  components: {
    VueTagsInput
  },
  computed: {
    inputTags(){
      return this.tags.map(tag => tag.text)
    }
  },
  methods: {
    createQuestion() {
      axios.post("/questions", {
        title: this.title,
        description: this.description,
        tags: this.inputTags
      }, {
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        return swal('Submitted', "your'e question has been successfully published", "success")
      })
      .then(() => {
        this.$router.push({path: "/"})
      })
      .catch(({response}) => {
        console.error(response)
      })
    }
  }
};
</script>

<style>
</style>
