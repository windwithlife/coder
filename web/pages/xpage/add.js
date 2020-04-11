import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/form/select';
const { TextArea } = Input;
const FormItem = Form.Item;


@inject('pagesStore') @inject('templatesStore') @observer
export default class TableAdd extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
        props.templatesStore.queryAll();
    }
    Store = () => {
        return this.props.pagesStore;
    }
    onFinish = values => {
        var that = this;
        let moduleId = this.props.query.moduleId;
        values.moduleId = moduleId;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add interface row'); router.back(); });
    }

    onChangeTemplate=(value)=>{
        let that = this;
        let index = value;
        console.log('index' + value);
        let templateDefineText = this.props.templatesStore.dataObject.list[index].defineText;
        console.log(templateDefineText);
        this.formRef.current.setFieldsValue({defineText:templateDefineText});
       
      }
    render() {
        var that = this;

        return (
            <Card>
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
                    <Form.Item name="name" label="名称(必须用英文）"
                        rules={[{
                            required: true,
                        },]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name="domain" label="选择接口所属的域(按数据表定义识别)" >
                    <Select onChange={that.onChangeTemplate}>
                        {that.props.templatesStore.dataObject.list.map(function (item, i) {
                            return (<Select.Option value={i}>{item.name}</Select.Option>);
                        })}
                    </Select>
                    </Form.Item>
                    <Form.Item name="defineText" label="页面布局模板">
                        <TextArea rows={5} />
                    </Form.Item>

                    <Card type="inner">
                        <FormItem className="form-item-clear" >
                            <Button type="primary" htmlType="submit" size="large">保存</Button>
                            <Button type="primary" size="large">取消</Button>
                            <Button type="primary"  size="large">继续进行页面详细配置</Button>
                        </FormItem>
                       
                        
                    </Card>
                </Form>
            </Card>
        );
    }
}
TableAdd.getInitialProps = async function (context) {
    return { query: context.query };
}

