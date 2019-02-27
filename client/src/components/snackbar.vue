<template>
    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="blue"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  name: 'snackbar',
  data() {
    return {
      y: 'top',
      x: null,
      mode: '',
      snackbar: '',
      text: ''
    }
  }
}
</script>

<style>

</style>
