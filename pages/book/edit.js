import React from 'react';
//import { browserHistory } from 'react-router';
import router from 'next/router';
import Layout from '../../layout';
import { Form, Input,Button} from 'antd';
import FileUpload from '../common/components/form/upload';
import XSelect from '../common/components/form/select';
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
        items:this.props.query,
    }
    componentWillMount(){
       // this.setState({item:this.props.location.state.item});
    }
    
    handleSubmitUpdate(data) {
        model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                //browserHistory.push('/client/book/');
                router.push({pathname:'/book/list'});
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
        
    var listItems = this.state.items;
    console.log(listItems);
    let selectIndex = listItems.sex? listItems.sex:-1;

    const { getFieldDecorator } = this.props.form;
    console.log("modal interal" + JSON.stringify(listItems));
    
    return (
        
            <Form  onSubmit={this.handleSubmit.bind(this)}>
               
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
                
                        <FormItem
                            label="题目描述"
                            hasFeedback
                            {...formItemLayout}
                            >
                            {getFieldDecorator("text", {
                                initialValue: listItems.text,
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                

                <Form.Item label="性别"
                            hasFeedback {...formItemLayout}> {
                    getFieldDecorator("sex", {
                        initialValue: {id:selectIndex},
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
    static async getInitialProps(context){
        console.log( context.query);
        return {ctx:context};
    }
    render(){
        return (<Layout> <MyForm {...this.props.ctx}/></Layout>)
    }
}

