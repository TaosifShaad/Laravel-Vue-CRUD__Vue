<template>
    <div>
        <nav :class="theme && 'nightt'" class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <img alt="Vue logo" src="../assets/70a5a28358a0f80718ac4f6737f018ae.png">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <form class="d-flex" role="search">
                        <input :class="theme && 'nightInput'" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button :class="theme && 'nightButtonSearch'" class="btn btn-outline-success me-4" type="submit">Search</button>
                    </form>
                    
                    <li class="nav-item">
                        <a :class="theme && 'nightButton'" class="nav-link active" aria-current="page"><router-link to="/" :class="theme && 'nightButton'">Home</router-link></a>
                    </li>
                    <li v-if="log" class="nav-item">
                        <a :class="theme && 'nightButton'" class="nav-link"><router-link to="/register">Register</router-link></a>
                    </li>
                    <li v-if="log" class="nav-item">
                        <a :class="theme && 'nightButton'" class="nav-link"><router-link to="/login">Login</router-link></a>
                    </li>
                    <li v-if="!log" class="nav-item">
                        <a :class="theme && 'nightButton'" class="nav-link"><router-link :to="{ name: 'EmployeeView', params: { Theme: theme }}" :class="theme && 'nightButton'">Employees</router-link></a>
                    </li>
                    <li class="nav-item dropdown">
                        <a :class="theme && 'nightButton'" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" @click="checkUser">
                            {{user}}
                        </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item">{{profile}}</a></li>
                        <li><a class="dropdown-item">Billing</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a v-if="!log" class="dropdown-item" @click="logout">logout</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
    </div>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
import axios from '@/services/axios';
import storage from '@/services/storage';
import router from "@/router";
import { createToaster } from "@meforma/vue-toaster";
import { useRoute } from 'vue-router';

export default {
    props: {
        theme: Boolean
    },
    setup () {
        const state = reactive({
            user: storage.getItem('user')? storage.getItem('user').name : 'No user',
            log: false,
            profile: ''
        })
        
        const route = useRoute()

        function checkUser() {
            state.user = storage.getItem('user')? storage.getItem('user').name : 'No user';
            state.log = storage.getItem('user')? false : true;
            state.profile = storage.getItem('user')? storage.getItem('user').name + "'s profile " : 'No user'
        }

        const toaster = createToaster({ /* options */ });

        checkUser()

        async function logout() {
            const {data: response} = await axios.post("/logout")
            .catch(error => {
                toaster.error(error.message, {
                    position: 'top-right'
                })
            })
            
            if (response.success) {
                storage.clearItem('token');
                storage.clearItem('user');
                toaster.success('Logged Out Successfully!', {
                    position: 'bottom-right'
                });
                checkUser();
                return router.push({path: '/login'});
            }
            // alert(response.message);
            toaster.error(response.message, {
                position: 'top-right'
            })
        }

        watchEffect(() => {
                if (route.path) {
                    checkUser()
                }
            }
        )
    
        return {
            ...toRefs(state),
            logout,
            checkUser,
        }
    }
}
</script>

<style scoped>
    .nightt {
        background-color:rgb(0, 0, 0) !important;
        transition: background-color 0.5s;
    }
    .nightInput {
        background-color: rgb(154, 154, 154) !important;
        color: white !important;
        transition: background-color 0.5s;
    }
    .nightButton {
        color: white !important;
        transition: background-color 0.5s;
    }
    .nightButton.router-link-exact-active {
        color: #ebdd73 !important;
        transition: background-color 0.5s;
    }
    .nightButtonSearch {
        color: whitesmoke !important;
        border-color: white !important;
        transition: background-color 0.5s;
    }
    /* div:not(.nightt):not(.nightButtonSearch):not(.nightButton):not(.nightInput) {
        transition: background-color 0.5s !important;
    } */
    nav:not(.nightt) {
        transition: background-color 0.5s !important;
    }
    input:not(.nightInput) {
        transition: background-color 0.5s !important;
    }
    button:not(.nightButtonSearch) {
        transition: background-color 0.5s !important;
    }
    img {
        width: 100px;
        border-radius: 15px;
    }
    a {
        text-decoration: auto;
        cursor: pointer;
    }
    input {
        /* margin-right: 200px; */
        padding-right: 124px;
    }
    .navbar {
        background-color: navajowhite;
        background-color: lightgray;
        /* padding: 0 20px; */
        padding-left: 20px;
        padding-right: 30px;
    }
    .dropdown-menu {
        left: -63px;
    }
    .btn-outline-success {
        color: darkblue;
        border-color: darkblue;
    }
    .btn-outline-success:hover {
        color: white;
        background-color: darkblue;
    }
</style>