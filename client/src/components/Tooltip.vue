<template>
  <q-tooltip
  transition-show="rotate"
  transition-hide="rotate"
  >
  {{text}}
  </q-tooltip>
</template>

<script>
export default {
  name: "Tooltip",
  props: ['text']
}
</script>

<style>

</style>
