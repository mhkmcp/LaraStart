require("./bootstrap");

window.Vue = require("vue");
import moment from "moment";
import { Form, HasError, AlertError } from "vform";

window.Form = Form;

import VueRouter from "vue-router";

Vue.use(VueRouter);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);

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
