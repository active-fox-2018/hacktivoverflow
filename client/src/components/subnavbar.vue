<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex flexbox>
              <span class="headline">Top Questions</span>
            </v-flex>
          </v-layout>
          <v-layout column align-end>
            <createQuestion
            v-if="isLogin"/>
            <v-layout>
              <v-btn flat color="blue">Interesting</v-btn>
              <v-btn flat color="blue">Hot</v-btn>
              <v-btn flat color="blue">New</v-btn>
            </v-layout>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import createQuestion from '@/components/createQuestion'

export default {
  components: {
    createQuestion
  },
  computed: {
    token () {
      return this.$store.state.token
    },
    questions () {
      return this.$store.state.questions
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>
