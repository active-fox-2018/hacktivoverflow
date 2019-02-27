<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height class="px-0 py-0">
        <v-layout class="blue-grey" align-center justify-center column>
          <h1 class="display-2 font-weight-bold mb-3 white--text">Mini Overflow</h1>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Authpage"
};
</script>

<style>
</style>
