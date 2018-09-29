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
        model.queryById(this.props.query.xmoduleId,function(response) {
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
                            label="名称"
                            >
                            {listItems.name}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="说明"
                            >
                            {listItems.description}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="所属项目"
                            >
                            {listItems.myproject}
                        </FormItem>
                        </Card>
                
                        <Card type="inner">
                        <FormItem
                            label="是否使用"
                            >
                            {listItems.isenable}
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
        return (<Layout><MyForm query={this.props.query}/></Layout>)
    }
}
Page.getInitialProps = async function(context){
    return {query:context.query};
}

