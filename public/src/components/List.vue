<template>
	<div>
		<div v-for="list in lists" key="list._id" class="postListItem">
			<h2 class="title">{{ list.title }}</h2>
			<div class="info">
				{{ list.author }} 发表于 {{ list.date }}
			</div>
			<div class="markdown-body code-github">
				<div v-html="list.html"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'

	export default {
		data() {
			return {
				lists: []
			}
		},
		created() {
			this.getLists();
		},
		methods: {
			getLists() {
				axios.post('/api/post', {
					action: 'list'
				}).then(res => {
					this.lists = res.data.data;
				}).catch(err => {
					console.log(err)
				});
			}
		}
	}
</script>