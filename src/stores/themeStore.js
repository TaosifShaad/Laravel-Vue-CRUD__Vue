// import { reactive } from "vue";

// export let themeToggle = reactive({
//     themeBtn: false,
//     toggle() {
//         this.themeBtn = !this.themeBtn;
//         console.log('toggling')
//     }
// })

import { defineStore } from 'pinia';

export let themeToggle = defineStore('theme', {
    state() {
        return {
            themeBtn: false,
        }
    },
    actions: {
        toggle() {
            this.themeBtn = !this.themeBtn;
        }
    }
})