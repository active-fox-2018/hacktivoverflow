<template>
  <q-chip style="cursor:pointer" @click="seeTag" dense clickable color="teal" text-color="white">
      {{text}}
  </q-chip>    
</template>

<script>
export default {
  name: 'Chip',
  props: ['text'],
  methods: {
    seeTag() {
      this.$router.push({path: `/tag/${this.text}`})
    }
  }
}
</script>

<style>

</style>
