<template>
  <div>
    <div class="list">
      <!-- <h1 class="header">Top Questions</h1> -->
      <vs-button
        class="addButton"
        color="success"
        type="gradient"
        icon="add"
        size="large"
        @click.prevent="addQuestion"
      ></vs-button>

      <div class="quest" v-for="(ques, i) in myQuestions" :key="i">
        <vs-divider/>
        <a @click.prevent="quesDetails(ques)">
          <qbuttons :ques="ques"/>
          <div class="text">
            <h4>{{ ques.title }}</h4>
          </div>
        </a>

        <div class="qbuttons">
          <vs-button
            radius
            color="skyblue"
            type="filled"
            icon="create"
            size="small"
            @click="updateQuestion(ques)"
          ></vs-button>
          <vs-button
            radius
            color="orange"
            type="filled"
            icon="delete"
            size="small"
            class="ml-2"
            @click.prevent="deleteQuestion(ques)"
          ></vs-button>
        </div>
      </div>
      <vs-divider/>
    </div>
  </div>
</template>

<script>
import qbuttons from '@/components/mini/qbuttons.vue'
// import navbar from "@/components/navbar.vue";
import { mapState } from 'vuex'

export default {
  name: 'myQues',
  components: {
    qbuttons
    // navbar
  },
  created () {
    this.$store.dispatch('myQues')
  },
  data () {
    return {

    }
  },
  methods: {
    addQuestion () {
      if (this.isLogin) {
        this.$router.push('/ask_question')
      } else {
        this.$router.push('/login')
      }
    },
    updateQuestion (q) {
      // console.log(q)
      this.$store.commit('storeSoonUpdated', q)
      this.$router.push('/ask_question')
    },
    deleteQuestion (q) {
      this.$store.dispatch('deleteQuestion', q)
    },
    quesDetails (q) {
      this.$store.dispatch('getQues', q)
    }
  },
  computed: {
    ...mapState({
      myQuestions: state => state.myQuestions,
      isLogin: state => state.isLogin
    })
  }
}
</script>

<style>
.headers {
  text-align: right;
}

.list {
  width: 90%;
  margin-top: 10%;
  margin: auto;
  overflow: hidden;
}

.addButton {
  float: right !important;
  margin: 10px;
}

.text {
  text-align: left;
  margin-left: 3%;
}

.qbuttons {
  margin-right: 5px;
  float: right;
}
</style>
