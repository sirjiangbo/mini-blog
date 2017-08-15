<template>
	<div>
		<iTabs type="card" :animated="false" v-if="action == 'list'">
        <iTab-pane label="标签一">
        	<iTable :columns="columns1" :data="data1"></iTable>
        </iTab-pane>
        <iTab-pane label="标签二">
        	<iTable :columns="columns1" :data="data1"></iTable>
        </iTab-pane>
        <iTab-pane label="标签三">
        	<iTable :columns="columns1" :data="data1"></iTable>
        </iTab-pane>
    </iTabs>
    <div v-if="action == 'add'">
    	<iRow :gutter="16">
    		<iCol span="16">
    			<Editor></Editor>
    		</iCol>
    		<iCol span="8">
    			<iForm label-position="top">
    				<iForm-item label="标题">
	            <iInput></iInput>
	        	</iForm-item>
	        	<iForm-item label="页面地址">
	            <iInput></iInput>
	        	</iForm-item>
	        	<iForm-item label="发布日期">
	            <Date-picker type="date" placeholder="选择日期" style="width: 100%;"></Date-picker>
	        	</iForm-item>
	        	<iForm-item label="分类">
	               <Checkbox-group v-model="social">
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
	            <iInput></iInput>
	        	</iForm-item>
	        	<iForm-item label="是否公开">
	            <iInput></iInput>
	        	</iForm-item>
    			</iForm>
    		</iCol>
    	</iRow>
    </div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import iTabs from 'iview/src/components/tabs';
	import iTable from 'iview/src/components/table';
	import { Row, Col }from 'iview/src/components/grid';
	import iForm from 'iview/src/components/form';
	import iInput from 'iview/src/components/input';
	import DatePicker from 'iview/src/components/date-picker';
	import Checkbox from 'iview/src/components/checkbox';
	import Editor from './Editor.vue';

	export default {
		data() {
			return {
				social: ['facebook', 'github'],
				columns1: [
            {
                title: '姓名',
                key: 'name'
            },
            {
                title: '年龄',
                key: 'age'
            },
            {
                title: '地址',
                key: 'address'
            }
        ],
        data1: [
            {
                name: '王小明',
                age: 18,
                address: '北京市朝阳区芍药居'
            },
            {
                name: '张小刚',
                age: 25,
                address: '北京市海淀区西二旗'
            },
            {
                name: '李小红',
                age: 30,
                address: '上海市浦东新区世纪大道'
            },
            {
                name: '周小伟',
                age: 26,
                address: '深圳市南山区深南大道'
            }
        ]
			}
		},
		components: {
			iTabs,
			iTabPane: iTabs.Pane,
			iTable,
			iRow: Row,
			iCol: Col,
			iForm,
			iFormItem: iForm.Item,
			Editor,
			iInput,
			DatePicker,
			Checkbox,
			CheckboxGroup: Checkbox.Group
		},
		computed: {
			...mapGetters([
				"action"
			])
		}
	}
</script>