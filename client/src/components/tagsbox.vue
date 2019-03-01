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
            <strong @click.prevent="clickTags(data.item)">{{ data.item }}</strong>&nbsp;
          </v-chip>
        </template>
      </v-combobox>
      </v-card>
    </v-flex>
  </v-layout>
</v-flex>
</template>

<script>
import axios from 'axios'
export default {
  name: 'tags',
  created() {
    axios({
      method: 'get',
      url: `${this.$store.state.serverUrl}/tags`
    })
    .then(({data}) => {
      this.items = data.tags
      return axios({
        method: 'get',
        url: `${this.$store.state.serverUrl}/users`,
        headers: {
          token: localStorage.token
        }
      })
    })
    .then(({data}) => {
      this.chips = data.user.tags
    })
    .catch(err => {
      console.log(err)
    })
  },
  data() {
    return {
      chips: [],
      items: []
      
    }
  },
  watch: {
    chips: {
      handler: function(newValue) {
        axios({
          method: 'patch',
          url: `${this.$store.state.serverUrl}/users`,
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            tags: newValue
          }
        })
        .then(({data}) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
        
      },
      deep: true
    }
  },
  methods: {
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
      clickTags(value) {
        this.$emit('watchTag', value)
      }
  }

}
</script>

<style>

</style>
