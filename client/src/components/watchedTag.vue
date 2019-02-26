<template>
    <div class="row border p-3 watched-tag">
      <div class="col">
        <small class="row">Watched Tags</small>
        <hr class="row">
        <div class="row">
          <b-form-input class="mt-2 col" v-model="temp" type="text" placeholder="add Tags" style="border: 0"/>
          <md-button @click="update" class="mt-2 md-icon-button md-primary">
            <md-icon>add</md-icon>
          </md-button>
        </div>
        <div class="row" v-if="user">
          <md-button v-for="(tag,i) in user.tags" :key="i" class="md-raised" :md-ripple="false">
            <div class="row">
              <div @click="filter(tag)" class="col">
                {{ tag }}
              </div>
              <div class="col">
                <i @click="remove(i)" class="material-icons ml-2" style="font-size: 0.73em"> close </i>
              </div>
            </div>
          </md-button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'watchedTag',
  data () {
    return {
      temp: ''
    }
  },
  methods: {
    update () {
      let tags = ''
      if (this.user.tags.length === 0) {
        tags = [this.temp]
      } else {
        tags = this.user.tags
        tags.push(this.temp)
      }
      this.$store.dispatch('updateUser',tags)
      this.temp = ''
    },
    remove (i) {
      // console.log(i, '=========')
      let tags = this.user.tags
      // console.log(tags.splice(i, 1), '++++++++')
      this.$store.dispatch('updateUser',tags)
    },
    filter (query) {
      this.$store.commit('filterQues', query)
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>

</style>
