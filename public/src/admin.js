import Vue from 'vue'
import store from './store'
import Admin from './components/Admin.vue'

new Vue({
    el: '#adminRoot',
    store,
    render: h => h(Admin)
});