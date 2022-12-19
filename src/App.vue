<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link v-if="loggedIn" to="/register">Register</router-link> |
    <router-link v-if="loggedIn" to="/login">Login</router-link> |
    <router-link to="/empview">Employees</router-link>
  </nav>
  <router-view/>
</template>

<script>
  import { reactive, toRefs } from 'vue'
  import storage from '@/services/storage'
  
  export default {
    setup () {
      const state = reactive({
        loggedIn: true,
      })

      check();


      function check() {
        if (storage.getItem('token')) {
          state.loggedIn = false;
        } else {
          state.loggedIn = true;
        }
      }
    
      return {
        ...toRefs(state),
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

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
