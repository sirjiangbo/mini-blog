<template>
	<div class="dashboardBox">
		<div class="menuBox">
			<iMenu :theme="theme" :open-names="['post']" active-name="post-list" accordion @on-select="onSelect">
				<iSubmenu v-for="nav in navList" :name="nav.name" :key="nav.name">
					<template slot="title">
						<iIcon type="ios-paper"></iIcon>
           	{{ nav.title }}
          </template>
          <iMenu-item v-for="item in nav.items" :name="item.name" :key="item.name">{{ item.title }}</iMenu-item>
				</iSubmenu>
			</iMenu>
		</div>
		<div class="contentbox">
			<iBreadcrumb class="breadcrumb">
        <iBreadcrumb-item href="/login">Home</iBreadcrumb-item>
        <iBreadcrumb-item href="/dashboard">Components</iBreadcrumb-item>
        <iBreadcrumb-item>Breadcrumb</iBreadcrumb-item>
    	</iBreadcrumb>
    	<div class="content">
    		<Post v-if="module == 'post'"></Post>
    		<Tag v-if="module == 'tag'"></Tag>
    	</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import iMenu from 'iview/src/components/menu';
	import iIcon from 'iview/src/components/icon';
	import iBreadcrumb from 'iview/src/components/breadcrumb';

	import Post from './Post.vue';
	import Tag from './Tag.vue';

	export default {
		data() {
			return {
				theme: 'dark',
				navList: [
					{
						title: '文章管理',
						name: 'post',
						items: [
							{
								title: '文章列表',
								name: 'post-list'
							},
							{
								title: '添加文章',
								name: 'post-add'
							}
						]
					},
					{
						title: '分类管理',
						name: 'category',
						items: [
							{
								title: '分类列表',
								name: 'category-list'
							},
							{
								title: '添加分类',
								name: 'category-add'
							}
						]
					},
					{
						title: '标签管理',
						name: 'tag',
						items: [
							{
								title: '标签列表',
								name: 'tag-list'
							},
							{
								title: '添加标签',
								name: 'tag-add'
							}
						]
					},
					{
						title: '用户管理',
						name: 'user',
						items: [
							{
								title: '用户列表',
								name: 'user-list'
							},
							{
								title: '添加用户',
								name: 'user-add'
							}
						]
					}
				]
			}
		},
		components: {
			iMenu,
			iSubmenu: iMenu.Sub,
			iMenuItem: iMenu.Item,
			iIcon,
			iBreadcrumb,
			iBreadcrumbItem: iBreadcrumb.Item,
			Tag,
			Post
		},
		computed: {
			...mapGetters([
				"module"
			])
		},
		methods: {
			onSelect(name) {
				const arr = name.split('-');
				this.$store.commit('changeModuleAndAction', {
					module: arr[0],
					action: arr[1]
				});
			}
		}
	};
</script>

<style>
	body { background: #f5f5f5; }
	.menuBox { position: absolute; top: 0; left: 0; bottom: 0; width: 240px; background: #363e4f;}
	.contentbox { margin-left: 240px; height: 400px; }
	.content { background: #fff; padding: 10px 15px; margin-top: 10px; }
	.breadcrumb { padding: 10px 15px; background: #fff; border-bottom: 1px solid #dddee1; }
</style>