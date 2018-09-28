import React from 'react';
import model from './models/model.js';
import 'antd/dist/antd.css';
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


const ListExample = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState() {
        var that = this;
        var fieldColumns=[];
        <%
                for (var field in data.moduleDefine){
                    var fieldDisplayName = data.moduleDefine[field].dName;
                    var fieldShow = data.moduleDefine[field].show;
                    var fieldRefer =  data.moduleDefine[field].refer;

                    if ((fieldShow=="select")||(fieldShow=="forlist")||(fieldShow=="yes")||(fieldShow=="image")){
                %>
                fieldColumns.push({
                  title: "<%=fieldDisplayName%>",
                  dataIndex: '<%=field%>',
                  key: '<%=field%>'
                });
                <%}}%>




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

        return {
            list: [],
            count: 0
        };
    },

    componentWillMount() {
        var that = this;
        var displayItemsData = [];
        model.queryAll(function(response) {
            if (response) {
                console.log(JSON.stringify(response.data));
                response.data.map(function(item, i) {
                     var itemData = {};

                     itemData.key = item.id;
                     itemData.id = item.id;

                    <%
                for (var field in data.moduleDefine){
                    var fieldDisplayName = data.moduleDefine[field].dName;
                    var fieldShow = data.moduleDefine[field].show;
                    var fieldRefer =  data.moduleDefine[field].refer;

                    if ((fieldShow=="select")||(fieldShow=="forlist")||(fieldShow=="yes")||(fieldShow=="image")){
                %>
                    itemData.<%=field%> =item.<%=field%>;
                <%}}%>

                    displayItemsData.push(itemData);
                });
                that.setState({
                    list: displayItemsData
                });
            }
        });
    },
    title() {
        const {
            getFieldDecorator
        } = this.props.form;
        return ( < div className = {"normal"} >
            < div className = {
                "search"
            } >
            < Form inline onSubmit = {
                this.handleSearch
            } >
            < Form.Item > {
                getFieldDecorator('field', {
                    initialValue: 'name',
                })( < Select >
                    < Select.Option value = "name" > 名字 < /Select.Option> 
                    < Select.Option value = "address" > 地址 < /Select.Option> 
                    < /Select>
                )
            } < /Form.Item> < Form.Item hasFeedback > {
                getFieldDecorator('keyword', {
                    initialValue: '',
                })( < Input type = "text" / > )
            } < /Form.Item> 
            < Button style = {
                {
                    marginRight: '10px'
                }
            }
            type = "primary"
            htmlType = "submit" > 搜索 < /Button> 
            < /Form> 
            < /div> 
            < div className = {
                "create"
            } >
            < Button onClick = {
                this.handleLineAdd.bind(this)
            } > 添加 < /Button> 
            < /div> 
            < /div>
        );
    },
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
    },
    handleLineUpdate(index, record) {


        this.state.currentItem = record;
        this.state.currentItem.index = index;
        //console.log('record:' + record);
        this.context.router.push({pathname:'/<%=data.endName%>/<%=data.moduleName%>/edit',state:{item:record}});
        
      

    },
    handleLineDetail(record) {

        this.state.currentItem = record;
        //this.state.currentItem.index = index;
        //console.log('record:' + record);
        this.context.router.push({pathname:'/<%=data.endName%>/<%=data.moduleName%>/detail',state:{item:record}});

    },
    handleLineDetailModal(record) {

        this.state.currentItem = record;
        this.setState({
            visible: true
        });

    },

    handleLineAdd() {

        this.context.router.push({pathname:'/<%=data.endName%>/<%=data.moduleName%>/add'});
    },
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

    },
    /*
    onCellChange(index, key) {
        return (value) => {
            const dataSource = [...this.state.list];
            dataSource[index][key] = value;
            this.setState({
                list: dataSource
            });
        };
    },

    handleSubmitUpdate(data) {
        model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                const dataSource = [...this.state.list];
                dataSource[data.index] = data;
                this.setState({
                    list: dataSource,
                    visible: false
                });
            }
        })

    },
    
    handleSubmitAdd(data) {
        model.add(data, function(response) {
            if (response && response.data) {
                const {
                    count,
                    list
                } = this.state;
                this.setState({
                    list: [...this.state.list, data],
                    count: count + 1,
                    visible: false
                });
            }

        })

    },*/
    handleCancelUpdate(e) {
        //e.preventDefault();
        this.setState({
            visible: false
        });
    },

    handleSearch(e) {
        e.preventDefault();
        var that = this;
        const {
            validateFields,
            getFieldsValue
        } = this.props.form;
        validateFields((errors) => {
            if (!!errors) {
                return;
            }
            const data = getFieldsValue();
            console.log(JSON.stringify(data));
            that.executeSearch(data);
        });
    },
    executeSearch(param) {
        var that = this;
       model.queryByNameLike(param.keyword,function(response){
            if (response&& response.data) {
                console.log(JSON.stringify(response.data));
                that.state.list =[];
                response.data.map(function(item, i) {
                    that.state.list.push({id:item.id,key:item.id,name:item.name,age:item.age});
                    
                });
                that.setState(that.state);
            }
       });

    },
    render() {

        
        return ( < div >
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
                () => 'Footer'
            }
            />

            < /div>
        );
    }
});

export default Form.create()(ListExample);