import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';
import AddorEditPage from './AddorEditColumn';

const rowSelection = {
};
@inject('modulesStore') @inject('tablesStore')
@observer
export default class EditPage extends React.Component {
    state = {
        visible: false,
        operationTitle: "新增",
        operationType: "add"
    }
    constructor() {
        super();
        //var that = this;
        this.startHeader();

    }
    startHeader() {
        var that = this;

        var fieldColumns = [];

        fieldColumns.push({
            title: "表的名称",
            dataIndex: 'name',
            key: 'name'
        });
        
        fieldColumns.push({
            title: "说明",
            dataIndex: 'description',
            key: 'description'
        });
        fieldColumns.push({
            title: "当前状态",
            dataIndex: 'status',
            key: 'status'
        });


        this.columns = [...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span >
                    <a href="#" onClick={that.handleLineDetail.bind(that, record)} > Detail </a>
                </span>
            )
        }];


    }

    onFooterBack() {
        router.back();
    }
    componentDidMount() {
        //this.props.tablesStore.fetchAll();
        console.log('DidMount');
        let id = this.props.query.id;
        console.log("edit id:=" + id);
        this.props.tablesStore.queryByModuleId(id);
        this.props.modulesStore.queryById(id);
    }

    pagination() {
        return {
            //total: this.props.tablesStore.dataLength,
            showSizeChanger: true
        }
    }
    
    handleLineDetail(record) {
        //router.push({ pathname: '/xtable/detail', query: { ...that.props.query, pxtableId: record.id } });
    }
    handleLineAdd() {
        let moduleId = this.props.query.id;
        router.push({ pathname: '/xtable/list', query: { moduleId:moduleId} });
    
    }
   
    handleLineDelete(index, record) {
        console.log(record.id);
        this.props.tablesStore.removeById(record.id, index);
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value, name: e.target.value });
    }
    handleSearch(e) {
        e.preventDefault();
        //let keywork = this.state.searchText
        //this.props.tablesStore.fetchByNameLike(param.keyword);

    }
    render() {
        let that = this;
        let itemData = that.props.modulesStore.dataObject.currentItem;
        return (
            < div >
                <div>
                    <Form  initialValues= {itemData}>
                        < Form.Item name="name" label="模块名称：">
                            <Input />
                        
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            <Input />
                        </Form.Item>
                        < Form.Item name="status" label="状态">
                            <Input />
                        </Form.Item>
                        < Form.Item name="project" label="所属项目为：">
                            Simple项目
                        </Form.Item>

                    </Form>
                </div>

                < Table rowSelection={
                    rowSelection
                }
                    columns={
                        this.columns
                    }
                    dataSource={
                        //that.props.tablesStore.items.slice()
                        that.props.tablesStore.dataObject.list.slice()
                    }
                    pagination={
                        this.pagination()
                    }
                    bordered title={() => (<Button>模块中的表：</Button>)}
                    footer={
                        () => (<Button onClick={this.handleLineAdd.bind(this)} > 编辑模块表... </Button>)
                    }
                />

            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
