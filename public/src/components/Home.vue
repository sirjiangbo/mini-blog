<template>
    <div>
        <div class="header">
            <div class="wrap">
                <a href="#" class="logo">学习记录</a>
                <div class="nav">
                    <a href="#">首页</a>
                    <a href="#">分类</a>
                    <a href="#">归档</a>
                    <a href="#">标签</a>
                </div>
            </div>
        </div>
        <div class="content wrap">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {}
</script>