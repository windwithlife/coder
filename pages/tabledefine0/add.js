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
        if (this.props.query.parentId){data.parentId = this.props.query.parentId;};
        //data.id = 0;
        model.add(data, function(response) {
            if (response && response.data) {
                console.log(data);
                router.push('/tabledefine/list');
            }
        })

    }
    handleSaveAndEdit(data) {
        if (this.props.query.parentId){data.parentId = this.props.query.parentId;};
        //data.id = 0;
        model.add(data, function(response) {
            if (response && response.data) {
                console.log(response.data);
                router.push({pathname:'/tablecolumn/list',query:{parentId:response.data.id}});
            }
        })

    }
    onSaveAndEdit(childModuleName,e){
        e.preventDefault();
        console.log("Chilld moudle name :" + childModuleName);
        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values};
                console.log('Received values of form: ', values);
                that.handleSaveAndEdit(data);
            }
        });
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

    var that = this;
    const { getFieldDecorator } = this.props.form;


    return (

            <Form  onSubmit={this.handleSubmit.bind(this)}>
            
                <FormItem label="名称" >
                            {getFieldDecorator("name", {
                                initialValue: 'test',
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                
                <FormItem label="表说明" >
                            {getFieldDecorator("description", {
                                initialValue: 'test',
                                rules: [
                                    {required: true, message: '名称未填写'},
                                ],
                            })(
                                <Input type="text" />
                            )}
                </FormItem>
                
                <Form.Item >
                    <XList onEdit={that.onSaveAndEdit.bind(that,"tablecolumn")} refer ="tablecolumn" module="mytable" byId='-1'  title="表字段" />
                </Form.Item>


                <Form.Item label="是否使用" >
                            {
                    getFieldDecorator("isenable", {
                        initialValue: "-1",
                    })(
                        < XSelect  category="tablestatus" refer =""  />
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
        return (<Layout><MyForm query={this.props.query}/></Layout>)
    }
}
Page.getInitialProps = async function(context){
    console.log("Initialize the page data")

    return {query:context.query};
}

//export default()=>(<Layout> <MyForm/></Layout>)

