<template>
    <div >
        <form @submit.prevent="edit" class="question-form">
        <md-field>
            <label>Title</label>
            <md-input class="input-login" v-model="title" type="text"></md-input>
        </md-field>

        <md-field>
            <label>Description</label>
            <wysiwyg v-model="description" />
        </md-field>

        <md-field>
            <label>Tags</label>
            <md-input class="input-login" v-model="temp" type="text"></md-input>
            <md-button @click="pushTag" class="md-icon-button md-raised" >
                <md-icon>add</md-icon>
            </md-button>
        </md-field>

        <div class="row" v-if="tags.length !== 0">
            <div class="col">
                <md-button @click="removeTag(i)" class=" md-raised" v-for="(tag, i) in tags" :key="i">
                    {{ tag }}
                </md-button>
            </div>
        </div>
        <md-dialog-actions>
            <md-button class="md-primary form-text mt-3" type="submit">ask</md-button>
        </md-dialog-actions>
        </form>
    </div>
</template>

<script>
export default {
  name: 'editQuesForm',
  data () {
    return {
      title: '',
      description: '',
      temp: '',
      tags: [],
      id: this.$route.params.id
    }
  },
  methods: {
    edit () {
      this.$store.dispatch('editQuestion', { data: {
        title: this.title,
        description: this.description,
        tags: this.tags
      },
      _id: this.id
      })
    },
    pushTag () {
      this.tags.push(this.temp)
      this.temp = ''
    },
    removeTag (i) {
      this.tags.splice(i, 1)
    },
    fetch () {
      this.$store.dispatch('getOneQuestion', this.$route.params.id)
        .then(_ => {
          if (_ !== false) {
            this.title = _.title
            this.description = _.description
            this.tags = _.tags
          }
        })
    }
  },
  created () {
    this.fetch()
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
