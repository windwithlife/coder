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
    Card,
    Select,
    Input
} from 'antd';
const { Panel } = Collapse;
import { SettingOutlined } from '@ant-design/icons';
import router from 'next/router';
import { inject, observer } from 'mobx-react';
//import AddorEditPage from './AddorEditColumn';
import NetworkHelper from '../common/components/models/network';

const rowSelection = {
};
@inject('tableccccStore') 
@observer
export default class DetailPage extends React.Component {
    Store=()=>{
        return this.props.tableccccStore;
    }
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
            title: "模块名称",
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

   
    generateCode=(type)=>{
        console.log(type);
        let projectId = this.props.query.id;
        let params = {sideType:type,projectId: projectId};
        if(type==='web'){
            params.projectName = this.Store().dataObject.currentItem.name;
            params.platform = this.Store().dataObject.currentItem.webPlatform;
            params.language= this.Store().dataObject.currentItem.webLanguage;
            params.framework= this.Store().dataObject.currentItem.webFramework;
        }
        let finalParams = {};
        finalParams.projectSetting = params;
        finalParams.defines = this.props.modulesStore.dataObject.list;
        
        NetworkHelper.webPost("generateCodeByProjectId/",finalParams);
    }
    downloadCode=(type)=>{
        console.log(type);
    }
    
    componentDidMount() {
        //this.props.tablesStore.fetchAll();
        console.log('DidMount');
        let id = this.props.query.id;
        console.log("edit id:=" + id);
        this.props.modulesStore.queryByProjectId(id);
        this.props.projectsStore.queryById(id);
    }

    pagination() {
        return {
            //total: this.props.tablesStore.dataLength,
            showSizeChanger: true
        }
    }
    handleLineUpdate(index, record) {

        router.push({ pathname: '/xmodule/edit', query: {moduleId: record.id } });
       
    }
    changeEditMode = (event) => {
        event.stopPropagation();
        console.log('click on edit model');
        let nextMode = !this.state.editMode;
        this.setState({editMode:nextMode});
    }
    handleLineDetail(record) {
        router.push({ pathname: '/xmodule/detail', query: {moduleId: record.id }});
    }
    handleLineAdd() {
        //this.setState({ visible: true });
        let id = this.props.query.id;
        router.push({ pathname: '/xmodule/add' ,query: {projectId: id }});

    }
    handleLineEditModule() {
        let id = this.props.query.id;
        router.push({ pathname: '/xmodule/list', query: { projectId: id } });

    }
   
    handleLineDelete(index, record) {
        console.log(record.id);
        this.props.modulesStore.removeById(index,record.id);
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value, name: e.target.value });
    }
    handleSearch(e) {
        e.preventDefault();
        let keywork = this.state.searchText
        //this.props.tablesStore.fetchByNameLike(param.keyword);

    }
    render() {
        let that = this;
        let itemData = this.Store().dataObject.currentItem;
        let editUrl = "/xproject/edit?id=" + this.props.query.id;
        return (
            < div >
               
                    <Card size="small" title="基本信息" style={{ width: 500 }} extra={<a href={editUrl}>编辑项目基本信息</a>} >
                        <Form >

                          < Form.Item name="secondcol" label="">
                            {itemData.secondcol}
                          </Form.Item>
                            
                          < Form.Item name="colthree" label="">
                            {itemData.colthree}
                          </Form.Item>
                            
                        </Form>
                    </Card>
                   
                

                <Collapse accordion>
                    <Panel header="项目中的所有模块" key="4" extra={<SettingOutlined onClick={that.changeEditMode}></SettingOutlined>}>
     
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
                        that.props.modulesStore.dataObject.list.slice()
                    }
                    pagination={
                        this.pagination()
                    }
                    
                />
             </Panel>
             </Collapse>

            </div>
        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query };
}
