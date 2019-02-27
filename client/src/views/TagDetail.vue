<template>
  <div>
    <h4>{{tagDetail.name}}</h4>
    <br>
    <q-btn @click="watchTag" style="height:12px" icon="fas fa-eye">   Watch Tag</q-btn>
    <List :questions="tagDetail.questions"></List>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import List from '../components/List.vue'

export default {
  name: 'TagDetail',
  computed: {
    ...mapState([
      'tagDetail',
      'watchedTags'
    ])
  },
  created() {
    this.$store.dispatch('seeTagQuestion', this.$router.currentRoute.params.tagName)
  },
  components: {
    List
  },
  methods: {
    watchTag() {
      let isWatched = false
      this.watchedTags.forEach(tag => {
        if (tag.name === this.tagDetail.name) {
          isWatched = true
        }
      })
      if (isWatched) {
        this.$q.notify({ color: 'negative', message: "You have watched this tag", position: 'top' })
      } else {
        this.$store.dispatch('watchATag', {tagId: this.tagDetail._id})
        this.$store.dispatch('getWatchedTags')
        this.$route.push({path: `/tag/${this.tagDetail.name}`})
      }
    }
  }
}
</script>