<template>
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

    <div v-for="(ques, i) in allQuestions" :key="i" >
      <vs-divider/>
      <a @click.prevent="quesDetails(ques)">
      <qbuttons :ques="ques"/>
      <h4>{{ ques.title }}</h4>
      </a>
    </div>
      <vs-divider/>
  </div>
</template>

<script>
import qbuttons from '@/components/mini/qbuttons.vue'
// import mybuttons from '@/components/mini/mybuttons.vue';
import { mapState } from 'vuex'

export default {
  name: 'questionsList',
  created () {
    this.$store.dispatch('getAllQuestions')
  },
  components: {
    qbuttons
  },
  data () {
    return {}
  },
  methods: {
    addQuestion () {
      if (this.isLogin) {
        this.$router.push('/ask_question')
      } else {
        this.$router.push('/login')
      }
    },
    quesDetails (q) {
      this.$store.dispatch('getQues', q)
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin,
      allQuestions: state => state.allQuestions
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

h4 {
  float: left;
  margin-left: 3%;
}
</style>
