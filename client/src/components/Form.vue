<template>
  
  <div class="q-pa-md q-gutter-sm">
    <h5 v-if="!formTitle">Ask A Question</h5>
    <h5 v-if="formTitle">{{formTitle}}</h5>
    <label class="text-h6">Title</label>
    <q-input v-model="title"></q-input>
    <br>
    <label class="text-h6">Description</label>
    <q-editor 
    v-model="description" 
    height="5rem"
    :toolbar="[
      [
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          list: 'only-icons',
          options: ['left', 'center', 'right', 'justify']
        },
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          options: ['left', 'center', 'right', 'justify']
        }
      ],
      ['token', 'hr', 'link', 'custom_btn'],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
      ['undo', 'redo']
    ]"
    />
    <br>
    <label v-if="!formTitle" class="text-h6">Tags</label>
    <q-input v-if="!formTitle || formDetail" @keyup.enter="addTag" v-model="tag" ></q-input>

      <div class="row justify-start">
        <div v-for="(tag, index) in tags" :key="index">
          <q-chip removable @remove="log(index)" color="primary" text-color="white">
            {{tag}}
          </q-chip>
        </div>
      </div>

    <q-btn v-if="!formTitle" color="black" label="Ask Question" @click="addQuestion"/>
    <q-btn v-if="formTitle === 'Answer'" color="black" label="Answer Question" @click="answerQuestion"/>
    <q-btn v-if="formDetail" color="black" label="Edit Question" @click="editQuestion"/>

  </div>
</template>

<script>
export default {
  name: 'Form',
  props: ['formTitle', 'questionId', 'formDetail'],
  data () {
    return {
      description: '',
      title: '',
      tags: [],
      tag: ''
    }
  }, 
  created() {
    if (this.formDetail) {
      this.description = this.formDetail.description
      this.title = this.formDetail.title
      this.tags = this.formDetail.tags
    }
  },
  methods: {
    addTag() {
      this.tags.push(this.tag)
      this.tag = ''
    },
    log(index) {
      this.tags.splice(index, 1)
    },
    addQuestion() {
      this.$store.dispatch('askAQuestion', {description: this.description, title: this.title, tags: this.tags})
      this.$router.push({path: '/questions'})
    },
    answerQuestion() {
      this.$store.dispatch('answerAQuestion', {questionId: this.questionId, answer: {title: this.title, description: this.description} })
      this.description = ''
      this.title = ''
    },
    editQuestion() {
      this.$store.dispatch('editQuestion', {questionId: this.formDetail.questionId, edit: {description: this.description, title: this.title, tags: this.tags}})
      this.description = ''
      this.title = ''
      this.tags = []
      this.$emit('close-dialog')
    }
  }
}
</script>

<style>

</style>
