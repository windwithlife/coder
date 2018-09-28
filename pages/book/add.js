import React from 'react';
//import { browserHistory } from 'react-router';
import { Form, Input,Button,Select} from 'antd';
import model from './models/model.js';
import FileUpload from '../common/components/form/upload';
import XSelect from '../common/components/form/select';
import XList from '../common/components/form/referlist';
import router from 'next/router';
import Layout from '../../layout';


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
    constructor(props) {
        super(props);
        this.state = {};
        //this.state.item = this.props.location.state.item;

    }
   
    
    handleSubmitUpdate(data) {
        data.id = 0;
        model.add(data, function(response) {
            if (response && response.data) {
                console.log(data);
                router.push('/book/list');
            }
        })

    }
    handleSubmit(e) {
        e.preventDefault();
        
        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values};
                console.log('Received values of form: ', values);
                that.handleSubmitUpdate(data);
            }
        });
    }
   

checkNumber(rule, value, callback)
{
    if (!value) {
        callback(new Error('年龄未填写'));
    }
    if (!/^[\d]{1,2}$/.test(value)) {
        callback(new Error('年龄不合法'));
    } else {
        callback();
    }
}


render()
{
        
    
    const { getFieldDecorator } = this.props.form;
    
    
    return (
        
            <Form  onSubmit={this.handleSubmit.bind(this)}>
                
                        <FormItem
                            label="名称"
                            hasFeedback
                            {...formItemLayout}
                            >
                            {getFieldDecorator("name", {
                                initialValue: 'test',
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                
                        <FormItem
                            label="题目描述"
                            hasFeedback
                            {...formItemLayout}
                            >
                            {getFieldDecorator("text", {
                                initialValue: 'test',
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                
                    <Form.Item >
                        <XList  refer ="level" module="book" byId='-1'  title="适用读者级别" />
                            </Form.Item>


                            

                <Form.Item label="性别"
                            hasFeedback {...formItemLayout}> {
                    getFieldDecorator("sex", {
                        initialValue: {id:"-1"},
                    })(
                        < XSelect  category="sex" refer =""  />
                    )}
                    < /Form.Item>
                        
                <FormItem
                    label="图片"
                    hasFeedback
                    {...formItemLayout}
                    >
                    {getFieldDecorator("pic", {
                        initialValue: 'empty',
                    })(
                        <FileUpload />
                    )}
                </FormItem>


                

                
                 <FormItem className="form-item-clear" >
                    <Button type="primary" htmlType="submit" size="large">Save</Button>
                </FormItem>
            </Form>
        
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
