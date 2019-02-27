<template>
  <q-editor 
  v-model="description" 
  height="5rem"
  :toolbar="[
    [
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        list: 'only-icons',
        options: ['left', 'center', 'right', 'justify']
      },
      {
        label: $q.lang.editor.align,
        icon: $q.iconSet.editor.align,
        fixedLabel: true,
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    ['token', 'hr', 'link', 'custom_btn'],
    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
    ['undo', 'redo']
  ]"
  />
</template>

<script>
export default {
  name: 'Wysiwyg',
  data() {
    return {
      description: ''
    }
  },
  watched: {
    description () {
      this.$emit('description', this.description)
    }
  }
}
</script>

<style>

</style>
