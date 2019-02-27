<template>
  <v-container fluid>
    <v-layout justify-space-between wrap>
      <v-flex xs12>
        <span class="display-1" v-if="!$route.query.query">All Questions</span>
        <span class="display-1" v-else> Search result</span>
      </v-flex>
      <v-flex xs8>
        <BasicCard v-for="question in filtered" :key="question._id" :question="question"/>
      </v-flex>
      <v-flex xs3>
        <v-container py-1 my-1 px-0>
          <v-card v-if="isLogin">
            <v-card-title class="title">
              Watched Tags
            </v-card-title>
            <v-card-text>
              <v-chip v-for="(tag, i) in tags" :key="i" color="orange" text-color="white" @click="tagClick(tag)">{{tag}}</v-chip>
              <v-combobox
                v-if="edit"
                v-model="tags"
                :items="items"
                label="Tags"
                hide-selected
                multiple
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    :selected="data.selected"
                    close
                    @input="remove(data.item)"
                  >
                    <strong>{{ data.item }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-card-text>
            <v-card-actions>
              <v-btn v-if="!edit" @click="edit = true">
                edit
              </v-btn>
              <v-btn v-else @click="edit = false">
                done
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import BasicCard from "@/components/BasicCard.vue"
import { mapState } from "vuex"

export default {
  components: {
    BasicCard
  },
  computed: {
    filtered() {
      if (this.$route.query.query) {
        return this.questions.filter(e => e.title.includes(this.$route.query.query) || e.tags.includes(this.$route.query.query))
      } else {
        return this.questions
      }
    },
    ...mapState(["questions", "watchedTags", "items", "isLogin"]),
  },
  data() {
    return {
      tags: [],
      edit: false
    }
  },
  created() {
    this.getQuestions()
  },
  mounted() {
    this.tags = this.watchedTags
  },
  watch: {
    tags() {
      if (this.tags) {
        this.$store.dispatch("updateUserTags", this.tags)
      }
    }
  },
  methods: {
    getQuestions() {
      this.$store.dispatch("getQuestions")
    },
    remove (item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.tags = [...this.tags]
    },
    tagClick(tag) {
      this.$router.push({name: 'home', query: {query: tag}})
    }
  }
};
</script>
