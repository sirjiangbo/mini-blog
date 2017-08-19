import Vue from 'vue'
import VueRouter from 'vue-router'
import MuseUI from 'muse-ui'
import store from './store'
import Admin from './components/Admin.vue'

import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

Vue.use(MuseUI);
Vue.use(VueRouter);

import PostList from './components/PostList.vue'
import PostAdd from './components/PostAdd.vue'

const router = new VueRouter({
    routes: [
        { path: '/post/list',component: PostList },
        { path: '/post/add',component: PostAdd }
    ]
});

new Vue({
    el: '#adminRoot',
    store,
    router,
    render: h => h(Admin)
});