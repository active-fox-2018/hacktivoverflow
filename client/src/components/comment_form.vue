<template>
  <div class="questionForm">
      <froala
        :tag="'textarea'"
        :config="config"
        style="color: black !important;"
        v-model="description"
      ></froala>

      <vs-button class="button" color="success" type="gradient" size="large" @click.prevent="addComment">Answer</vs-button>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'commentform',
  created () {
    
  },
  data () {
    return {
      config: {
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          }
        }
      },
      description: ''
    }
  },
  methods: {
    addComment () {
      console.log('===== answer')
      this.$store.dispatch('addComment', {
        description: this.description,
        questionId: this.theQuestion._id
      })
      
    }
  },
  computed: {
    ...mapState({
      theQuestion: state => state.theQuestion
    })
  }
}
</script>

<style>
p {
  color: black !important;
  font-size: 18px;
}

.questionForm {
  width: 80%;
  margin: auto;
  margin-top: 1%;
}

.fr-element {
  height: 160px;
  width: 60%
}

.button {
  margin-top: 3%;
  width: 30%;
}

.vs-button-text {
  font-size: 18px;
}
</style>
