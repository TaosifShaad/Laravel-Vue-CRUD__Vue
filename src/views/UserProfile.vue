<template>
    <div class="profile" :class="theme.themeBtn && 'night-profile'">
        <h3>name: {{ state.user.name }}</h3>
        <h3>email: {{ state.user.email }}</h3>
        <h3>Account created at: {{ new Date(state.user.created_at).toLocaleString('en-GB', { timeZone: 'UTC' }) }}</h3>
        <form @submit.prevent="deleteAcc" action="">
            <input name="id" :value="state.id.key" type="hidden" />
            <div>
                <modal>
                    <template #input>
                        <input v-model="state.newProfile.name" type="text" placeholder="name" name="name"> <br>
                        <input v-model="state.newProfile.email" type="text" placeholder="email" name="email">
                    </template>
                    <template #submit>
                        <button @click="updateProfile" type="button" class="btn btn-primary">Submit</button>
                    </template>
                </modal>
                <button class="btn btn-danger mt-4">Delete account</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import storage from '@/services/storage';
import { reactive } from 'vue';
import axios from '@/services/axios';
import router from '@/router';
import { createToaster } from "@meforma/vue-toaster";
import Swal from 'sweetalert2';
import { themeToggle } from '@/stores/themeStore';
import modal from '@/components/modal.vue'

const state = reactive({
    user: storage.getItem('user'),
    id: {
        key: storage.getItem('user').id
    },
    newProfile: {
        name: '',
        email: '',
        id: storage.getItem('user').id
    }
});

const theme = themeToggle();
const toaster = createToaster({});

function deleteAcc() {
    Swal.fire({
        title: 'Do you want to delete your Account?',
        icon: 'warning',
        showDenyButton: true,
        confirmButtonText: 'yes',
        denyButtonText: `no`,
    }).then((result) => {
        if (result.isConfirmed) {
            axios.post("/delete", state.id)
                .then(
                    ({ data }) => {
                        storage.clearItem('token');
                        storage.clearItem('user');
                        Swal.fire('Deleted Account!', '', 'success')
                        return router.push({ path: '/login' });
                    }
                ).catch(error => {
                    toaster.error(error.message, {
                        position: 'top-right'
                    })
                });
        } else if (result.isDenied) {
            Swal.fire('Cancelled', '', 'info')
        }
    }).catch(error => {
        toaster.error(error.message, {
            position: 'top-right'
        })
    });
}

function updateProfile() {
    axios.post("/updateProfile", state.newProfile)
        .then(
            ({ data }) => {
                console.log(data);
                storage.setItem('user', data);
                Swal.fire({
                    title: 'Updated profile!',
                    icon: 'success',
                    confirmButtonText: 'close',
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.go();
                    }
                })
            }
        ).catch(error => {
            toaster.error(error.message, {
                position: 'top-right'
            })
        });
}

// watch(state, newValue => {
//     // if (state.newProfile != newValue.newProfile) {
//         console.log('watch');
//         state.newProfile == newValue;
//     // }
// });
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

.night-profile {
    background: black;
    color: antiquewhite;
    box-shadow: 0px 0px 25px 4px black;
    transition: background 0.5s, color 0.5s, box-shadow 0.5s;
}

div:not(.night-profile) {
    transition: 0.5s;
}
</style>