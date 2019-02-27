<template>
  <q-list bordered class="rounded-borders" style="">
    <q-item-label v-if="this.$router.currentRoute.path === '/questions'" header>All Questions</q-item-label>
    <q-item-label v-else header>Top Questions</q-item-label>
    <q-btn @click="changePath('/form')" style="" color="black" label="Ask Question" />

    <q-item v-for="(question,index) in questions" :key="index">
      <q-item-section avatar top>
        <q-item-label class="q-mt-sm text-h6" style="align-self:center">{{calculateVote(question.upvotes, question.downvotes)}}</q-item-label>
        <q-item-label class="q-mt-sm">Votes</q-item-label>
      </q-item-section>

      <q-item-section top class="col-1 gt-sm" style="align-content:center">
        <q-item-label class="q-mt-sm text-h6" style="align-self:center">{{question.answers.length}}</q-item-label>
        <q-item-label class="q-mt-sm">Answers</q-item-label>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span style="cursor:pointer" @click="changePath(`/detail/${question._id}`)" class="text-weight-medium text-h6">{{question.title}}  </span>
          <q-icon v-if="isBeingWatched(question.tags)" style="color: red" name="fas fa-eye"></q-icon>
        </q-item-label>
        <q-item-label caption lines="1">
          <p class="text-weight-medium">@{{question.user.username}}</p>
        </q-item-label>
        <q-item-label class="row">
          <div v-for="(tag, index) in question.tags" :key="index">
            <Chip class="col-1" :text="tag"></Chip>
          </div>     
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />
  </q-list>
</template>

<script>
import { mapState } from 'vuex'
import Chip from './Chip.vue'

export default {
    name: 'List',
    props: ['questions'],
    computed: {
      ...mapState([
        'answers',
        'watchedTags'
      ])
    },
    methods: {
      calculateVote (upvotes, downvotes) {
        return upvotes.length - downvotes.length
      },
      changePath(path) {
        this.$router.push({path: path})
      },
      isBeingWatched(tags) {
        let isWatched = false
        this.watchedTags.forEach(tag => {
          tags.forEach(t => {
            if (tag.name === t) {
              isWatched = true
            }
          })
        })
        if (isWatched) {
          return true
        } else {
          return false
        }
      }
    },
    components: {
      Chip
    }
}
</script>

<style>

</style>
