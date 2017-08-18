import Vue from 'vue'
import MuseUI from 'muse-ui'
import store from './store'
import Admin from './components/Admin.vue'

import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'

Vue.use(MuseUI);

new Vue({
    el: '#adminRoot',
    store,
    render: h => h(Admin)
});