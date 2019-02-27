<template>
  <div>
    <!-- <navbar/> -->
    <div class="questionForm">
      <div class="form-group">
        <label class="col-form-label col-form-label-lg" for="inputLarge"></label>
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="Subject"
          id="inputLarge"
          v-model="title"
          v-if="!soonUpdated"
        >
        <input
          class="form-control form-control-lg"
          type="text"
          placeholder="Subject"
          id="inputLarge"
          v-model="title"
          v-else
        >
      </div>

      <froala
        :tag="'textarea'"
        :config="config"
        style="color: black !important;"
        v-model="description"
      ></froala>

      <vs-button class="button" color="success" type="gradient" size="large" @click.prevent="askQuestion" v-if="!soonUpdated">Ask</vs-button>
      <vs-button class="button" color="success" type="gradient" size="large" @click.prevent="updateQues" v-if="soonUpdated">Update</vs-button>
    </div>
  </div>
</template>

<script>
// import navbar from '@/components/navbar.vue'
import { mapState } from 'vuex'

export default {
  name: 'questionsForm',
  components: {
    // navbar
  },
  created () {
    if (this.soonUpdated) {
      this.title = this.soonUpdated.title,
      this.description = this.soonUpdated.description
    }
  },
  data () {
    return {
      title: '',
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
    askQuestion () {
      this.$store.dispatch('addQues', {
        title: this.title,
        description: this.description
      })
    },
    updateQues () {
      // console.log(this.title, this.description, this.soonUpdated._id)
      this.$store.dispatch('updateQuestion', {
        id: this.soonUpdated._id,
        title: this.title,
        description: this.description
      })
    }
  },
  computed: {
    ...mapState({
      soonUpdated: state => state.soonUpdated
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
  height: 400px;
}

.button {
  margin-top: 3%;
  width: 30%;
}

.vs-button-text {
  font-size: 18px;
}
</style>
