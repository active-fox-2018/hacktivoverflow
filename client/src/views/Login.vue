<template>
  <v-container>
    <form>
      <v-text-field v-model="email" label="E-mail"></v-text-field>
      <v-text-field v-model="password" label="Password" type="password"></v-text-field>
      <v-btn @click="submit">submit</v-btn>
    </form>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    submit() {
      let user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", user);
      this.clear();
    },
    clear() {
      this.email = "";
      this.password = "";
    }
  }
};
</script>