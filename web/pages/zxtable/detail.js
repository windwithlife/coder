import React from 'react';
import router from 'next/router';
import Layout from '../common/pages/layout';
import { Form, Input,Button} from 'antd';
import {Card} from 'antd';
import XSelect from '../common/components/form/select';
import XList from '../common/components/form/referlist';
import model from './models/model.js';
import { inject, observer } from 'mobx-react'
//import formHelper from '../common/components/form/formhelper.js'


const { TextArea } = Input;
const FormItem = Form.Item;
//var form = formHelper.form_decorator;

@inject('tablesStore')  @observer
export default class DetailForm extends React.Component {
    constructor(props){
        super(props)
        this.itemStore = props.tablesStore;
    }
    componentDidMount () {
        var tableId = this.props.query.pxtableId;
        console.log("edit id:=" + tableId);
        //this.props.tablesStore.getItemById(tableId);
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
                            {that.itemStore.name}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="说明"
                            >
                            {that.itemStore.description}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="表结构定义"
                            >
                            {that.itemStore.defineText}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="是否使用"
                            >
                            {that.itemStore.status}
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


DetailForm.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

