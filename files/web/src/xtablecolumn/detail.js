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

class EditForm extends React.Component {

    state={
        items:{id:-1},
    }
    componentWillMount(){

        var that = this;
        console.log("edit id:=" + this.props.query.id);
        model.queryById(this.props.query.xtablecolumnId,function(response) {
            if (response && response.data) {
                console.log(response.data);
                that.setState({items:response.data});
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        router.back();
    }

render()
{
    var that = this;
    var listItems = this.state.items;
    console.log(listItems);
    const { getFieldDecorator } = this.props.form;
    console.log("detail render data:" + JSON.stringify(listItems));
    
    return (
            <Card >
            <Form  onSubmit={this.handleSubmit.bind(this)}>
               
                        <Card type="inner">
                        <FormItem
                            label="列名称"
                            >
                            {listItems.name}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="表说明"
                            >
                            {listItems.description}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="所属表"
                            >
                            {listItems.tableId}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="表字段类型"
                            >
                            {listItems.fieldType}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="界面显示方式"
                            >
                            {listItems.showType}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="关联表"
                            >
                            {listItems.referModule}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="关联关系"
                            >
                            {listItems.map}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="关联字段"
                            >
                            {listItems.mapField}
                        </FormItem>
                        </Card>
                
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
        return (<Layout  path={this.props.path}><MyForm query={this.props.query}/></Layout>)
    }
}
Page.getInitialProps = async function(context){
    return {query:context.query,path:context.pathname};
}

