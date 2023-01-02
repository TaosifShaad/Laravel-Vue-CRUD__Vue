<template>
    <nav>
    </nav>
    <div class="totalContent">
        <form :class="theme.themeBtn && 'night-table'" @submit.prevent="save">
            <div class="mb-3 row">
                <label for="name" class="col-sm-2 col-form-label">Employee Name</label>
                <div class="col-sm-10">
                    <input :class="theme.themeBtn && 'night-input-field'" id="name" v-model="state.employeeObj.name" type="text" class="form-control" placeholder="Enter Name">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="street-address" class="col-sm-2 col-form-label">Employee Address</label>
                <div class="col-sm-10">
                    <input :class="theme.themeBtn && 'night-input-field'" id="street-address" v-model="state.employeeObj.address" type="text" class="form-control" placeholder="Enter Address">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Employee Contact</label>
                <div class="col-sm-10">
                    <input :class="theme.themeBtn && 'night-input-field'" v-model="state.employeeObj.mobile" type="tel" class="form-control" placeholder="Enter Contact No.">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <div>
            <h2 :class="theme.themeBtn && 'table-heading'" style="color: grey">Employee View</h2>
        </div>
        <div v-if="state.loading" class="text-center loading-div">
            <div class="spinner-border text-primary" style="width: 5rem; height: 5rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <table v-if="!state.loading" class="table" :class="theme.themeBtn? 'night-table-bg' : 'day-table-bg'">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Address</th>
                <th scope="col">Mobile</th>
                <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employeeObj, i) in state.result.data" :key="employeeObj.id">
                <th scope="row">{{ (state.page-1)*8 + (++i) }}</th>
                <td>{{ employeeObj.name }}</td>
                <td>{{ employeeObj.address }}</td>
                <td>{{ employeeObj.mobile }}</td>
                <td>
                    <button @click="edit(employeeObj)" type="button" class="btn" :class="theme.themeBtn? 'btn-warning' : 'btn-dark'">edit</button>
                    <button @click="deleteData(employeeObj)" type="button" class="btn btn-danger">delete</button>
                </td>
                </tr>
            </tbody>
        </table>
        <Bootstrap5Pagination class="page-num" align="center" :data="state.result" @pagination-change-page="employeeLoad"></Bootstrap5Pagination>
    </div>
</template>

<script setup>
import { reactive, toRefs, watchEffect, onMounted } from 'vue';
import axios from '@/services/axios';
import storage from '@/services/storage';
import router from "@/router";
import { createToaster } from "@meforma/vue-toaster";
// import { useComposition } from '@/App.vue';
import { useRoute } from 'vue-router';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import { themeToggle } from '@/stores/themeStore';
        const state = reactive({
            result: {},
            loginObj: {
                email: '',
                password: '',
            },
            employeeObj: {
                id: '',
                name: '',
                address: '',
                mobile: ''
            },
            loading: true,
            page: ''
        });

        const toaster = createToaster({ /* options */ });
        const route = useRoute();
        let theme = themeToggle();
        // const { bool } = useComposition();


        employeeLoad();

        function employeeLoad(page = 1) {
            state.loading = true;
            axios.get('/employees?page=' + page)
            .then(
                ({data}) => {
                    state.result = data;
                    state.page = page;
                    state.loading = false;
                }
            ).catch(error => {
                alertify.alert('Error!', error.message);
            });
        }

        function save() {
            state.loading = true;
            if (state.employeeObj.id == '') {
                saveData();
            } else {
                update();
            }
            state.loading = false;
        }

        function saveData() {
            axios.post("/save", state.employeeObj)
            .then(
                ({data}) => {
                    toaster.success('Data Added Successfully!', {
                        position: 'bottom-right',
                    })
                    employeeLoad();
                    state.employeeObj.name = '';
                    state.employeeObj.address = '';
                    state.employeeObj.mobile = '';
                    state.employeeObj.id = '';
                }
            ).catch(error => {
                toaster.error(error.message, {
                    position: 'top-right'
                })
            });
        }

        function edit(employeeObj) {
            state.employeeObj = employeeObj;
        }

        function update() {
            const page = "/update/" + state.employeeObj.id;
            axios.put(page, state.employeeObj)
            .then(
                ({data})=>{
                    state.employeeObj.name = '';
                    state.employeeObj.address = '';
                    state.employeeObj.mobile = '';
                    state.employeeObj.id = '';
                    toaster.info('Data Updated Successfully!', {
                        position: 'bottom-right'
                    })
                    employeeLoad(state.page);
                }
            ).catch(error => {
                toaster.error(error.message, {
                    position: 'top-right'
                })
            });
        }

        function deleteData(employeeObj) {
            const page = "/delete/" + employeeObj.id;
            axios.delete(page)
            .then(
                ({data})=>{
                    toaster.error('Data Deleted Successfully!', {
                        position: 'bottom-right'
                    })
                    employeeLoad(state.page);
                }
            ).catch(error => {
                toaster.error(error.message, {
                    position: 'top-right'
                })
            });
        }

        async function logout() {
            // toastr.info('Are you the 6 fingered man?')
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
                return router.push({path: '/login'});
            }
            toaster.error(response.message, {
                position: 'top-right'
            })
        }

        console.log(route.params.Theme);


        // onMounted(()=>{
        //     state.theme = route.params.Theme
        // })

        // watchEffect(() => {
        //         if (route.path) {
        //             state.theme = route.params.Theme
        //             // console.log(route.meta.data)
        //         }
        //     }
        // )
    

</script>

<style scoped>
.night-table {
    border-color: goldenrod !important;
    color: goldenrod !important;
    transition: border-color 0.5s, color 0.5s;
}
form:not(.night-table) {
    transition: 0.5s;
}
.night-input-field {
    background-color: grey !important;
    color: white !important;
    transition: background-color 0.5s, color 0.5s;
}
input:not(.night-input-field) {
    transition: 0.5s;
}
.night-input-field::placeholder {
    color: white !important;
    transition: color 0.5s;
}

input::placeholder {
    transition: color 0.5s;
}

.table-heading {
    color: wheat !important;
    transition: color 0.5s;
}
h2:not(.table-heading) {
    transition: 0.5s;
}
.day-table-bg {
    background-color: lightgrey !important;
    transition: background-color 0.5s, color 0.5s;
}
.night-table-bg {
    background-color: black !important;
    color: white !important;
    transition: background-color 0.5s, color 0.5s;
}
.page-num {
    background-color: grey !important;
}
a.page-link {
    background-color: #cbcbcb !important;
}
.table {
    /* font-family: 'Fira Sans Extra Condensed', sans-serif; */
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 18px;
    max-width: 1200px;
    margin: auto;
    margin-block-start: 22px;
    border: 1px solid white;
    margin-block-end: 30px;
}
form {
    font-family: 'Fira Sans Extra Condensed', sans-serif;
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    font-size: 17px;
    max-width: 1000px;
    margin: auto;
    margin-bottom: 100px;
    margin-top: 32px;
    border: 1px solid;
    padding: 56px;
    border-radius: 46px;
    padding-bottom: 19px;
    border-radius: 50px;
}
.btn-dark, .btn-warning {
    margin-inline-end: 16px;
}
button {
    cursor: pointer;
}
.loading-div {
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
}
</style>
