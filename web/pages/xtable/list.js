import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Form,
    Select,
    Input
} from 'antd';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
import Layout from '../common/pages/layout';
import '../common/styles/TableSearch.less';





const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
    },
};

@inject('tablesStore') @observer
export default class TableList extends React.Component{

    startHeader() {
        var that = this;
        var fieldColumns=[];
        
                fieldColumns.push({
                  title: "表名称",
                  dataIndex: 'name',
                  key: 'name'
                });
                
                fieldColumns.push({
                  title: "表描述",
                  dataIndex: 'description',
                  key: 'description'
                });
                fieldColumns.push({
                    title: "所属模块",
                    dataIndex: 'module',
                    key: 'module'
                  });
                
                fieldColumns.push({
                  title: "状态",
                  dataIndex: 'status',
                  key: 'status'
                });
                




        this.columns = [ ...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span >
                   
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

    onFooterBack(){

        
        router.back();
        
    }


componentWillMount() {
    var that = this;
    this.startHeader();
    //this.props.tablesStore.queryAll();
    let moduleId = this.props.query.moduleId;
    this.props.tablesStore.queryByModuleId(moduleId);
}

    pagination() {
        return {
            //total: this.props.tablesStore.dataObject.list.length,
            showSizeChanger: true,
        };
    }
    handleLineUpdate(index, record) {
        let that = this;
        router.push({pathname:'/xtable/edit',query:{tableId:record.id}});

    }
    handleLineDetail(record) {
        let that = this;
        router.push({pathname:'/xtable/detail',query:{tableId:record.id}});


    }
   
    handleLineAdd() {
        let that = this;
        //this.context.router.push({pathname:'//xtable/add'});
        router.push({pathname:'/xtable/add',query:{...that.props.query}});
    }
    handleLineDelete(index, record) {
        var that = this;
        this.props.tablesStore.removeById(index,record.id);
    }

    handleSearchChange(e){
        console.log("search text;" + e.target.value);
        this.setState({searchText: e.target.value,name: e.target.value});
    }
    handleSearch(e) {
        e.preventDefault();
        console.log("begin to send search2...");
        var that = this;

        const data = {keywork: this.state.searchText};
        console.log(JSON.stringify(data));
        that.executeSearch(data);

    }
    executeSearch(param) {
        var that = this;
       model.queryByNameLike(param.keyword,function(response){
            if (response&& response.data) {
                console.log(JSON.stringify(response.data));
                response.data.map(function(item, i) {
                    item.key = item.id;
                });
                that.setState({
                    list: response.data
                });
            }
       });

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
                this.props.tablesStore.dataObject.list.slice()
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

            </div>
        );
    }
}


TableList.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}
