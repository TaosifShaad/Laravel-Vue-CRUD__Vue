<template>
  <div class="register">
    <form :class="theme.themeBtn && 'night-table'" @submit.prevent="register" style="border:1px solid #ccc">
      <div class="container">
        <h1>Sign Up</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <!-- <label for="name"><b>Name</b></label> -->
        <input :class="theme.themeBtn && 'night-input-field'" v-model="state.registerObj.name" type="text" placeholder="Enter Name" name="name" required>

        <!-- <label for="email"><b>Email</b></label> -->
        <input :class="theme.themeBtn && 'night-input-field'" v-model="state.registerObj.email" type="text" placeholder="Enter Email" name="email" required>

        <!-- <label for="psw"><b>Password</b></label> -->
        <input :class="theme.themeBtn && 'night-input-field'" v-model="state.registerObj.password" type="password" placeholder="Enter Password" name="psw" required>

        <!-- <label for="psw-repeat"><b>Repeat Password</b></label> -->
        <input :class="theme.themeBtn && 'night-input-field'" v-model="state.registerObj.c_password" type="password" placeholder="Repeat Password" name="psw-repeat"
          required>

        <label>
          <input type="checkbox" checked="true" name="remember" style="margin-bottom:15px"> Remember me
        </label>

        <p style="color: grey">By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

        <div class="clearfix">
          <button type="button" class="cancelbtn">Cancel</button>
          <button type="submit" class="signupbtn">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios';
import { themeToggle } from '@/stores/themeStore';

const theme = themeToggle();
const state = reactive({
  registerObj: {
    name: '',
    email: '',
    password: '',
    c_password: ''
  }
});

function register() {
  const page = "http://127.0.0.1/api/register";
  axios.post(page, state.registerObj)
    .then(
      ({ data }) => {
        console.log(data);
      }
    );
}
</script>
  
<style scoped>
body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box
}

.night-table {
  border-color: rgb(156, 152, 144) !important;
  color: goldenrod !important;
  transition: border-color 0.5s, color 0.5s;
}

form:not(.night-table) {
  transition: 0.5s;
}

.night-input-field {
  background-color: darkgray !important;
  color: white;
  transition: background-color 0.5s;
}

input::placeholder {
  transition: 0.5s;
}

.night-input-field::placeholder {
  color: white;
  transition: 0.5s;
}

input:not(.night-input-field) {
  transition: 0.5s;
}

/* Full-width input fields */
input[type=text],
input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus,
input[type=password]:focus {
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
  opacity: 1;
}

.signupbtn {
  background-color: #1999ff;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {
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
  margin-bottom: 50px;
}

form {
  height: 88vh !important;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {

  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
</style>