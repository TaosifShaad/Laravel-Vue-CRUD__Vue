<template>
  <div class="login">
    <form @submit.prevent="login" style="border:1px solid #ccc">
      <div class="container">
        <h1>Login</h1>
        <p>Sign in to your account.</p>
        <hr>

        <!-- <label for="email"><b>Email</b></label> -->
        <input v-model="postObj.email" type="text" placeholder="Enter Email" name="email" required>

        <!-- <label for="psw"><b>Password</b></label> -->
        <input v-model="postObj.password" type="password" placeholder="Enter Password" name="psw" required>
        
        <label>
          <input type="checkbox" checked="true" name="remember" style="margin-bottom:15px"> Remember me
        </label>
        
        <div class="clearfix">
          <button type="button" class="cancelbtn">Cancel {{ $route.path }}</button>
          <button type="submit" class="signupbtn">Sign in</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue';
import router from "@/router"
import axios from '@/services/axios';  
import storage from '@/services/storage';
import { createToaster } from "@meforma/vue-toaster";

export default {
    setup () {
        const state = reactive({
          postObj: {
            email: '',
            password: '',
          },
          userData: ''
        });

        const toaster = createToaster({ /* options */ });

        async function login() {
          const {data: response} = await axios.post("/login", state.postObj)
          .catch(error => {
            // alert(error.message)
            toaster.error(error.message, {
              position: 'top-right',
            })
          })
          
          if (response.success) {
            storage.setItem('token', response.data.token);
            storage.setItem('user', response.data.user);
            toaster.success('Welcome ' + storage.getItem('user').name, {
              position: 'top-right'
            });
            return router.push({path: '/empview'});
          }
          // alert(response.message);
          toaster.error(response.message, {
              position: 'top-right',
          })
        }
        
        return {
            ...toRefs(state),
            login
        }
    }
}
</script>

<style scoped>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

.signupbtn {
  background-color: #1999ff;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
    padding: 57px;
    max-width: 1000px;
    margin: auto;
    border: 1px solid;
    border-radius: 26px;
    margin-top: 50px;
    /* margin-bottom: 50px; */
}

form {
    height: 64vh !important;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
  .cancelbtn, .signupbtn {
      width: 100%;
  }
}
</style>