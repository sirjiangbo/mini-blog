export default {
	changeModuleAndAction(state, payload) {
		state.module = payload.module;
		state.action = payload.action;
	}
}