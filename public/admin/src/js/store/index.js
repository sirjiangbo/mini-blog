import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
	module: 'post',
	action: 'list'
};

export default new Vuex.Store({
	state,
	getters,
	mutations
});