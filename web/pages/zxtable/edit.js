import React from 'react';

import router from 'next/router';
import Layout from '../common/pages/layout';
import { Form, Input,Button} from 'antd';
import {Card} from 'antd';
import FileUpload from '../common/components/form/upload';
import XSelect from '../common/components/form/select';
import XList from '../common/components/form/referlist';
import model from './models/model.js';
import { inject, observer} from 'mobx-react'
const { TextArea } = Input;
const FormItem = Form.Item;

const form = Form.create({onFieldsChange(props,fields){
    console.log('onFieldChange',fields)
    console.log('props',props)
    props.tablesStore.onFieldsChange(fields)
}});

@observer @inject('tablesStore') @form
export default class Page extends React.Component{

    componentDidMount () {
        var tableId = this.props.query.pxtableId;
        console.log("edit id:=" + tableId);
        this.props.tablesStore.getItemById(tableId);
    }
    onSaveAndEdit(childModuleName,e){
        e.preventDefault();
        var that = this;
        let params = {...that.props.query,fromModule:'pxtable'};
        router.push({pathname:'/'+ childModuleName+ '/list',query:params});
    }
    onAssociationEdit(aName,referm,e){
        e.preventDefault();
        var that = this;
        var mId = this.props.query.pxtableId;
        let params = {...that.props.query,moduleName:"pxtable",moduleId:mId,associationName:aName,referModule:referm};
        router.push({pathname:'/pxtable/association',query:params});
    }
    onSubmit(e){
        e.preventDefault();
        var that = this;
        that.props.tablesStore.updateItem(function(){
            let params = {...that.props.query};
            router.push({pathname:'/pxtable/list',query:params});
        })
    }
    render(){
        var that = this;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card>
            <Form  onSubmit={that.onSubmit.bind(that)}>

            <Card type="inner">
            <FormItem label="名称" >
            {getFieldDecorator("name", {
                initialValue: this.props.tablesStore.item.name
            })(
                <Input type="text" />
            )}
        </FormItem>
        </Card>

        <Card type="inner">
        <FormItem label="说明" >
        {getFieldDecorator("description", {
        initialValue: this.props.tablesStore.item.description
        })(
            <Input type="text" />
        )}
        </FormItem>
        </Card>

        <Card type="inner">
        <Form.Item label="表结构定义">
        {getFieldDecorator("defineText", { initialValue: this.props.tablesStore.item.defineText})(<TextArea rows={5} />)}
        </Form.Item>
        </Card>

        <Card type="inner">
        <Form.Item label="是否使用"
            hasFeedback > {
            getFieldDecorator("status", {
            initialValue: this.props.tablesStore.item.status,
             })(
                < XSelect  category="data_status" refer ="" display= {this.props.query.fromModule =='' ? 'no':'yes'} />
            )}
        < /Form.Item>
        </Card>


        <Form.Item >
            <XList  onEdit ={that.onSaveAndEdit.bind(that,"pxtablecolumn")} refer ="pxtablecolumn" mapField="tableId" byId={that.props.query.pxtableId}  title="表字段定义" />
        </Form.Item>

        <Card type="inner">
        <FormItem className="form-item-clear" >
        <Button type="primary" htmlType="submit" size="large">Save</Button>
        </FormItem>
        </Card>
        </Form>
        </Card>
        );
    }

}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

