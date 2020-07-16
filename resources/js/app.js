require("./bootstrap");

window.Vue = require("vue");
import Swal from "sweetalert2";
import moment from "moment";
import VueProgressBar from "vue-progressbar";
import { Form, HasError, AlertError } from "vform";

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
        path: "/profile",
        component: () => import("./components/Profile.vue")
    },
    {
        path: "/users",
        component: () => import("./components/Users.vue")
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
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: "#app",
    router
});
