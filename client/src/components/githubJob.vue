<template>
    <div class="row border p-3 watched-tag mt-4" style="overflow-y: scroll; height: 55vh;">
            <h5>
                Jobs you might be interested
            </h5>
          <!-- <img v-if="!jobs" style="height: 80%; width: 100%"  src="http://68.media.tumblr.com/4bd01882ca1df3a02f5940e0ee786292/tumblr_onrdjr4P9r1uf5j8co1_500.gif" alt=""> -->
          <img v-if="!jobs" style="height: 80%; width: 100%" src="http://pluspng.com/img-png/free-gifs-and-png-the-simpsons-animated-gif-320.gif">
          <b-card v-for="(job, i) in jobs" :key="i">
              <div class="row">
                <b-card-title class="col"> <a :href="job.url" style="color: rgb(0,38,77)"> {{ job.title }} </a></b-card-title>
                  <div class="col-3">
                      <img :src="job.company_logo">
                  </div>
              </div>
            <b-card-sub-title> <a :href="job.company_url"> {{ job.company }} </a></b-card-sub-title>
            <b-card-text class="crop" v-html="job.description">
            </b-card-text>

            <div v-html="job.how_to_apply"></div>
            <b-card-text class="text-right"> {{ job.location }} </b-card-text>
        </b-card>
      </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'githubJob',
  computed: {
    ...mapState(['jobs'])
  }

}
</script>

<style>

</style>
