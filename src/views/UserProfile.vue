<template>
    <div class="profile">
        <h3>name: {{ state.user.name }}</h3>
        <h3>mail: {{ state.user.email }}</h3>
        <h3>Account create at: {{ new Date(state.user.created_at).toLocaleString('en-GB', {timeZone: 'UTC'})}}</h3>
        <form @submit.prevent="deleteAcc" action="">
            <input name="id" :value="state.id.key" type="hidden" />
            <button class="btn btn-danger mt-4">Delete account</button>
        </form>
    </div>
</template>

<script setup>
import storage from '@/services/storage';
import { reactive } from 'vue';
import axios from '@/services/axios';
import router from '@/router';

const state = reactive({
    user: storage.getItem('user'),
    id: {
        key: storage.getItem('user').id
    }
});

function deleteAcc() {
    axios.post("/delete", state.id)
            .then(
                ({data}) => {
                    // toaster.success('Data Added Successfully!', {
                    //     position: 'bottom-right',
                    // })
                    storage.clearItem('token');
                    storage.clearItem('user');
                    return router.push({path: '/login'});
                }
            ).catch(error => {
                toaster.error(error.message, {
                    position: 'top-right'
                })
            });
}
</script>

<style scoped>
.profile {
    padding: 73px;
    max-width: 1450px;
    text-align: left;
    margin-top: 4%;
    margin-left: 78px;
    background: #f1f1f1;
    box-shadow: 0px 0px 11px 0px grey;
}
</style>