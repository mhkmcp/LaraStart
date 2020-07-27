require("./bootstrap");

window.Vue = require("vue");
import Swal from "sweetalert2";
import moment from "moment";
import VueProgressBar from "vue-progressbar";
import { Form, HasError, AlertError } from "vform";

import Gate from "./Gate";
Vue.prototype.$gate = new Gate(window.user);

window.Form = Form;
window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: toast => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
});

window.Toast = Toast;

import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

// let Fire = new Vue();
window.Fire = new Vue();

const options = {
    color: "#bffaf3",
    failedColor: "#874b4b",
    thickness: "5px",
    transition: {
        speed: "2s",
        opacity: "0.8s",
        termination: 700
    },
    autoRevert: true,
    location: "top",
    inverse: false
};

Vue.use(VueProgressBar, options);

const routes = [
    {
        path: "/dashboard",
        component: () => import("./components/Dashboard.vue")
    },
    {
        path: "/developer",
        component: () => import("./components/Developer.vue")
    },
    {
        path: "/profile",
        component: () => import("./components/Profile.vue")
    },
    {
        path: "/users",
        component: () => import("./components/Users.vue")
    },
    {
        path: "*",
        component: () => import("./components/NotFound.vue")
    }
];
/**
 * Components should be either of
() => import("./components/Dashboard.vue") 
or require("./components/Dashboard.vue").default
**/

const router = new VueRouter({
    mode: "history",
    routes // short for `routes: routes`
});

Vue.filter("capital", function(text) {
    return text[0].toUpperCase() + text.slice(1);
});

Vue.filter("myDate", function(created) {
    return moment(created).format("MMMM Do YYYY");
});

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component(
    "example-component",
    require("./components/ExampleComponent.vue").default
);

/**
 *
 * LARAVEL PASSPORT STUFF
 *
 * **/

Vue.component(
    "passport-clients",
    require("./components/passport/Clients.vue").default
);

Vue.component(
    "passport-authorized-clients",
    require("./components/passport/AuthorizedClients.vue").default
);

Vue.component(
    "passport-personal-access-tokens",
    require("./components/passport/PersonalAccessTokens.vue").default
);

Vue.component("not-found", require("./components/NotFound.vue").default);

Vue.component("pagination", require("laravel-vue-pagination"));

const app = new Vue({
    el: "#app",
    router,
    data: {
        search: ""
    },
    methods: {
        searchit: _.debounce(() => {
            console.log("searching UP");
            Fire.$emit("searching");
        }, 1000),

        printme() {
            window.print();
        }
    }
});
