import React from 'react';
import { Form, Input,Button,Select} from 'antd';
import {Card} from 'antd';
import model from './models/model.js';
import FileUpload from '../common/components/form/upload';
import XSelect from '../common/components/form/select';
import XList from '../common/components/form/referlist';
import router from 'next/router';
import { inject, observer } from 'mobx-react'
import formHelper from '../common/components/form/formhelper.js'


const { TextArea } = Input;
const FormItem = Form.Item;
var form = formHelper.form_decorator;

@inject('tablesStore') @form('tablesStore') @observer
export default class AddNewForm extends React.Component {
    constructor(props){
        super(props);
        this.itemStore = props.tablesStore;
    }
    handleSubmit(e) {
        e.preventDefault();
        var that = this;
        that.itemStore.addItem(function(){
            let params = {...that.props.query};
            router.push({pathname:'/pxtable/list',query:params});
        })

    }

    onSaveAndEdit(childModuleName,e){
        e.preventDefault();
        this.itemStore.addItem(function(result){
            if (result) {
                let params = {...that.props.query,pxtableId:result.id,fromModule:'pxtable'};
                router.push({pathname:'/'+ childModuleName+ '/list',query:params});
            }
        });
    }

    onAssociationEdit(aName,referModule,e){
        e.preventDefault();
        var that = this;
        this.itemStore.addItem(function(result) {
            if (result) {
                console.log(response.data);
                let params = {...that.props.query,moduleName:"pxtable",moduleId:result.id,associationName:associationModule,referModule:referm};
                router.push({pathname:'/pxtable/association',query:params});
            }
        });
    }

render()
{

    var that = this;
    const { getFieldDecorator } = this.props.form;
    return (
            <Card>
            <Form  onSubmit={this.handleSubmit.bind(this)}>
            
                <Card type="inner">
                <FormItem label="名称" >
                            {getFieldDecorator("name", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                </Card>
                
                <Card type="inner">
                <FormItem label="说明" >
                            {getFieldDecorator("description", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                </Card>
                
                <Card type="inner">
                <Form.Item label="表结构定义">
                    {getFieldDecorator("defineText", { initialValue: ''})(<TextArea rows={5} />)}
                </Form.Item>
                </Card>
                
                    <Card type="inner">
                <Form.Item label="是否使用" >
                            {
                    getFieldDecorator("status", {
                        initialValue: "-1",
                    })(
                        < XSelect  category="data_status" refer ="" display= {(this.props.query.fromModule =='') ? 'no':'yes' } />
                    )}
                < /Form.Item>
                    </Card>
                
                <Form.Item >
                    <XList  onEdit ={that.onSaveAndEdit.bind(that,'pxtablecolumn')} refer ="pxtablecolumn" mapField="tableId" byId='-1'  title="表字段定义" />
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


AddNewForm.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

//export default()=>(<Layout> <MyForm/></Layout>)

