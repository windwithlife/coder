import React from 'react';
//import model from './models/model.js';
import Table from 'antd/lib/table';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Popconfirm from 'antd/lib/popconfirm';
import {
    Modal,
    Form,
    Card,
    Select,
    Input
} from 'antd';

import router from 'next/router';
import { inject, observer } from 'mobx-react';
import AddorEditPage from './AddorEditColumn';

const rowSelection = {
};
@inject('modulesStore') @inject('tablesStore')
@observer
export default class DetailPage extends React.Component {
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
            title: "表名称",
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

        //router.push({ pathname: '/zxtable/edit', query: { ...that.props.query, pxtableId: record.id } });
        this.setState({
            visible: true,
            operationTitle: "修改",
            operationType: "edit"
        });
    }
    handleLineDetail(record) {
        //router.push({ pathname: '/zxtable/detail', query: { ...that.props.query, pxtableId: record.id } });
    }
    handleLineAdd() {
        this.setState({ visible: true });
    }
    onModalConfirm() {
        //router.push({pathname:'/zxtable/add',query:{...that.props.query}});
        this.setState({ visible: false });
    }
    handleLineDelete(index, record) {
        console.log(record.id);
        this.props.columnsStore.removeById(record.id, index);
    }

    handleSearchChange(e) {
        this.setState({ searchText: e.target.value, name: e.target.value });
    }
    handleSearch(e) {
        e.preventDefault();
        let keywork = this.state.searchText
        this.props.tablesStore.fetchByNameLike(param.keyword);

    }
    render() {
        let that = this;
        let itemData = that.props.modulesStore.dataObject.currentItem;
        return (
            < div >
                <Modal visible={that.state.visible} title={that.state.operationTitle}
                    onCancel={this.onModalConfirm.bind(that)}
                    footer={[]}>
                    <AddorEditPage operationType={this.state.operationType} onConfirm={this.onModalConfirm.bind(that)}></AddorEditPage>
                </Modal>

                <div>
                    <Form  >
                        < Form.Item name="name" label="模块名：">
                            {itemData.name}
                        </Form.Item>
                        < Form.Item name="description" label="描述信息：">
                            {itemData.description}
                        </Form.Item>
                        < Form.Item name="website" label="站点：">
                            {itemData.description}
                        </Form.Item>
                        < Form.Item name="soaIp" label="服务地址：">
                            {itemData.description}
                        </Form.Item>
                        < Form.Item name="status" label="状态">
                            {itemData.status}
                        </Form.Item>
                        < Form.Item name="project" label="所属项目：">
                            {itemData.project}
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
                        that.props.modulesStore.dataObject.list.slice()
                    }
                    pagination={
                        this.pagination()
                    }
                    bordered title={() => ("所含表：")}
                    footer={
                        () => (<Button onClick={that.onFooterBack.bind(that)}>Back</Button>)
                    }
                />

            </div>
        );
    }
}

DetailPage.getInitialProps = async function (context) {
    return { query: context.query, path: context.pathname };
}
