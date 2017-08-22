<template>
    <div>
        <mu-flexbox  :gutter="16" align="flex-start">
            <mu-flexbox-item grow="8">
                <mavon-editor :ishljs = "true" v-model="postData.content" @change="editorChange"></mavon-editor>
            </mu-flexbox-item>
            <mu-flexbox-item grow="3">
                <mu-flexbox :gutter="16" style="margin-bottom: 20px;">
                    <mu-flexbox-item>
                        <mu-raised-button label="保存草稿" fullWidth></mu-raised-button>
                    </mu-flexbox-item>
                    <mu-flexbox-item>
                        <mu-raised-button label="添加文章" fullWidth primary @click="publishPost"></mu-raised-button>
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
                    <mu-radio label="是" name="isPublic" nativeValue="1" v-model="postData.is_public" style="margin-right: 20px;"></mu-radio>
                    <mu-radio label="否" name="isPublic" nativeValue="0" v-model="postData.is_public"></mu-radio>
                </div>
            </mu-flexbox-item>
        </mu-flexbox>
        <mu-toast v-if="toast.show" :message="toast.message"></mu-toast>
    </div>
</template>
<script>
    import { mavonEditor } from 'mavon-editor'
    import axios from 'axios'

    export default {
        data() {
            return {
                toast: {
                    show: false,
                    message: '添加成功'
                },
                postData: {
                    title: '',
                    link: '',
                    date: '',
                    content: '',
                    html: '',
                    category: [],
                    tag: [],
                    is_public: '1'
                },
                categoryOptions: ["苹果", "西瓜", "芒果", "菠萝", "草莓"],
                tagOptions: ['111111', '222222', '333333', '444444', '555555']
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            editorChange(value, render) {
                this.postData.html = render;
            },
            showToast(message = '添加成功') {
                this.toast = {
                    show: true,
                    message
                };
                if(this.toastTimer) {
                    clearTimeout(this.toastTimer);
                };
                this.toastTimer = setTimeout(() => {
                    this.toast.show = false;
                }, 2000);
            },
            resetPostData() {
                this.postData = {
                    title: '',
                    link: '',
                    date: '',
                    content: '',
                    html:'',
                    category: [],
                    tag: [],
                    is_public: '1'
                };
            },
            publishPost() {
                axios.post('/api/post', {
                    action: 'add',
                    postData: {
                        ...this.postData,
                        author: 'admin',
                        status: 'pending'
                    }
                }).then(res  => {
                    this.showToast('添加成功');
                    this.resetPostData();
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>