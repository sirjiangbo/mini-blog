<template>
    <div class="menuBox">
        <mu-list @change="handleListChange" :value="activeList">
            <mu-list-item title="文章管理" toggleNested value="post">
                <mu-list-item slot="nested" title="文章列表" value="post-list" to="/post/list"></mu-list-item>
                <mu-list-item slot="nested" title="添加文章" value="post-add" to="/post/add"></mu-list-item>
            </mu-list-item>
            <mu-list-item title="分类管理" toggleNested value="category">
                <mu-list-item slot="nested" title="分类列表" value="category-list"></mu-list-item>
                <mu-list-item slot="nested" title="添加分类" value="category-add"></mu-list-item>
            </mu-list-item>
            <mu-list-item title="标签管理" toggleNested value="tag">
                <mu-list-item slot="nested" title="标签列表" value="tag-list"></mu-list-item>
                <mu-list-item slot="nested" title="添加标签" value="tag-add"></mu-list-item>
            </mu-list-item>
            <mu-list-item title="用户管理" toggleNested value="user">
                <mu-list-item slot="nested" title="用户列表" value="user-list"></mu-list-item>
                <mu-list-item slot="nested" title="添加用户" value="user-add"></mu-list-item>
            </mu-list-item>
        </mu-list>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeList: ''
            }
        },
        created() {
            const pathArr = this.$route.path.split('/');
            this.activeList = pathArr[1] + '-' + pathArr[2];
        },
        methods: {
            handleListChange(val) {
                this.activeList = val;
            }
        }
    }
</script>