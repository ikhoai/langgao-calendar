<template>
  <div class="app">
    <div class="title">
      Lịch hoạt động Làng Gạo
      <button class="admin-btn" @click="checkAdminAccess">Admin</button>
    </div>  
    <nav class="nav">
      <router-link to="/">Calendar</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    checkAdminAccess() {
      const input = prompt('Please enter admin access code:');
      if (input === '99999999') {
        this.$router.push('/admin');
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
}

.admin-btn {
  font-size: 14px;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
}

.admin-btn:hover {
  background-color: #45a049;
}
</style>