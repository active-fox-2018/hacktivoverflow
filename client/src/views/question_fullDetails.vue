<template>
  <div>
    <vs-row vs-w="12" class="col">
      <vs-col class="col1 pt-1" vs-type="flex" vs-lg="2" vs-sm="4" vs-xs="12">
        <vs-row>
          <div class="tags">
            <h5>Tags:</h5>
          </div>
        </vs-row>
      </vs-col>

      <vs-col class="col2" vs-type="flex" vs-lg="10" vs-sm="4" vs-xs="12">
        <vs-row vs-justify="flex-end">

          <div class="details">
            <h1>{{ theQuestion.title }}</h1>
            <vs-divider/>
            <h4 v-html="theQuestion.description"></h4>
          </div>
          <div class="m-2 buttons">
            <vs-row>
              <vs-button type="gradient" color="success" icon="arrow_upward" @click.prevent="upvoteQues"></vs-button>&ensp;
              <div style="width: 30px;"><h1> {{ currentVotes }} </h1></div>&ensp;
              <vs-button type="gradient" color="danger" icon="arrow_downward" @click.prevent="downvoteQues"></vs-button>&ensp;
              <vs-button color="orange" color-text="black" icon="add_comment" @click.prevent="setCollapse"></vs-button>
            </vs-row>
          </div>
          <br>
          <div vs-justify="flex-start">
            <commentform class="commentform" v-if="collapse"/>
          </div>

          <div class="answercard" v-for="(ans, i) in theAnswers" :key="i">
            <answercard :ans="ans"/>
            <vs-divider />
          </div>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import answercard from '@/components/answer_card.vue'
import commentform from '@/components/comment_form.vue'
import { mapState } from 'vuex'

export default {
  name: `quesDetails`,
  created () {
    this.$store.dispatch('getAnswersbytheQuestion', this.theQuestion)
  },
  components: {
    answercard,
    commentform
  },
  data () {
    return {
      collapse: false,
    }
  },
  methods: {
    setCollapse () {
      if (!this.collapse) {
        this.collapse = true
      } else {
        this.collapse = false
      }
    },
    upvoteQues () {
      this.$store.dispatch('upvoteQues', this.theQuestion)
    },
    downvoteQues () {
      this.$store.dispatch('downvoteQues', this.theQuestion)
    }
  },
  computed: {
    ...mapState({
      theQuestion: state => state.theQuestion,
      currentVotes: state => state.currentVotes,
      theAnswers: state => state.theAnswers,
    })
  },
}
</script>

<style>
.col {
  padding: 10px;
  margin: auto;
}

.col1 {
  padding: 5px;
}

.col2 {
  padding: 5px;
}

.details {
  width: 100%;
  padding-left: 10px;
  padding-top: 10px;
  text-align: left;
  min-height: 200px;
  max-height: 450px;
  overflow: hidden;
  color: black;
  background-color: #d3d3d3;
}

.tags {
  padding: 10px;
  height: 100px;
  width: 100% !important;
  position: relative;
}

.commentform {
  width: 70%;
  background-color: white;
}

.buttons {
  width: 100%;
}

.answercard {
  width: 100%;
}
</style>
