import React from 'react';
import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Form,
    Select,
    Input
} from 'antd';
//import EditableCell from '../common/components/form/editablecell.js';
//import NewModal from './components/modal.js';
import router from 'next/router';
import { inject, observer } from 'mobx-react'


const rowSelection = {
};

@inject('tablesStore') @observer
export default class ListExample extends React.Component{

    startHeader() {
        var that = this;
        let store = this.props.tablesStore;
        var fieldColumns=[];
        
                fieldColumns.push({
                  title: "名称",
                  dataIndex: 'name',
                  key: 'name'
                });
                
                fieldColumns.push({
                  title: "说明",
                  dataIndex: 'description',
                  key: 'description'
                });
                
                fieldColumns.push({
                  title: "是否使用",
                  dataIndex: 'status',
                  key: 'status'
                });

        this.columns = [ ...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span >
                    <a href = "#" onClick = {that.handleLineAdd.bind(that)} > Add </a>
                    <span className = "ant-divider" />
                    <Popconfirm title = "Sure to delete?" onConfirm = {that.handleLineDelete.bind(that,index, record)} >
                        <a href = "#" > Delete </a>
                    </Popconfirm>
                    <span className = "ant-divider" />
                    <a href = "#" onClick = {that.handleLineUpdate.bind(that,index, record)} > Update </a>
                    <span className = "ant-divider" />
                    <a href = "#" onClick = {that.handleLineDetail.bind(that,record)} > Detail </a>
                </span>
            )
        }];


    }

    onFooterBack(){
        router.back();
    }
    componentDidMount () {
        this.props.tablesStore.fetchAll();
    }
    componentWillMount() {
        var that = this;
        this.startHeader();
    }
    pagination() {
        return {
            total: this.props.tablesStore.dataLength,
            showSizeChanger: true
        }
    }
    handleLineUpdate(index, record) {

        router.push({pathname:'/zxtable/edit',query: {...that.props.query,pxtableId:record.id}});
    }
    handleLineDetail(record) {
        router.push({pathname:'/zxtable/detail',query:{...that.props.query,pxtableId:record.id}});
    }
    handleLineAdd() {
        router.push({pathname:'/zxtable/add',query:{...that.props.query}});
    }
    handleLineDelete(index, record) {
        this.props.tablesStore.removeItemById(index,record);
    }

    handleSearchChange(e){
        this.setState({searchText: e.target.value,name: e.target.value});
    }
    handleSearch(e) {
        e.preventDefault();
        let keywork = this.state.searchText
        this.props.tablesStore.fetchByNameLike(param.keyword);

    }
    render() {
        var that = this;
        
        return (
            < div >
            <div>
            < Form layout="inline" onSubmit = {this.handleSearch.bind(this)} >
                < Form.Item  >
                    <Input type = "text" onChange={this.handleSearchChange.bind(this)} />
                < /Form.Item>
                < Form.Item  >
                    < Button style = {{marginRight: '10px'}} type = "primary" htmlType = "submit" > 搜索 </Button>
                < /Form.Item>
                < Form.Item  >
                    <Button onClick = {this.handleLineAdd.bind(this)} > 添加 </Button>
                < /Form.Item>
            < /Form>
            < /div>
            < Table rowSelection = {
                rowSelection
            }
            columns = {
                this.columns
            }
            dataSource = {
                that.props.tablesStore.items.slice()
            }
            pagination = {
                this.pagination()
            }
            bordered title = {
                this.title
            }
            footer = {
                 () => (<Button onClick={that.onFooterBack.bind(that)}>Back</Button>)
            }
            />

            < /div>
        );
    }
}

ListExample.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}
//export default()=>(<Layout> <ListExample/></Layout>)