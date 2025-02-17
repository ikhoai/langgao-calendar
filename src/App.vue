<template>
  <div class="app">
    <nav class="nav">
      <router-link to="/">Calendar</router-link> |
      <router-link to="/admin">Admin</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>