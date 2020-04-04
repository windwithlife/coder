import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Collapse,
    Modal,
    Form,
    Input,
    Card,
    Select,
} from 'antd';
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import router from 'next/router';
import { inject, observer } from 'mobx-react';

//import AddorEditPage from './AddorEditColumn';

const rowSelection = {
};




@inject('modulesStore') @inject('tablesStore')
@observer
export default class EditPage extends React.Component {
    formRef = React.createRef();
    state = {
        visible: false,
        operationTitle: "新增",
        operationType: "add",
        editMode:false,
    }
    constructor() {
        super();
        //var that = this;
        this.startHeader();

    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({editMode:nextMode});
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
                <span hidden={!that.state.editMode} >
                   
                <span className = "ant-divider" />
                <Popconfirm title = "Sure to delete?" onConfirm = {that.handleLineDelete.bind(that,index, record)} >
                    < a href = "#" > Delete </a>
                </Popconfirm>
                <span className = "ant-divider" />
                <a href = "#" onClick = {that.handleLineUpdate.bind(that,index, record)} > Edit </a>
                <span className = "ant-divider" />
                <a href = "#" onClick = {that.handleLineDetail.bind(that,record)} > Detail </a>
            </span>
        
            )
        }];


    }

    onFooterBack() {
        router.back();
    }
    componentDidMount() {
        let that = this;
        console.log('DidMount');
        let id = this.props.query.moduleId;
        console.log("edit id:=" + id);
        this.props.tablesStore.queryByModuleId(id);
        this.props.modulesStore.queryById(id, function (values) {
            console.log(values);
            that.formRef.current.setFieldsValue(values);
        });
    }

    pagination() {
        return {
            //total: this.props.tablesStore.dataLength,
            showSizeChanger: true
        }
    }
   
    handleLineUpdate(index, record) {
        let that = this;
        router.push({pathname:'/xtable/edit',query:{tableId:record.id}});

    }
    handleLineDetail(record) {
        router.push({ pathname: '/xtable/detail', query: {tableId: record.id } });
    }
    handleLineAdd() {
        let moduleId =this.props.query.moduleId;
        router.push({ pathname: '/xtable/add', query: { moduleId: moduleId } });

    }

    handleLineDelete(index, record) {
        console.log(record.id);
        this.props.tablesStore.removeById(index,record.id);
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
        let editUrl = "/xmodule/edit?moduleId=" + this.props.query.moduleId;
        let itemData = that.props.modulesStore.dataObject.currentItem;
        console.log('render module edit page');
        return (
            < div >
                    <Card size="small" title="模块基本信息" style={{ width: 500 }} extra={<a href={editUrl}>编辑项目基本信息</a>} >

                        <Form ref={this.formRef}>
                            < Form.Item name="name" label="模块名：">
                                {itemData.name}
                            </Form.Item>
                            < Form.Item name="description" label="描述信息：">
                                {itemData.description}
                            </Form.Item>

                            < Form.Item name="projectId" label="所属项目：">
                                {itemData.project}
                            </Form.Item>
                            < Form.Item name="status" label="状态">
                                {itemData.status}
                            </Form.Item>

                        </Form>
                    </Card>

                
                <Collapse accordion>
                    <Panel header="此模块中的所有表" key="1" extra={<SettingOutlined onClick={that.changeEditMode}></SettingOutlined>}>
     
                    <Form layout="inline" onSubmit = {this.handleSearch.bind(this)} >
                <Form.Item  >
                    <Input type = "text" onChange={this.handleSearchChange.bind(this)} />
                </Form.Item>
                < Form.Item  >
                    < Button style = {{marginRight: '10px'}} type = "primary" htmlType = "submit" > 搜索 </Button>
                </Form.Item>
                < Form.Item  >
                    <Button onClick = {this.handleLineAdd.bind(this)} hidden={!that.state.editMode}> 添加 </Button>
                </Form.Item>

            </Form>
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
                    
                    // footer={
                    //     () => (<Button onClick={this.handleLineAdd.bind(this)} > 编辑模块表... </Button>)
                    // }
                />
             </Panel>
             </Collapse>
            </div>
        );
    }
}

EditPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
