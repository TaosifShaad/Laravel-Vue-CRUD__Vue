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
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
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

export default {
    setup () {
        const state = reactive({
        })
    
        return {
            ...toRefs(state),
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