import React from 'react';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

type FormValues = {
  address: string;
};
interface Props {
  handleSubmit: (val: FormValues) => void;
  isLoading?: boolean
}

const SendFrom: React.FC<Props> = ({ handleSubmit, isLoading }) => {
  const { t } = useTranslation()

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
        label={t('testnet')}
        name="address"
        rules={[{ required: true, message: t('testnetError') }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {t('transfer')}
        </Button>
      </Form.Item>
    </Form>
  )
};

export default SendFrom;