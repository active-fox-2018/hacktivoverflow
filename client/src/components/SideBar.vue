<template>
  <q-drawer :width="200" v-model="left" side="left" bordered>
    <q-item @click="changeRoute('/')" clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="fas fa-home" />
      </q-item-section>

      <q-item-section>
        Home
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        Public
      </q-item-section>
    </q-item>

    <q-item @click="changeRoute('/questions')" clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="fas fa-globe-asia" />
      </q-item-section>

      <q-item-section>
        Mini Overflow
      </q-item-section>
    </q-item>
  </q-drawer>
</template>

<script>
export default {
  name: 'SideBar',
  data () {
    return {
      left: true
    }
  },
  methods: {
    changeRoute(route) {
      this.$router.push({path: route})
    }
  }
}
</script>

<style>

</style>
