<template>
  <v-flex d-flex>
  <v-layout row wrap>
    <v-flex d-flex xs12 md12 lg12>
      <v-card color="blue-grey lighten-4" light>
        <v-card-title>My Tags</v-card-title>
        <v-combobox
          v-model="chips"
          :items="items"
          label="Your favorite hobbies"
          chips
          clearable
          prepend-icon="filter_list"
          solo
          multiple
          class="pa-4"
        >
        <template slot="selection" slot-scope="data">
          <v-chip
            :selected="data.selected"
            close
            @input="remove(data.item)"
          >
        <strong>{{ data.item }}</strong>&nbsp;
      </v-chip>
    </template>
  </v-combobox>
      </v-card>
    </v-flex>
  </v-layout>
</v-flex>
</template>

<script>
export default {
  name: 'tags',
  created() {
  },
  data() {
    return {
      chips: [''],
      items: ['']
      
    }
  },
  methods: {
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      }
  }

}
</script>

<style>

</style>
