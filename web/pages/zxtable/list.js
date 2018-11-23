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

import '../common/styles/TableSearch.less';
import { inject, observer } from 'mobx-react'


const rowSelection = {
};

@inject('tablesStore') @observer
class ListExample extends React.Component{


    state = {
        list: [],
        count:0,
        searchText:'',
        parentId:this.props.query.parentId,

    }
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
        router.back();
    }


componentDidMount () {
    this.props.tablesStore.fetchAllTables();
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
        let that = this;

        this.state.currentItem = record;
        this.state.currentItem.index = index;
        router.push({pathname:'/zxtable/edit',query: {...that.props.query,pxtableId:record.id}});
        
      

    }
    handleLineDetail(record) {
        let that = this;

        this.state.currentItem = record;
        router.push({pathname:'/zxtable/detail',query:{...that.props.query,pxtableId:record.id}});


    }

    handleLineAdd() {
        let that = this;
        router.push({pathname:'/zxtable/add',query:{...that.props.query}});
    }
    handleLineDelete(index, record) {
        this.props.tablesStore.removeById(index,record);
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



export default class Page extends React.Component{

    render(){
        return (<ListExample query={this.props.query}/>
)
    }
}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}
//export default()=>(<Layout> <ListExample/></Layout>)