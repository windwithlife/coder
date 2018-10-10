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


class ListExample extends React.Component{


    state = {
        list: [],
        count:0,
        searchText:'',
        parentId:this.props.query.parentId,

    }
    startHeader() {
        var that = this;
        var fieldColumns=[];
        
                fieldColumns.push({
                  title: "列名称",
                  dataIndex: 'name',
                  key: 'name'
                });
                
                fieldColumns.push({
                  title: "表说明",
                  dataIndex: 'description',
                  key: 'description'
                });
                
                fieldColumns.push({
                  title: "所属表",
                  dataIndex: 'mytable',
                  key: 'mytable'
                });
                
                fieldColumns.push({
                  title: "表字段类型",
                  dataIndex: 'fieldtype',
                  key: 'fieldtype'
                });
                
                fieldColumns.push({
                  title: "关联表",
                  dataIndex: 'refer',
                  key: 'refer'
                });
                
                fieldColumns.push({
                  title: "关联关系",
                  dataIndex: 'map',
                  key: 'map'
                });
                
                fieldColumns.push({
                  title: "关联字段",
                  dataIndex: 'mapField',
                  key: 'mapField'
                });
                




        this.columns = [ ...fieldColumns, {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => (
                <span >
                    <a href = "#" onClick = {that.handleLineAdd.bind(that)} > Add </a>
                    <span className = "ant-divider" />
                    <Popconfirm title = "Sure to delete?" onConfirm = {that.handleLineDelete.bind(that,index, record)} >
                        < a href = "#" > Delete </a>
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

        
        router.replace({pathname:"/tabledefine/edit" ,query:this.props.query});
        
    }


componentWillMount() {
    var that = this;
    this.startHeader();
    
    if(this.props.query.tabledefineId){
        model.queryReferListBy("tablecolumn","mytable",{id:this.props.query.tabledefineId},function(response){
            if (response && response.data) {
                console.log(response.data);
                response.data.map(function(item, i) {
                    item.key = item.id
                });
                that.setState({
                    list: response.data
                });

            }
        });
    }else{
        model.queryAll(function (response) {
            if (response && response.data) {
                console.log(JSON.stringify(response.data));
                console.log(response.data);
                response.data.map(function(item, i) {
                    item.key = item.id
                });
                that.setState({
                    list: response.data
                });
            }
        });
    }
    
}

    pagination() {
        return {
            total: this.state.list.length,
            showSizeChanger: true,
            onShowSizeChange: (current, pageSize) => {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange: (current) => {
                console.log('Current: ', current);
            },
        };
    }
    handleLineUpdate(index, record) {
        let that = this;

        this.state.currentItem = record;
        this.state.currentItem.index = index;
        router.push({pathname:'/tablecolumn/edit',query: {...that.props.query,tablecolumnId:record.id}});
        
      

    }
    handleLineDetail(record) {
        let that = this;

        this.state.currentItem = record;
        //this.state.currentItem.index = index;
        //console.log('record:' + record);
        //this.context.router.push({pathname:'//tablecolumn/detail',state:{item:record}});
        router.push({pathname:'/tablecolumn/detail',query:{...that.props.query,tablecolumnId:record.id}});


    }
    handleLineDetailModal(record) {

        this.state.currentItem = record;
        this.setState({
            visible: true
        });

    }

    handleLineAdd() {
        let that = this;
        //this.context.router.push({pathname:'//tablecolumn/add'});
        router.push({pathname:'/tablecolumn/add',query:{...that.props.query}});
    }
    handleLineDelete(index, record) {
        var that = this;
        model.removeById(record.id, function() {
            console.log('successful to remove: ID:' + record.id);
            const dataSource = [...that.state.list];
            dataSource.splice(index, 1);
            that.setState({
                list: dataSource
            });
        });

    }

    handleCancelUpdate(e) {
        //e.preventDefault();
        this.setState({
            visible: false
        });
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
                this.state.list
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



export default class Page extends React.Component{

    render(){
        return (<Layout><ListExample query={this.props.query}/></Layout>)
    }
}
Page.getInitialProps = async function(context){
    return {query:context.query};
}
//export default()=>(<Layout> <ListExample/></Layout>)