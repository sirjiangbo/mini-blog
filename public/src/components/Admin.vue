<template>
    <div>
        <mu-appbar title="记录学习点滴"></mu-appbar>
        <div class="content">
            <side-menu></side-menu>
            <div class="contentBox">
                <bread-crumb></bread-crumb>
                <div class="contentBody">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SideMenu from './SideMenu.vue'
    import BreadCrumb from './BreadCrumb.vue'

    export default {
        components: {
            SideMenu,
            BreadCrumb
        }
    }
</script>