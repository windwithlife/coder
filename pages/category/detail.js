import React from 'react';
import { browserHistory } from 'react-router';
import { Form, Input,Button} from 'antd';
import FileUpload from '../common/components/form/upload';
import XSelect from '../common/components/form/select';
import model from './models/model.js';
import '../common/styles/App.less';

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
        this.state.item = this.props.location.state.item;

    }
    componentWillMount(){
        this.setState({item:this.props.location.state.item});
    }
    
    handleSubmit(e) {
        browserHistory.push('/client/category/');
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
        
    var listItem = this.state.item;
    const { getFieldDecorator } = this.props.form;
    console.log("modal interal" + JSON.stringify(listItem));
    
    return (
        
            <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                
                        <FormItem
                            label="字典类别名称"
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
                            label="类别用途描述"
                            hasFeedback
                            {...formItemLayout}
                            >
                            {getFieldDecorator("description", {
                                initialValue: 'test',
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                
                 <FormItem className="form-item-clear" >
                    <Button type="primary" htmlType="submit" size="large">Go Back</Button>
                </FormItem>
            </Form>
        
    );
}
}

export default Form.create()(EditForm);
