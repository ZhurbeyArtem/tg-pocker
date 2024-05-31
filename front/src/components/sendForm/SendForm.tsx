import React from 'react';
import { Button, Form, Input } from 'antd';

type FormValues = {
  address: string;
};
interface Props {
  handleSubmit: (val: FormValues) => void;
  isLoading?: boolean
}

const SendFrom: React.FC<Props> = ({handleSubmit, isLoading}) => {

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Testnet address"
        name="address"
        rules={[{ required: true, message: 'Please input your testnet address!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Send Transaction
        </Button>
      </Form.Item>
    </Form>
  )
};

export default SendFrom;