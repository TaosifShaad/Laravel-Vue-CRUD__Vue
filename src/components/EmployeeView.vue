<template>
<form @submit.prevent="save">
    <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Employee Name</label>
        <div class="col-sm-10">
            <input v-model="employeeObj.name" type="text" class="form-control" placeholder="Enter Name">
        </div>
    </div>
    <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Employee Address</label>
        <div class="col-sm-10">
            <input v-model="employeeObj.address" type="text" class="form-control" placeholder="Enter Address">
        </div>
    </div>
    <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Employee Contact</label>
        <div class="col-sm-10">
            <input v-model="employeeObj.mobile" type="text" class="form-control" placeholder="Enter Contact No.">
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
</template>

<script>
import { reactive, toRefs } from 'vue';
import axios from 'axios';

export default {
    setup () {
        const state = reactive({
            result: {},
            employeeObj: {
                id: '',
                name: '',
                address: '',
                mobile: ''
            }
        });

        employeeLoad();

        function employeeLoad() {
            const page = "http://127.0.0.1:8000/api/employees";
            axios.get(page)
            .then(
                ({data}) => {
                    console.log(data);
                    state.result = data;
                }
            )
        }

        function save() {
            if (state.employeeObj.id == '') {
                saveData();
            } else {
                update();
            }
        }

        function saveData() {
            axios.post("http://127.0.0.1:8000/api/save", state.employeeObj)
            .then(
                ({data}) => {
                    alert("saved");
                    employeeLoad();
                }
            );
        }

        function edit(employeeObj) {
            state.employeeObj = employeeObj;
        }

        function update() {
            const page = "http://127.0.0.1:8000/api/update/" + state.employeeObj.id;
            axios.put(page, state.employeeObj)
            .then(
                ({data})=>{
                    state.employeeObj.name = '';
                    state.employeeObj.address = '';
                    state.employeeObj.mobile = '';
                    state.employeeObj.id = '';
                    alert('updated!');
                    employeeLoad();
                }
            )
        }

        function deleteData(employeeObj) {
            const page = "http://127.0.0.1:8000/api/delete/" + employeeObj.id;
            axios.delete(page)
            .then(
                ({data})=>{
                    employeeLoad();
                }
            )
        }
    
        return {
            ...toRefs(state),
            save,
            edit,
            deleteData
        }
    }
}
</script>

<style lang="scss" scoped>

</style>