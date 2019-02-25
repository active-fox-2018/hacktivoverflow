<template>
  <nav class="navbar sticky-top">
    <div class="container">
      <div class="row container">
        <div class="col-3">
          <router-link to="/">
            <h3>The Overflow</h3>
          </router-link>
        </div>
        <div class="col-6">
          <form>
            <input type="text" placeholder="search..." style="width:100%">
          </form>
        </div>
        <div class="col-3">
          <router-link to="/login">
            <button>Log In</button>
          </router-link>
          <router-link to="/register">
            <button>Sign Up</button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>

</style>
