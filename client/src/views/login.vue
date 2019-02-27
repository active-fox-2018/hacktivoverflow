<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
           <loginform @registerStatus="changeRegister" :registerStatus="registerStatus"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
import loginform from '@/components/loginform.vue'

  export default {
    data() {
      return { 
        registerStatus : false
      }
    },
    components: {
      loginform
    },
    methods: {
      changeRegister(payload) {
        this.registerStatus = payload
      }
    },
    props: {
      source: String
    }
  }
</script>

