import Vue from 'vue';
import store from './store'
import Dashboard from './components/Dashboard.vue';

new Vue({
	el: '#adminApp',
	store,
	render: h => h(Dashboard)
});