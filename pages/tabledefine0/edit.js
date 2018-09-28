import React from 'react';
//import { browserHistory } from 'react-router';
import router from 'next/router';
import Layout from '../../layout';
import { Form, Input,Button} from 'antd';
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
        items:{
            id:this.props.query.id,
            sex:-1
        }
    }
    componentWillMount(){
       // this.setState({item:this.props.location.state.item});
        var that = this;
        console.log("edit id:=" + this.props.query.id);
        model.queryById(this.props.query.id,function(response) {
            if (response && response.data) {
                console.log(response.data);
                //browserHistory.push('/client/tabledefine/');
                //router.push({pathname:'/tabledefine/list'});
                that.setState({items:response.data});
            }
        })
    }
    handleSaveAndEdit(childModule,data) {
        //if (this.props.query.parentId){data.parentId = this.props.query.parentId;};
        router.push({pathname:'/' + childModule + '/list',query:{parentId:this.props.query.id}});
        //data.id = 0;
        /*
         model.add(data, function(response) {
         if (response && response.data) {
         console.log(response.data);
         router.push({pathname:'/tablecolumn/list',query:{parentId:response.data.id}});
         }
         })*/

    }
    onSaveAndEdit(childModule,e){
        e.preventDefault();

        var that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const data = {...values};
                console.log('Received values of form: ', values);
                that.handleSaveAndEdit(childModule,data);
            }
        });
    }

    handleSubmitUpdate(data) {
        model.update(data, function(response) {
            if (response && response.data) {
                console.log(data);
                //browserHistory.push('/client/tabledefine/');
                router.push({pathname:'/tabledefine/list'});
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

    console.log("render the form content" + JSON.stringify(listItems));

    const { getFieldDecorator } = this.props.form;
    return (
        
            <Form  onSubmit={that.handleSubmit.bind(that)}>
               
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
                            label="表说明"
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
                        <Form.Item >
                            <XList onEdit={that.onSaveAndEdit.bind(that,"tablecolumn")} refer ="tablecolumn" module="mytable" byId={listItems.id}  title="表字段" />
                        </Form.Item>

                <Form.Item label="是否使用"
                            hasFeedback {...formItemLayout}> {
                    getFieldDecorator("isenable", {
                        initialValue: listItems.isenable,
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
    return {query:context.query};
}

