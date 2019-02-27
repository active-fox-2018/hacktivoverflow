<template>
  <div class="comment">
    <h4 v-html="ans.description"></h4>
    <vs-row class="votebuttons">
      <vs-button
        type="gradient"
        color="success"
        icon="arrow_upward"
        size="small"
        @click.prevent="ansUpvote"
      ></vs-button>&ensp;
      <div style="width: 30px;">
        <h2></h2>
      </div>&ensp;
      <vs-button
        type="gradient"
        color="danger"
        icon="arrow_downward"
        size="small"
        @click.prevent="ansDownvote"
      ></vs-button>&ensp;
    </vs-row>
  </div>
</template>

<script>
export default {
  props: ["ans"],
  created() {

  },
  name: "answercard",
  data() {
    return {};
  },
  methods: {
    ansUpvote() {
      this.$store.dispatch('ansUpvote', this.ans)
    },
    ansDownvote() { 
      this.$store.dispatch('ansDownvote', this.ans)
    }
  },
  computed: {}
};
</script>

<style>
.comment {
  background-color: rgba(130, 132, 133, 0.692);
  padding: 2%;
  min-height: 200px;
  display: flex;
}

.votebuttons {
  justify-content: flex-end;
  display: flex;
}
</style>
