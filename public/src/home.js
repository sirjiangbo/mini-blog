import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from './components/Home.vue'

Vue.use(VueRouter);

import List from './components/List.vue'

const router = new VueRouter({
    routes: [
    	{ path: '/list',component: List },
    ]
});

new Vue({
    el: '#homeRoot',
    router,
    render: h => h(Admin)
});