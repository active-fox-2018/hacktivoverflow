<template>
   <div class=" mt-3">
       <div class="row ml-3 mr-2 question-list" v-for="(ques, i) in allQuestions" :key="i">
           <hr>
           <div class="col-1">
               <h2 class="row ml-2">
                   {{ ques.answer.length }}
               </h2>
               <small>
                   answer
               </small>
           </div>
           <div class="col-1">
               <h2 class="row ml-2">
                {{ ques.upvotes.length - ques.downvotes.length }}
               </h2>
               <small>
                   votes
               </small>
           </div>
           <div class="col ml-1">
               <router-link style="color: rgb(29, 51, 77)" :to="{ name: 'quesDetail', params: { id: ques._id }}">
                    <h3 class="row">
                        {{ ques.title }}
                    </h3>
               </router-link>
               <div class="row">
                    <md-button style="background-color: rgb(222,232,235); max-height: 3vh" v-for="(tag, j) in ques.tags" :key="j" class="md-dense md-raised md-mini">{{ tag }}</md-button>
               </div>
               <div class="row justify-content-end">
                   <div class="col-6">
                       <small style="color: grey;">
                            asked by {{ ques.user.name }}
                            {{ new Date(ques.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' }) }}
                            {{ new Date(ques.createdAt).toLocaleTimeString()}}
                       </small>
                   </div>
               </div>
           </div>
            <hr>
       </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'questionCard',
  computed: mapState(['allQuestions']),
  created () {
    this.$store.dispatch('getAllQuestions')
  }
}
</script>

<style>

</style>
