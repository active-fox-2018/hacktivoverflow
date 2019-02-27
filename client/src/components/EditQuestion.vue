<template>
  <v-container fluid>
    <v-layout align-center justify-content-center fill-height>
      <v-flex xs12>
        <v-card color="blue-grey lighten-5">
          <v-card-title>
            <span class="headline">Edit your question</span>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              large
              flat
              :to="{path: `/question/${this.$route.params.id}`}"
            >Cancel</v-btn>
            <v-btn large color="blue white--text" @click.prevent="editQuestion">Save changes</v-btn>
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
import server from "@/api/server.js";
import VueTagsInput from "@johmun/vue-tags-input";
import swal from "sweetalert";

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
    inputTags() {
      return this.tags.map(tag => tag.text);
    }
  },
  created() {
    this.getQuestion();
  },
  methods: {
    editQuestion() {
      // console.log('--------------', this.title, this.description, this.inputTags, this.$route.params.id)
      server
        .put(
          `questions/${this.$route.params.id}`,
          {
            title: this.title,
            description: this.description,
            tags: this.inputTags
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        .then(({ data }) => {
          return swal("Saved", "your'e updates has been published", "success");
        })
        .then(() => {
          this.$router.push({ path: `/question/${this.$route.params.id}` });
        })
        .catch(({ response }) => {
          console.error(response);
        });
    },
    getQuestion() {
      server
        .get(`/questions/${this.$route.params.id}`, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          this.title = data.data.title
          this.description = data.data.description
          this.tags = []
          data.data.tags.forEach(tag => {
            this.tags.push({text: tag.name})
          });
        })
        .catch(response => {
          console.error(response);
        });
    }
  }
};
</script>

<style>
</style>
