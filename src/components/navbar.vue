<template>
    <div>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <img alt="Vue logo" src="../assets/70a5a28358a0f80718ac4f6737f018ae.png">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success me-4" type="submit">Search</button>
                    </form>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" @click="checkUser">
                            Dropdown
                        </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item">{{user}}</a></li>
                        <li><a class="dropdown-item">Billing</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a v-if="log" class="dropdown-item" @click="logout">logout</a></li>
                    </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page"><router-link to="/">Home</router-link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><router-link to="/register">Register</router-link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><router-link to="/login">Login</router-link></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"><router-link to="/empview">Employees</router-link></a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import axios from '@/services/axios';
import storage from '@/services/storage';
import router from "@/router";
import { createToaster } from "@meforma/vue-toaster";

export default {
    setup () {
        const state = reactive({
            user: storage.getItem('user')? storage.getItem('user').name : 'No user',
            log: false,
            newVar: 'No User'
        })

        function checkUser() {
            state.user = storage.getItem('user')? storage.getItem('user').name : 'No user';
            state.log = storage.getItem('user')? true : false
        }

        const toaster = createToaster({ /* options */ });

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
                    position: 'top-right'
                });
                return router.push({path: '/login'});
            }
            // alert(response.message);
            toaster.error(response.message, {
                position: 'top-right'
            })
        }
    
        return {
            ...toRefs(state),
            logout,
            checkUser,
        }
    }
}
</script>

<style scoped>
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
        padding-right: 150px;
    }
    .navbar {
        background-color: navajowhite;
        background-color: lightgray;
        /* padding: 0 20px; */
        padding-left: 20px;
        padding-right: 30px;
    }
</style>