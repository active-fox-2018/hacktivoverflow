<template>
    <div>
        <register v-if="this.$route.name == 'register'"/>
        <login v-if="this.$route.name == 'login'"/>
        <ask v-if="this.$route.name == 'ask'"/>
        <editQ v-if="this.$route.name == 'editQues'" />
    </div>
</template>

<script>
import register from '@/components/register.vue'
import login from '@/components/login.vue'
import ask from '@/components/ask.vue'
import editQ from '@/components/editQues.vue'

export default {
  name: 'formPage',
  components: {
    register,
    login,
    ask,
    editQ
  }
}
</script>

<style>

</style>
