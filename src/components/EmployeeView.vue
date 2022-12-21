<template>
    <nav>
        <!-- <router-link to="/register">Register</router-link> | 
        <router-link to="/login">Login</router-link> -->
        <!-- <loginComponent></loginComponent> -->
    </nav>
    <div class="totalContent">
        <!-- <button @click="logout">logout</button> -->
        <form @submit.prevent="save">
            <div class="mb-3 row">
                <label for="name" class="col-sm-2 col-form-label">Employee Name</label>
                <div class="col-sm-10">
                    <input id="name" v-model="employeeObj.name" type="text" class="form-control" placeholder="Enter Name">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="street-address" class="col-sm-2 col-form-label">Employee Address</label>
                <div class="col-sm-10">
                    <input id="street-address" v-model="employeeObj.address" type="text" class="form-control" placeholder="Enter Address">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Employee Contact</label>
                <div class="col-sm-10">
                    <input v-model="employeeObj.mobile" type="tel" class="form-control" placeholder="Enter Contact No.">
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <div>
            <h2>Employee View</h2>
        </div>
        
        <table class="table table-secondary">
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
                <tr v-for="employeeObj in result" :key="employeeObj.id">
                <th scope="row">{{ employeeObj.id }}</th>
                <td>{{ employeeObj.name }}</td>
                <td>{{ employeeObj.address }}</td>
                <td>{{ employeeObj.mobile }}</td>
                <td>
                    <button @click="edit(employeeObj)" type="button" class="btn btn-dark">edit</button>
                    <button @click="deleteData(employeeObj)" type="button" class="btn btn-danger">delete</button>
                </td>
                </tr>
            </tbody>
        </table>
        <div v-if="loading" class="text-center">
            <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import axios from '@/services/axios';
import storage from '@/services/storage';
import router from "@/router";
import { createToaster } from "@meforma/vue-toaster";
// import alertify from '@/alertifyjs/alertify';

export default {
    setup () {
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
        });

        const toaster = createToaster({ /* options */ });

        employeeLoad();

        function employeeLoad() {
            state.loading = true;
            axios.get('/employeess')
            .then(
                ({data}) => {
                    state.result = data;
                    state.loading = false;
                }
            ).catch(error => {
                // toaster.error(error.message, {
                //     position: 'top-right'
                // })
                // alertify.alert(error.message);
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
                        position: 'top-right',
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
                        position: 'top-right'
                    })
                    employeeLoad();
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
                        position: 'top-right'
                    })
                    employeeLoad();
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

            // console.log(response.success);
            
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

        // function register() {
        //     const page = "http://127.0.0.1/api/register";
        //     axios.post(page, state.registerObj)
        //     .then(
        //         ({data}) => {
        //             console.log(data);
        //         }
        //     );
        // }
    
        return {
            ...toRefs(state),
            save,
            edit,
            deleteData,
            logout
            // register
        }
    }
}
export const useComposition = function() {
    const state = reactive({
        bool: storage.getItem('user')? true : false
    })
    return {
        ...toRefs(state),
    }
}
</script>

<style scoped>
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
.btn-dark {
    margin-inline-end: 16px;
}
button {
    cursor: pointer;
}

/* button:hover { */
    /* letter-spacing: 0.25em; */
/* } */
</style>