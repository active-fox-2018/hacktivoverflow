<template>
      <div id="sidenav" class="col-3">
        <p><router-link to="/" ><i class="fas fa-book-reader"></i> Read </router-link></p>
        <p><router-link to="/create"><i class="fas fa-blog"></i> Create </router-link></p>
        <p><router-link to="/archieve" ><i class="fas fa-archive"></i> Archieve </router-link></p>
        <!-- <p><a href="#"><i class="fab fa-gratipay"></i> Favorite </a></p> -->
    </div>
</template>

<script>
export default {
    name : 'sidenav'
}
</script>
