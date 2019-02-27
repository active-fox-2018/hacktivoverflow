<template>
  <div id="app">
    <q-layout view="hHh Lpr fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title style="cursor:pointer">
          <span  @click="changePath('/')">Mini Overflow</span>
        </q-toolbar-title>
        <q-icon v-if="!userToken" @click="showDialog = true" @close-dialog="showDialog = false" name="fas fa-sign-in-alt fa-2x" style="cursor:pointer">
          <Tooltip :text="'Sign In'"></Tooltip>
        </q-icon>
        <q-icon v-if="userToken" @click="signOut" name="fas fa-sign-out-alt fa-2x" style="cursor:pointer">
          <Tooltip :text="'Sign Out'"></Tooltip>
        </q-icon>
      </q-toolbar>
    </q-header>

    <SideBar :side="'left'"></SideBar>

    <q-page-container >
      <div class="q-pa-md">
        <div class="row">
          <div class="col-8">
            <router-view />
          </div>
          <div class="col">
            <q-card class="my-card ">
              <q-card-section class="text-white bg-primary">
                <div class="text-h6">Watched Tags</div>
              </q-card-section>

              <q-card-section>
                <div v-for="(tag,index) in watchedTags" :key="index" class="row">
                  <Chip :text="tag.name"></Chip>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <FormDialog @close-dialog="showDialog = false" @changestatus="showDialog = false" :showDialog="showDialog"></FormDialog>
    </q-page-container>
  </q-layout>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import FormDialog from './components/FormDialog.vue'
import {mapState} from 'vuex'
import Tooltip from './components/Tooltip.vue'
import Chip from './components/Chip.vue'

export default {
  data () {
    return {
      showDialog: false
    }
  },
  computed: {
    ...mapState([
      'userToken',
      'watchedTags'
    ])
  },
  created () {
    this.$store.commit('tokenUser')
    this.$store.dispatch('getWatchedTags')
  },
  components: {
    SideBar,
    FormDialog,
    Tooltip,
    Chip
  },
  methods: {
    signOut() {
      this.$store.commit('signOutUser')
    },
    changePath(path) {
      this.$router.push({path: path})
    }
  }
}

</script>

