import React from 'react';
import router from 'next/router';
import Layout from '../common/pages/layout';
import { Form, Input,Button} from 'antd';
import {Card} from 'antd';
import XSelect from '../common/components/form/select';
import XList from '../common/components/form/referlist';
import model from './models/model.js';
import { inject, observer } from 'mobx-react'

const FormItem = Form.Item;


@inject('tablesStore') @observer
class EditForm extends React.Component {

    componentDidMount () {
        var tableId = this.props.query.pxtableId;
        console.log("edit id:=" + tableId);
        this.props.tablesStore.getItemById(tableId);
    }
    handleSubmit(e) {
        e.preventDefault();
        router.back();
    }

render()
{
    var that = this;
    const { getFieldDecorator } = this.props.form;
    return (
            <Card >
            <Form  onSubmit={this.handleSubmit.bind(this)}>
               
                        <Card type="inner">
                        <FormItem
                            label="名称"
                            >
                            {this.props.tablesStore.item.name}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="说明"
                            >
                            {this.props.tablesStore.item.description}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="表结构定义"
                            >
                            {this.props.tablesStore.item.defineText}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="是否使用"
                            >
                            {this.props.tablesStore.item.status}
                        </FormItem>
                        </Card>
                

                    <Form.Item >
                        <XList  onEdit ={null} refer ="pxtablecolumn" mapField="tableId" byId={that.props.query.pxtableId}  title="表字段定义" />
                        </Form.Item>

                
                 <Card type="inner">
                 <FormItem className="form-item-clear" >
                    <Button type="primary" htmlType="submit" size="large">Back</Button>
                </FormItem>
                </Card>
            </Form>
        </Card>
    );
}
}


const MyForm = Form.create()(EditForm);

export default class Page extends React.Component{

    render(){
        return (<MyForm query={this.props.query}/>)
    }
}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

