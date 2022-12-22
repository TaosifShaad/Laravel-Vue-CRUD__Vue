<template>
  <div :class="theme && 'night'">
    <button class="theButtonTheme" v-if="theme" @click="changeTheme()">☀️</button>
    <button class="theButtonTheme" v-if="!theme" @click="changeTheme()">🌙</button>
  <navbar :theme="theme"></navbar>
  <!-- <emp v-show="false" :theme="theme"></emp> -->
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
  // import { useComposition } from '@/components/EmployeeView.vue';
  import footerC from '@/components/footerC.vue';
  import navbar from '@/components/navbar.vue';
  // import emp from '@/components/EmployeeView.vue';
  
  // location.reload();
  export default {
    components: {
      navbar,
      footerC,
    },
    setup () {
      const state = reactive({
        loggedIn: true,
        theme: false
      })

      check();

      // const { bool } = useComposition();
      // console.log(bool);

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
        // bool
      }
    }
  }
  export const useComposition = function() {
      const state = reactive({
          bool: true
      })
      function changeThemeTable() {
        state.bool = !state.bool;
        console.log('from useComp')
      }
      return {
          ...toRefs(state),
          changeThemeTable
      }
  }
</script>

<style>

.night {
  background-color: rgb(31, 31, 31);
  transition: background-color 0.5s;
}
div:not(.night) {
  transition: background-color 0.5s;
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

.theButtonTheme {
  position: absolute;
  top: 26px;
  z-index: 1;
  right: 46%;
  border-radius: 50%;
  padding: 2px 9px;
  border-color: cornsilk;
  font-size: 25px;
}

</style>
