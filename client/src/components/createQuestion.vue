<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Ask Question</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Ask Question</span>
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
          <v-btn color="blue darken-1" flat @click="ask">Ask</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
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
  methods: {
    ask () {
      let payload = {
        title: this.title,
        description: this.description
      }
      this.$store.dispatch('addQuestion', payload)
      this.dialog = false
    },

    close () {
      this.description = ''
      this.title = ''
      this.dialog = false
    }
  }
}
</script>
