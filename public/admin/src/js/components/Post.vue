<template>
	<div>
		<iTabs type="card" :animated="false" v-if="action == 'list'">
        <iTab-pane label="全部">
        	<iTable :columns="columns" :data="postList"></iTable>
        </iTab-pane>
        <iTab-pane label="已发布">
        	2222222
        </iTab-pane>
        <iTab-pane label="审核中">
        	333333
        </iTab-pane>
        <iTab-pane label="未通过">
        	4444
        </iTab-pane>
    </iTabs>
    <div v-if="action == 'add'">
    	<iRow :gutter="16">
    		<iCol span="16">
    			<mavon-editor v-model="postData.content" :toolbars="toolbars"></mavon-editor>
    		</iCol>
    		<iCol span="8">
    			<iRow :gutter="16" style="margin-bottom: 20px;">
    				<iCol span="12">
    					<iButton long>保存草稿</iButton>
    				</iCol>
    				<iCol span="12">
    					<iButton type="success" long @click="postPublish()">发布文章</iButton>
    				</iCol>
    			</iRow>
    			<iForm label-position="top">
    				<iForm-item label="标题">
	            <iInput v-model="postData.title"></iInput>
	        	</iForm-item>
	        	<iForm-item label="页面地址">
	            <iInput v-model="postData.link"></iInput>
	        	</iForm-item>
	        	<iForm-item label="发布日期">
	            <Date-picker type="date" placeholder="选择日期" :editable="false" style="width: 100%;" @on-change="dateChange"></Date-picker>
	        	</iForm-item>
	        	<iForm-item label="分类">
	               <Checkbox-group v-model="postData.category">
					        <Checkbox label="twitter">
					            <Icon type="social-twitter"></Icon>
					            <span>Twitter</span>
					        </Checkbox>
					        <Checkbox label="facebook">
					            <Icon type="social-facebook"></Icon>
					            <span>Facebook</span>
					        </Checkbox>
					        <Checkbox label="github">
					            <Icon type="social-github"></Icon>
					            <span>Github</span>
					        </Checkbox>
					        <Checkbox label="snapchat">
					            <Icon type="social-snapchat"></Icon>
					            <span>Snapchat</span>
					        </Checkbox>
					    </Checkbox-group>
	        	</iForm-item>
	        	<iForm-item label="标签">
	            <iSelect v-model="postData.tag" filterable multiple>
                <iOption v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</iOption>
            	</iSelect>
	        	</iForm-item>
	        	<iForm-item label="是否公开">
	            <iRadio-group v-model="postData.is_public">
				        <iRadio label="是"></iRadio>
				        <iRadio label="否"></iRadio>
				    </iRadio-group>
	        	</iForm-item>
    			</iForm>
    		</iCol>
    	</iRow>
    </div>
	</div>
</template>

<script>
	import { mapGetters, mapState } from 'vuex';
	import iButton from 'iview/src/components/button';
	import Icon from 'iview/src/components/icon';
	import iTabs from 'iview/src/components/tabs';
	import iTable from 'iview/src/components/table';
	import { Row, Col }from 'iview/src/components/grid';
	import iForm from 'iview/src/components/form';
	import iInput from 'iview/src/components/input';
	import DatePicker from 'iview/src/components/date-picker';
	import Checkbox from 'iview/src/components/checkbox';
	import iRadio from 'iview/src/components/radio';
	import { Select, Option } from 'iview/src/components/select';
	import { mavonEditor } from 'mavon-editor';
	import axios from 'axios';

	export default {
		data() {
			return {
				postData: {
					title: '',
					content:'',
					link: '',
					date: '',
					is_public: '是',
					tag: [],
					category: []
				},
				cityList: [
	          {
	              value: 'beijing',
	              label: '北京市'
	          },
	          {
	              value: 'shanghai',
	              label: '上海市'
	          },
	          {
	              value: 'shenzhen',
	              label: '深圳市'
	          },
	          {
	              value: 'hangzhou',
	              label: '杭州市'
	          },
	          {
	              value: 'nanjing',
	              label: '南京市'
	          },
	          {
	              value: 'chongqing',
	              label: '重庆市'
	          }
	      ],
				columns: [
            {
                title: '标题',
                key: 'title'
            },
            {
                title: '状态',
                key: 'status'
            },
            {
                title: '发布日期',
                key: 'date'
            }
        ],
        toolbars: {
			      bold: true, 
			      italic: true,
			      header: true,
			      underline: true,
			      strikethrough: true,
			      mark: true,
			      superscript: true,
			      subscript: true,
			      quote: true,
			      ol: true,
			      ul: true, 
			      link: true,
			      imagelink: false,
			      code: true, 
			      table: true,
			      fullscreen: true,
			      readmodel: true, 
			      htmlcode: true, 
			      help: true,
			      undo: true,
			      redo: true,
			      trash: true,
			      save: true,
			      navigation: true,
			      alignleft: true,
			      aligncenter: true,
			      alignright: true,
			      subfield: true,
			      preview: true
			  }
			}
		},
		components: {
			Icon,
			iButton,
			iTabs,
			iTabPane: iTabs.Pane,
			iTable,
			iRow: Row,
			iCol: Col,
			iForm,
			iFormItem: iForm.Item,
			mavonEditor,
			iInput,
			DatePicker,
			Checkbox,
			CheckboxGroup: Checkbox.Group,
			iSelect: Select,
			iOption: Option,
			iRadio,
			iRadioGroup: iRadio.Group
		},
		computed: {
			...mapGetters([
				"action"
			]),
			...mapState([
				"postList"
			])
		},
		created() {
			const _this = this;
			axios.post('/post/list')
				.then(function(response) {
					_this.$store.commit('postList', response.data.data);
				})
				.catch(function(err) {
					throw err;
				});
		},
		methods: {
			postPublish() {
				const _this = this;
				let { title, content, link, date, category, tag, is_public } = this.postData;
				if(is_public === '否') {
					is_public = false;
				} else {
					is_public = true;
				}
				const submitData = {
					title,
					content,
					link,
					date,
					status: 'pendding',
					category,
					tag,
					is_public
				};
				axios.post('/post/publish', submitData)
				.then(function(response) {
					_this.postData = {
						title: '',
						content:'',
						link: '',
						date: '',
						is_public: '是',
						tag: [],
						category: []
					};
				})
				.catch(function(err) {
					throw err;
				});
			},
			dateChange(date) {
				this.postData.date = date;
			}
		}
	}
</script>