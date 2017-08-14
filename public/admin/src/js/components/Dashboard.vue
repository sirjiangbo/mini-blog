<template>
	<div class="dashboardBox">
		<div class="menuBox">
			<iMenu :theme="theme">
				<iSubmenu v-for="nav in navList" name="nav.name" :key="nav.name">
					<template slot="title">
						<iIcon type="ios-paper"></iIcon>
           	{{ nav.title }}
          </template>
          <iMenu-item v-for="item in nav.items" name="item.name" :key="item.name">{{ item.title }}</iMenu-item>
				</iSubmenu>
				<!-- <iSubmenu name="1">
					<template slot="title">
						<iIcon type="ios-paper"></iIcon>
            内容管理
          </template>
          <iMenu-item name="1-1">文章管理</iMenu-item>
          <iMenu-item name="1-2">评论管理</iMenu-item>
          <iMenu-item name="1-3">举报管理</iMenu-item>
				</iSubmenu>
				<iSubmenu name="2">
					<template slot="title">
						<iIcon type="ios-people"></iIcon>
            用户管理
          </template>
          <iMenu-item name="2-1">文章管理</iMenu-item>
          <iMenu-item name="2-2">评论管理</iMenu-item>
          <iMenu-item name="2-3">举报管理</iMenu-item>
				</iSubmenu> -->
			</iMenu>
		</div>
		<div class="contentbox">
		</div>
	</div>
</template>

<script>
	import iMenu from 'iview/src/components/menu';
	import iIcon from 'iview/src/components/icon';

	export default {
		data() {
			return {
				theme: 'dark',
				navList: [
					{
						title: '文章管理',
						name: '1',
						items: [
							{
								title: '文章列表',
								name: '1-1'
							},
							{
								title: '添加文章',
								name: '1-2'
							}
						]
					},
					{
						title: '分类管理',
						name: '2',
						items: [
							{
								title: '分类列表',
								name: '2-1'
							},
							{
								title: '添加分类',
								name: '2-2'
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
			iIcon
		}
	};
</script>

<style>
	.dashboardBox {  }
	.menuBox { position: absolute; top: 0; left: 0; bottom: 0; width: 240px; background: #363e4f;}
	.contentbox { margin-left: 240px; height: 400px; }
</style>