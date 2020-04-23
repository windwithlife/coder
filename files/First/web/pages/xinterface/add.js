import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/form/select';
const { TextArea } = Input;
const FormItem = Form.Item;


@inject('interfacesStore') @inject('tablesStore')  
@observer
export default class TableAdd extends React.Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {};
        props.tablesStore.queryAll();
    }
    Store = () => {
        return this.props.interfacesStore;
    }
    onFinish = values => {
        var that = this;
        let moduleId = this.props.query.moduleId;
        values.moduleId = moduleId;
        console.log(values);
        this.Store().add(values, () => { console.log('finished add interface row'); router.back(); });
    }

    onChangeTable=(value)=>{
        let that = this;
        let index = value;
        console.log('index' + value);
        let tableData = this.props.tablesStore.dataObject.list[value];
        let tableId = tableData.id;
        let tableName = tableData.name;
        this.formRef.current.setFieldsValue({referModule:tableName});
       
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
                    <Form.Item name="domain" label="接口的域名称">
                        <Input />
                    </Form.Item>
                    <Form.Item name="domainSelect" label="选择接口所属的域(Model或者接口Path)">
                    <Select onChange={this.onChangeTable}>
                        <Option value="other">概据模块名生成</Option>
                        {that.props.tablesStore.dataObject.list.map(function (item, i) {
                            return (<Select.Option value={i}>{item.name}</Select.Option>);
                        })}
                    </Select>
                    </Form.Item>
                    <Form.Item name="description" label="描述">
                        <Input />
                    </Form.Item>
                    <Form.Item name="inputParams" label="入口参数对象定义">
                        <TextArea rows={5} />
                    </Form.Item>
                    <Form.Item name="outputParams" label="出口参数对象定义">
                        <TextArea rows={5} />
                    </Form.Item>

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
TableAdd.getInitialProps = async function (context) {
    return { query: context.query };
}

