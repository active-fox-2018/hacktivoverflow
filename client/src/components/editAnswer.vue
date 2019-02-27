<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Edit Answer</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Answer</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title" required v-model="title"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Description" required v-model="description"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="edit">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ['answer'],
  data: () => ({
    dialog: false,
    title: '',
    description: ''
  }),
  computed: {
    token () {
      return this.$store.state.token
    },

    user () {
      return this.$store.state.user
    }
  },
  created () {
    this.title = this.answer.title
    this.description = this.answer.description
  },
  methods: {
    edit () {
      let payload = {
        title: this.title,
        description: this.description,
        questionId: this.answer.questionId,
        _id: this.answer._id
      }
      this.$emit('edit-answer', payload)
      this.dialog = false
    },

    close () {
      this.dialog = false
    }
  }
}
</script>
