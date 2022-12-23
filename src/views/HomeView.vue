<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <p v-if="success">Success</p>
  <form class="imgForm" enctype="multipart/form-data" @submit.prevent="submitForm">
      <input type="file" @change="onChange" />
      <button type="submit">Upload</button>
  </form>
  <img :src="path" alt="">
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { reactive, toRefs } from 'vue';
import axios from '@/services/axios';
import storage from '@/services/storage';
import { file } from '@babel/types';

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  setup() {
    const state = reactive({
      file: '',
      success: false,
      path: ''
    });

    const onChange = (e) => {
      state.file = e.target.files[0];
    }

    const submitForm = (e) => {
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      let data = new FormData();
      data.append('file', state.file);
      axios.post('/upload', data, config)
      .then(function(res) {
        // state.success = res.data.success;
        console.log(res)
        // state.path = res
      })
      .catch(function(error) {
        console.log(error);
        output = error;
      })
    }

    return {
      ...toRefs(state),
      onChange,
      submitForm
    }
  } 
}
</script>

<style scoped>
.imgForm {
    margin-block-start: 8%;
}
</style>
