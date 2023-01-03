<template>
    <div>
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary update-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Edit profile
        </button>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 :class="theme.themeBtn && 'night-btn'" class="modal-title fs-5" id="staticBackdropLabel">Edit Profile</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="input"></slot>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <!-- <button type="button" class="btn btn-primary">Submit</button> -->
                        <slot name="submit"></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { themeToggle } from '@/stores/themeStore';
const theme = themeToggle();
</script>

<style scoped>
.update-btn {
    margin-top: 24px !important;
}
.night-btn {
    color: cornflowerblue;
}
</style>