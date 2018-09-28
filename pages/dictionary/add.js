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




class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.state.item = this.props.location.state.item;

    }


    handleSubmitUpdate(data) {
        if (this.props.query.parentId){data.category = this.props.query.parentId;};
        //data.id = 0;
        model.add(data, function(response) {
            if (response && response.data) {
                console.log(data);
                router.push('/dictionary/list');
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



render()
{


    const { getFieldDecorator } = this.props.form;


    return (

            <Form  onSubmit={this.handleSubmit.bind(this)}>
            
                <FormItem label="显示名称" >
                            {getFieldDecorator("name", {
                                initialValue: 'test',
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                

                <Form.Item label="字典类别" >
                            {
                    getFieldDecorator("category", {
                        initialValue: {id:"-1"},
                    })(
                        < XSelect  category="" refer ="category"  />
                    )}
                < /Form.Item>
                


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
        return (<Layout><MyForm {...this.props.ctx}/></Layout>)
    }
}
Page.getInitialProps = async function(context){
    return {ctx:context};
}

//export default()=>(<Layout> <MyForm/></Layout>)

