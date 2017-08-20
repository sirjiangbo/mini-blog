<template>
    <div>
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="all" title="全部"></mu-tab>
            <mu-tab value="published" title="已发布"></mu-tab>
            <mu-tab value="pending" title="审核中"></mu-tab>
            <mu-tab value="rejected" title="未通过"></mu-tab>
        </mu-tabs>
        <div style="margin-top: 20px;">
            <mu-table :showCheckbox="false" :fixedHeader="true">
                <mu-thead>
                    <mu-tr>
                        <mu-th>标题</mu-th>
                        <mu-th>作者</mu-th>
                        <mu-th>状态</mu-th>
                        <mu-th>发布日期</mu-th>
                        <mu-th>操作</mu-th>
                    </mu-tr>
                </mu-thead>
                <mu-tbody>
                    <mu-tr>
                        <mu-td>1</mu-td>
                        <mu-td>John Smith</mu-td>
                        <mu-td>Employed</mu-td>
                        <mu-td>2017-08-18</mu-td>
                        <mu-td>
                            <mu-flexbox :gutter="16">
                                <mu-flexbox-item>
                                    <mu-raised-button label="删除" secondary fullWidth></mu-raised-button>
                                </mu-flexbox-item>
                                <mu-flexbox-item>
                                    <mu-raised-button label="编辑" primary fullWidth></mu-raised-button>
                                </mu-flexbox-item>
                            </mu-flexbox>
                        </mu-td>
                    </mu-tr>
                    <mu-tr>
                        <mu-td>1</mu-td>
                        <mu-td>John Smith</mu-td>
                        <mu-td>Employed</mu-td>
                        <mu-td>2017-08-18</mu-td>
                        <mu-td>
                            <mu-flexbox :gutter="16">
                                <mu-flexbox-item>
                                    <mu-raised-button label="删除" secondary fullWidth></mu-raised-button>
                                </mu-flexbox-item>
                                <mu-flexbox-item>
                                    <mu-raised-button label="编辑" primary fullWidth></mu-raised-button>
                                </mu-flexbox-item>
                            </mu-flexbox>
                        </mu-td>
                    </mu-tr>
                    <mu-tr>
                        <mu-td>1</mu-td>
                        <mu-td>John Smith</mu-td>
                        <mu-td>Employed</mu-td>
                        <mu-td>2017-08-18</mu-td>
                        <mu-td>
                            <mu-flexbox :gutter="16">
                                <mu-flexbox-item>
                                    <mu-raised-button label="删除" secondary fullWidth></mu-raised-button>
                                </mu-flexbox-item>
                                <mu-flexbox-item>
                                    <mu-raised-button label="编辑" primary fullWidth></mu-raised-button>
                                </mu-flexbox-item>
                            </mu-flexbox>
                        </mu-td>
                    </mu-tr>
                </mu-tbody>
            </mu-table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeTab: 'all',
            }
        },
        methods: {
            handleTabChange(val) {
                this.activeTab = val;
            }
        }
    }
</script>