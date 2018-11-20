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

const { TextArea } = Input;
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
        console.log("edit id:=" + this.props.query.xmoduleid);
        model.queryById(this.props.query.xmoduleId,function(response) {
            if (response && response.data) {
                console.log(response.data);
                that.setState({items:response.data});
            }
        })
    }

    handleSaveAndEdit(childModuleName,data) {

        let that = this;
        let params = {...that.props.query,fromModule:'xmodule'};
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
        var mId = this.props.query.xmoduleId;
        let params = {...that.props.query,moduleName:"xmodule",moduleId:mId,associationName:aName,referModule:referm};
        router.push({pathname:'/xmodule/association',query:params});
    }
    handleSubmitUpdate(data) {
        let that = this;
        model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                let params = {...that.props.query};
                router.push({pathname:'/xmodule/list',query:params});
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
                        <FormItem label="名称" >
                            {getFieldDecorator("name", {
                                initialValue: listItems.name
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem label="说明" >
                            {getFieldDecorator("description", {
                                initialValue: listItems.description
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                        </Card>
                
                    <Form.Item >
                        <XList  onEdit ={that.onAssociationEdit.bind(that,'','xpage')} refer ="" mapField="xmoduleId" byId={that.props.query.xmoduleId}  title="所含页面集" />
                    </Form.Item>

                
                    <Form.Item >
                        <XList  onEdit ={that.onAssociationEdit.bind(that,'xmodulextable','xtable')} refer ="xmodulextable" mapField="xmoduleId" byId={that.props.query.xmoduleId}  title="所用到表" />
                    </Form.Item>

                
                    <Card type="inner">
                <Form.Item label="是否使用"
                            hasFeedback {...formItemLayout}> {
                    getFieldDecorator("isenable", {
                        initialValue: listItems.isenable,
                    })(
                        < XSelect  category="data_status" refer ="" display= {this.props.query.fromModule =='' ? 'no':'yes'} />
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
        return (<Layout  path={this.props.path}><MyForm query={this.props.query}/></Layout>)
}
}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

