import Vue from 'vue'
import store from './store'
import Dashboard from './components/Dashboard.vue'
import $Message from 'iview/src/components/message'

Vue.prototype.$Message = $Message;

new Vue({
    el: '#adminRoot',
    store,
    render: h => h(Dashboard)
});