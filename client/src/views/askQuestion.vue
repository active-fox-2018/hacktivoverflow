<template>
<v-layout row wrap>
  <v-flex xs12 class="pa-3">
  <formQnA/>
  </v-flex>
</v-layout>
</template>

<script>
import formQnA from '@/components/formQnA.vue'
export default {
  name: 'questionpage',
  components: {
    formQnA
  },
  data () {
    return {

    }
  }
}
</script>

