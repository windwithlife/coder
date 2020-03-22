import { Form, Input, Button, Select } from 'antd';

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

export default class Demo extends React.Component {
  formRef = React.createRef();

//   onGenderChange = value => {
//     this.formRef.current.setFieldsValue({
//       note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
//     });
//   };

  onFinish = values => {
    console.log(values);
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
    return (
      <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
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
          name="collection"
          label="集合"
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
            Back
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
