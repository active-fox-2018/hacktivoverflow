<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <question-card></question-card>
        <answer-add></answer-add>
        <div>
          <answer-card></answer-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionCard from "@/components/questionCard.vue";
import AnswerCard from "@/components/answerCard.vue";
import AnswerAdd from "@/components/answerAdd.vue";

export default {
  created() {
    db.collection("questions").onSnapshot(querySnapshot => {
      let questionData = [];
      querySnapshot.forEach(doc => {
        questionData.push({ id: doc.id, ...doc.data() });
      });
      this.questionData = questionData;
      console.log(this.questionData);
    });
  },
  components: {
    QuestionCard,
    AnswerCard,
    AnswerAdd
  }
};
</script>
