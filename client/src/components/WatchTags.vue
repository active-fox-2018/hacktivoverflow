<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 v-if="!edit" class="card-title">Watched Tags <span><button @click="editTrue()">Edit</button></span></h5>
        <h5 v-if="edit" class="card-title">Watched Tags <span><button @click="editTrue()">Done</button></span></h5>
        <form class="mb-2" @submit.prevent="addTags()">
          <input v-model="tag" type="text" placeholder="add new tag" style="font-size:12px; height:30px; width:15rem; padding-left:5px; padding-right:5px;">
        </form>
        <div v-if="this.tags.length > 0 && !edit" style="padding-right:10px;">
          <div class="row">
            <div v-for="(tag, index) in tags" :key="index" style="margin-right:-35px; padding-right:10px;">
              <div class="col-1">
                  <router-link :to="`/questions/tag/${tag}`">
                    <button @click="tagged(tag)" type="button" class="tag mr-1 mb-2">
                      {{tag}}
                    </button>
                  </router-link>

              </div>
            </div>
          </div>
        </div>
        <div v-if="edit">
          <button type="button" class="tag mr-1 mb-2" v-for="(tag, index) in tags" :key="index">
            <div class="row">
              <div class="col d-flex align-items-center">{{tag}} <span @click="removeTag(tag)" class="ml-2" style="color:red">&times;</span></div>
            </div>
          </button>
        </div>
        <div v-else-if="!edit && this.tags.length == 0">
          <p class="card-text">You don't have any watched tags</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import alertify from 'alertifyjs'

export default {
  data () {
    return {
      tag: '',
      edit: false
    }
  },
  methods: {
    addTags() {
      this.$store
          .dispatch('addTags', this.tag)
          .then(_ => {
            this.tag = ''
            alertify.success('New Tag Added')
          })
    },
    tagged (tag) {
      this.$store.dispatch('tagged', tag)

    },
    removeTag (tag) {
      this.$store.dispatch('removeTags', tag)
    },
    editTrue () {
      if(!this.edit) {
        this.edit = true
      } else {
        this.edit = false
      }
    }
  },
  computed: {
    tags () {
      return this.$store.state.userTags
    }
  }
}
</script>

<style>

</style>
