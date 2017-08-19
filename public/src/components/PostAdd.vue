<template>
    <mu-flexbox  :gutter="16" align="flex-start">
        <mu-flexbox-item grow="8">
            <mavon-editor v-model="postData.content"></mavon-editor>
        </mu-flexbox-item>
        <mu-flexbox-item grow="3">
            <mu-flexbox :gutter="16" style="margin-bottom: 20px;">
                <mu-flexbox-item>
                    <mu-raised-button label="保存草稿" fullWidth @click="showPost"></mu-raised-button>
                </mu-flexbox-item>
                <mu-flexbox-item>
                    <mu-raised-button label="发布文章" fullWidth primary></mu-raised-button>
                </mu-flexbox-item>
            </mu-flexbox>
            <mu-text-field hintText="文章标题" fullWidth v-model="postData.title"></mu-text-field>
            <mu-text-field hintText="文章链接" fullWidth v-model="postData.link"></mu-text-field>
            <mu-date-picker container="inline" mode="landscape" hintText="发布日期" fullWidth v-model="postData.date"></mu-date-picker>
            <div>
                <p class="labelTitle">分类</p>
                <mu-checkbox v-for="(option, index) in categoryOptions" :key="index"  name="category" :nativeValue="option" v-model="postData.category" :label="option" style="margin-right: 20px;"></mu-checkbox>
            </div>
            <div>
                <p class="labelTitle" style="margin-top: 10px;">标签</p>
                <mu-checkbox v-for="(option, index) in tagOptions" :key="index"  name="tag" :nativeValue="option" v-model="postData.tag" :label="option" style="margin-right: 20px;"></mu-checkbox>
            </div>
            <div>
                <p class="labelTitle" style="margin-top: 10px;">是否公开</p>
                <mu-radio label="是" name="isPublic" nativeValue="true" v-model="postData.isPublic" style="margin-right: 20px;"></mu-radio>
                <mu-radio label="否" name="isPublic" nativeValue="false" v-model="postData.isPublic"></mu-radio>
            </div>
        </mu-flexbox-item>
    </mu-flexbox>
</template>
<script>
    import { mavonEditor } from 'mavon-editor'

    export default {
        data() {
            return {
                postData: {
                    title: '',
                    link: '',
                    date: '',
                    content: '',
                    category: [],
                    tag: [],
                    isPublic: 'true'
                },
                categoryOptions: [
                    "苹果",
                    "西瓜",
                    "芒果",
                    "菠萝",
                    "草莓"
                ],
                tagOptions: [
                    '111111',
                    '222222',
                    '333333',
                    '444444',
                    '555555'
                ]
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            showPost() {
                console.log(this.postData)
            }
        }
    }
</script>