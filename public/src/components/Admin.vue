<template>
    <div>
        <mu-appbar title="记录学习点滴"></mu-appbar>
        <div class="content">
            <div class="menuBox">
                <mu-list @change="handleListChange" :value="activeList">
                    <mu-list-item title="文章管理" toggleNested value="post">
                        <mu-list-item slot="nested" title="文章列表" value="post-list"></mu-list-item>
                        <mu-list-item slot="nested" title="添加文章" value="post-add"></mu-list-item>
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
            <div class="contentBox">
                <div class="breadcrumb">
                    <mu-breadcrumb>
                        <mu-breadcrumb-item href="/">Home</mu-breadcrumb-item>
                        <mu-breadcrumb-item href="/">VideoGame</mu-breadcrumb-item>
                        <mu-breadcrumb-item>Download</mu-breadcrumb-item>
                    </mu-breadcrumb>
                </div>
                <div class="contentBody">
                    <mu-flexbox  :gutter="16" align="flex-start">
                        <mu-flexbox-item grow="8">
                            <mavon-editor v-model="postData.content"></mavon-editor>
                        </mu-flexbox-item>
                        <mu-flexbox-item grow="3">
                            <mu-flexbox :gutter="16" style="margin-bottom: 20px;">
                                <mu-flexbox-item>
                                    <mu-raised-button label="保存草稿" fullWidth></mu-raised-button>
                                </mu-flexbox-item>
                                <mu-flexbox-item>
                                    <mu-raised-button label="发布文章" fullWidth primary></mu-raised-button>
                                </mu-flexbox-item>
                            </mu-flexbox>
                            <mu-text-field hintText="文章标题" fullWidth></mu-text-field>
                            <mu-text-field hintText="文章链接" fullWidth></mu-text-field>
                            <mu-date-picker mode="landscape" hintText="发布日期" fullWidth></mu-date-picker>
                            <div>
                                <p class="labelTitle">分类</p>
                                <mu-checkbox v-for="option in options" name="category" :nativeValue="option" v-model="postData.category" :label="option" uncheckIcon="favorite_border" checkedIcon="favorite" style="margin-right: 20px;"></mu-checkbox>
                            </div>
                        </mu-flexbox-item>
                    </mu-flexbox>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mavonEditor } from 'mavon-editor'

    export default {
        data () {
            return {
                activeTab: 'tab1',
                activeList: 'list1',
                postData: {
                    content: '',
                    category: []
                },
                options: [
                    "苹果",
                    "西瓜",
                    "芒果",
                    "菠萝",
                    "草莓"
                ]
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            handleListChange (val) {
                this.activeList = val;
            }
        }
    }
</script>

<style>
    .mu-item-title { font-size: 14px; }
    .mu-item { min-height: initial; padding: 10px 16px; }
</style>