<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Remove Question</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Remove Question</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title" required v-model="title" readonly></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Description" required v-model="description" readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="edit">Remove</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ['question'],
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
  watch: {
    question (val) {
      this.title = val.title
      this.description = val.description
    }
  },
  created () {
    this.title = this.question.title
    this.description = this.question.description
  },
  methods: {
    edit () {
      let payload = {
        id: this.question._id
      }
      this.$store.dispatch('removeQuestion', payload)
      this.dialog = false
      this.$emit('force-update')
    },

    close () {
      this.dialog = false
    }
  }
}
</script>
