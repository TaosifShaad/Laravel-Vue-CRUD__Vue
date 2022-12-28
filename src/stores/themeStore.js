import { reactive } from "vue";

export let themeToggle = reactive({
    themeBtn: false,
    toggle() {
        this.themeBtn = !this.themeBtn;
        console.log('toggling')
    }
})