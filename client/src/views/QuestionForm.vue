<template>
  <v-container>
    <v-form>
      <v-text-field v-model="title" label="Title" required></v-text-field>
      <v-combobox
        v-model="tags"
        :items="items"
        label="Tags"
        hide-selected
        clearable
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
      <wysiwyg v-model="description"/>
      <v-btn @click="submit">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import Swal from 'sweetalert2'
import api from '@/api/server.js'

export default {
  data() {
    return {
      title: "",
      description: "",
      tags: [],
      data: {}
    }
  },
  mounted() {
    if (!localStorage.getItem('token')) {
      this.$router.push({name: 'login'})
      Swal.fire({
        type: 'info',
        title: 'Please Login First'
      })
    }
    if (this.$route.params.id) {
      api
        .get(`/${this.$route.params.data}/${this.$route.params.id}`)
        .then(({ data }) => {
          this.title = data.title
          this.description = data.description
          this.tags = data.tags
        })
        .catch(({response}) => {
          console.log(response)
        })
    }
  },
  computed: mapState([
    "isLogin",
    "items"
  ]),
  methods: {
    remove (item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.tags = [...this.tags]
    },
    submit() {
      if (this.isLogin) {
        let newData = {
          title: this.title,
          description: this.description,
          tags: this.tags
        }
        if (!this.$route.params.id) {
          this.$store.dispatch("createQuestion", newData)
          this.clear()
        } else {
          api
            .put(`/${this.$route.params.data}/${this.$route.params.id}`, newData, { headers: {token: localStorage.getItem('token')} })
            .then(({data}) => {
              this.$router.go(-1)
              Swal.fire({
                position: 'top-end',
                type: 'success',
                title: `Your ${this.$route.params.data} has been updated`,
                showConfirmButton: false,
                timer: 2000
              })
              this.$router.dispatch('getTags')
              // this.$router.push({name: "questionDetail", params: {questionId: data.questionId || this.$route.params.id}})
            })
            .catch(({response}) => {
              console.log(response)
            })
        }
      } else {
        this.$router.push({name: 'login'})
        Swal.fire({
          type: 'info',
          title: 'Please Login First'
        })
      }
    },
    clear() {
      this.title = ""
      this.description = ""
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
