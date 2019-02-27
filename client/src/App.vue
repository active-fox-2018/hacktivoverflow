<template>
  <v-app>
    <Navbar/>
    <Content/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Content from '@/components/Content'

export default {
  name: 'App',
  components: {
    Navbar,
    Content
  },
  mounted() {
    this.$store.dispatch('checkLogin')
    this.$store.dispatch('getTags')
  },
  data () {
    return {
    }
  }
}
</script>
