<template>
    <div :class="theme && 'nightFooter'" class="container">
        <footer class="pt-5">
            <div class="row">
                <div class="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Home</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Features</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Pricing</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>

                <div class="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Home</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Features</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Pricing</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>

                <div class="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Home</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Features</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">Pricing</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                    <li class="nav-item mb-2"><a :class="theme && 'list-items'" href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>

                <div class="col-md-5 offset-md-1 mb-3">
                    <form>
                    <h5 :class="theme && 'subscribe-night'">Subscribe to our newsletter</h5>
                    <p :class="theme && 'subscribe-night'">Monthly digest of what's new and exciting from us.</p>
                    <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                        <label for="newsletter1" class="visually-hidden">Email address</label>
                        <input :class="theme && 'foot-input'" id="newsletter1" type="text" class="form-control" placeholder="Email address">
                        <button class="btn btn-primary" type="button">Subscribe</button>
                    </div>
                    </form>
                </div>
            </div>

            <div class="d-flex flex-column flex-sm-row justify-content-center py-4 my-4 border-top footLine">
                <p>&copy; 2022 Company, Inc. All rights reserved.</p>
                <!-- <ul class="list-unstyled d-flex">
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"/></svg></a></li>
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"/></svg></a></li>
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"/></svg></a></li>
                </ul> -->
            </div>
        </footer>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    props: {
        theme: Boolean
    },
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
.subscribe-night {
    color: whitesmoke;
    transition: color 0.5s;
}
h5:not(.subscribe-night), p:not(.subscribe-night) {
    transition: color 0.5s;
} 
.foot-input {
    background-color: rgb(140, 140, 140) !important;
    color: whitesmoke !important;
    transition: background-color 0.5s !important;
}
input:not(.foot-input) {
    transition: background-color 0.5s !important;
}
.foot-input::placeholder {
    color: white !important;
    transition: 0.5s;
}
input::placeholder {
    transition: 0.5s;
}
.list-items {
    color: cornflowerblue !important;
    transition: color 0.5s;
}
a:not(.list-items) {
    transition: color 0.5s;
}
.nightFooter {
    background-color: black !important;
    color: wheat !important; 
    transition: background-color 0.5s;
}

div:not(.nightFooter) {
    transition: background-color 0.5s;
}
.container {
    background-color: lightgrey;
    /* color: white; */
    max-width: -webkit-fill-available;
    padding: 0 98px;
    margin-block-start: 104px;
    height: 400px;
}

.bi {
    vertical-align: -.125em;
    fill: currentColor;
}

.nav {
    display: flex;
    /* flex-wrap: nowrap; */
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
}

.footLine {
    border-color: black !important;
}
</style>