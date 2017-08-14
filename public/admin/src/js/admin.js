import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/dashboard',
			component: require('./components/Dashboard.vue')
		},
		{
			path: '/login',
			component: require('./components/Login.vue')
		}
	]
});

new Vue({
	el: '#adminApp',
	router,
	render: h => h(App)
});