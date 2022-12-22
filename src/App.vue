<template>
  <div :class="theme && 'night'">
    <button @click="changeTheme">theme</button>
  <navbar :theme="theme"></navbar>
  <nav>
    <!-- <router-link to="/">Home</router-link> | -->
    <!-- <router-link v-if="!bool" to="/register">Register</router-link> | -->
    <!-- <router-link v-if="loggedIn" to="/register">Register</router-link> | -->
    <!-- <router-link v-if="!bool" to="/login">Login</router-link> | -->
    <!-- <router-link v-if="loggedIn" to="/login">Login</router-link> | -->
    <!-- <router-link v-if="bool" to="/empview">Employees</router-link> -->
    <!-- <router-link v-if="!loggedIn" to="/empview">Employees</router-link> -->
  </nav>
  <router-view/>
  <footer-c :theme="theme"></footer-c>
</div>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  import storage from '@/services/storage';
  import { useComposition } from '@/components/EmployeeView.vue';
  import footerC from '@/components/footerC.vue';
  import navbar from '@/components/navbar.vue'
  
  // location.reload();
  export default {
    components: {
      navbar,
      footerC
    },
    setup () {
      const state = reactive({
        loggedIn: true,
        theme: true
      })

      check();

      // const { bool } = useComposition();
      // console.log(bool);
      const { bool } = useComposition();
      console.log(bool);

      // check();

      function changeTheme() {
        state.theme = !state.theme;
      }

      function check() {
        console.log('-----');
        if (storage.getItem('token')) {
          state.loggedIn = false;
        } else {
          state.loggedIn = true;
        }
      }
    
      return {
        ...toRefs(state),
        changeTheme,
        check,
        bool
        // bool
      }
    }
  }
</script>

<style>

.night {
  background-color: rgb(31, 31, 31);
}

.day {
  background-color: white;
}

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
