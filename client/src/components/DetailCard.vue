<template>
  <v-container py-1 my-1 px-0 fluid>
    <v-card>
      <v-layout>
        <v-flex xs1>
          <v-layout column class="text-xs-center">
              <v-flex xs4>
                <v-btn icon @click="vote('upvote')">
                  <v-icon>
                      arrow_upward
                  </v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs4>
                {{data.count}}
              </v-flex>
              <v-flex xs4>
                <v-btn icon @click="vote('downvote')">
                  <v-icon>
                      arrow_downward
                  </v-icon>
                </v-btn>
              </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs11>
          <v-card-text v-html="data.description"/>
          <v-card-text>
            <div v-if="data.tags">
              <v-chip v-for="(tag, i) in data.tags" :key="i" color="orange" text-color="white" @click="tagClick(tag)" small>{{tag}}</v-chip>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="edit" v-if="data.userId === userId">
              update
            </v-btn>
            <v-btn @click="deleteData" v-if="!data.questionId && data.userId === userId">
              delete
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapState } from 'vuex'
import Swal from 'sweetalert2'

export default {
    props: ['data'],
    computed: mapState([
      'userId',
      'isLogin'
    ]),
    methods: {
      vote(status) {
        if (this.isLogin) {
          let data = ''
          if (this.data.questionId) {
            data = 'answers'
          } else {
            data = 'questions'
          }
          this.$emit('vote', {status, data, id: this.data._id})
        } else {
          Swal.fire({
            type: 'info',
            title: "Please Login First"
          })
        }
      },
      deleteData() {
        this.$store.dispatch('deleteData', this.data._id)
      },
      edit() {
        let data = ''
        if (this.data.questionId) {
          data = 'answers'
        } else {
          data = 'questions'
        }
        console.log(this.data._id);
        router.push({ name: 'editPost', params: { data: data, id: this.data._id }})
      },
      tagClick(tag) {
        this.$router.push({name: 'home', query: {query: tag}})
      }
    },
}
</script>