<template>
  <div id="app" :class="status">
    <myNav />
    <router-view/>
  </div>
</template>

<style>
</style>

<script>
import myNav from '@/components/navBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
    myNav
  },
  data (){
    return {

    }
  },
  computed: {
    ...mapState(['user', 'status', 'time'])
  },
  created () {
    this.$store.dispatch('getAllQuestions')
    this.$store.dispatch('getJobs')
    this.$store.dispatch('getTime')
    if (localStorage.token) {
      this.$store.dispatch('getOneUser')
    }
    if (this.time > 18) {
      this.$store.commit('setStatus', 'night')
    }
  },
  watch: {
    user (val) {
      if (val) {
        if (val.tags.length !== 0) {
          this.$store.dispatch('getJobs', val.tags[0])
        }
      }
    },
    time (val) {
      console.log('time berubah ============')
      console.log(val)
      if (val > 18) {
        this.$store.commit('setStatus', 'night')
      } else {
         this.$store.commit('setStatus', 'day')
      }
    }
  }
}
</script>
