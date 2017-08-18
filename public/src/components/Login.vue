<template>
	<div class="loginBox">
		<h1>登录</h1>
		<iInput v-model="username" placeholder="用户名" style="margin-bottom: 20px;"></iInput>
		<iInput v-model="password" placeholder="密码" style="margin-bottom: 20px;"></iInput>
		<iButton type="primary" long @click="login()">登录</iButton>
	</div>
</template>

<script>
	import iInput from 'iview/src/components/input'
	import iButton from 'iview/src/components/button'

	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		components: {
			iInput,
			iButton
		},
		methods: {
			login() {

			}
		}
	};
</script>

<style>
	body { background: #f5f5f5; }
	.loginBox { margin: 200px auto 0; width: 300px;}
	.loginBox h1 { text-align: center; margin-bottom: 20px; }
</style>