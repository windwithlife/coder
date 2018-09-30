import React from 'react';

import router from 'next/router';
import Layout from '../common/pages/layout';
import { Form, Input,Button} from 'antd';
import {Card} from 'antd';
import FileUpload from '../common/components/form/upload';
import XSelect from '../common/components/form/select';
import XList from '../common/components/form/referlist';
import model from './models/model.js';
//import '../common/styles/App.less';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};



class EditForm extends React.Component {

    state={
        items:{id:-1},
    }
    componentWillMount(){
        // this.setState({item:this.props.location.state.item});
        var that = this;
        console.log("edit id:=" + this.props.query.channelid);
        model.queryById(this.props.query.channelId,function(response) {
            if (response && response.data) {
                console.log(response.data);
                that.setState({items:response.data});
            }
        })
    }

    handleSaveAndEdit(childModuleName,data) {

        let that = this;
        let params = {...that.props.query,fromModule:'channel'};
        router.push({pathname:'/'+ childModuleName+ '/list',query:params});
    }

    onSaveAndEdit(childModuleName,e){
        e.preventDefault();
        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values};
                console.log('Received values of form: ', values);
                that.handleSaveAndEdit(childModuleName,data);
            }
        });
    }
    onAssociationEdit(aName,referm,e){
        e.preventDefault();
        var that = this;
        let params = {...that.props.query,associationName:aName,referModule:referm};
        router.push({pathname:'/channel/association',query:params});
    }
    handleSubmitUpdate(data) {
        let that = this;
        model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                let params = {...that.props.query};
                router.push({pathname:'/channel/list',query:params});
            }
        })

    }
    
    handleSubmit(e) {
        e.preventDefault();
        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values, id:this.state.items.id};
                console.log('Received values of form: ', values);
                that.handleSubmitUpdate(data);
            }
        });
    }
   


render()
{
    var that = this;
    var listItems = this.state.items;
    console.log(listItems);
   // let selectIndex = listItems.sex? listItems.sex:-1;

    const { getFieldDecorator } = this.props.form;
    console.log("modal interal" + JSON.stringify(listItems));
    
    return (
            <Card>
            <Form  onSubmit={this.handleSubmit.bind(this)}>
               
                        <Card type="inner">
                        <FormItem
                            label="名称"
                            hasFeedback
                            {...formItemLayout}
                            >
                            {getFieldDecorator("name", {
                                initialValue: listItems.name,
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="说明"
                            hasFeedback
                            {...formItemLayout}
                            >
                            {getFieldDecorator("description", {
                                initialValue: listItems.description,
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        </Card>
                
                    <Card type="inner">
                <Form.Item label="所属项目"
                            hasFeedback {...formItemLayout}> {
                    getFieldDecorator("myproject", {
                        initialValue: listItems.myproject,
                    })(
                        < XSelect  category="" refer ="project" display= {this.props.query.fromModule =='project' ? 'no':'yes'} />
                    )}
                    < /Form.Item>
                        </Card>
                        
                    <Form.Item >
                        <XList  onEdit ={that.onAssociationEdit.bind(that,'channeltabledefine','tabledefine')} refer ="channeltabledefine" mapField="channelId" byId={that.props.query.channelId}  title="所用表" />
                    </Form.Item>
                
                    <Card type="inner">
                <Form.Item label="是否使用"
                            hasFeedback {...formItemLayout}> {
                    getFieldDecorator("isenable", {
                        initialValue: listItems.isenable,
                    })(
                        < XSelect  category="tablestatus" refer ="" display= {this.props.query.fromModule =='' ? 'no':'yes'} />
                    )}
                    < /Form.Item>
                        </Card>
                        
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


const MyForm = Form.create()(EditForm);

export default class Page extends React.Component{

    render(){
        return (<Layout><MyForm query={this.props.query}/></Layout>)
}
}
Page.getInitialProps = async function(context){
    return {query:context.query};
}

