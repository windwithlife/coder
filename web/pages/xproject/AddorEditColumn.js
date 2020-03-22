import { Form, Input, Button, Select } from 'antd';
import { inject, observer } from 'mobx-react';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};



@inject('columnsStore') 
@observer 
export default class Demo extends React.Component {
  formRef = React.createRef();

//   onGenderChange = value => {
//     this.formRef.current.setFieldsValue({
//       note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
//     });
//   };

  onFinish = values => {
    var that = this;
  
    values.tableId = 9999;
    this.props.columnsStore.dataObject.currentItem.id = values.id;
    this.props.columnsStore.dataObject.currentItem.name = values.name;
    this.props.columnsStore.dataObject.currentItem.fieldType = values.type;
    this.props.columnsStore.dataObject.currentItem.referModule = values.referModule;
    this.props.columnsStore.dataObject.currentItem.mapField = values.mapField;
    this.props.columnsStore.dataObject.currentItem.description = values.note;
    this.props.columnsStore.dataObject.currentItem.xtableId = values.tableId;
    this.props.columnsStore.addItem(function(value) { 
      console.log('ok save column');
      that.props.onConfirm();
    });
    
  };

//   onReset = () => {
//     this.formRef.current.resetFields();
//   };

//   onFill = () => {
//     this.formRef.current.setFieldsValue({
//       note: 'Hello world!',
//       gender: 'male',
//     });
//   };

  render() {
    var that = this;
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
        <Form.Item
          name="name"
          label="名称"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label="类型"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="referModule"
          label="外联类型"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="mapField"
          label="外联字段"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            //onChange={this.onGenderChange}
            allowClear
          >
            <Option value="map">Map</Option>
            <Option value="list">List</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="note"
          label="说明"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
       


        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.props.onConfirm}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
