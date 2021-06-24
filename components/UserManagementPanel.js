import { Table, Button, Modal, Input, Space, Form, notification, InputNumber, Popconfirm, Typography } from 'antd';
import { UserOutlined, CommentOutlined, MailOutlined, SmileOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import delCustomers from '../pages/api/dashboard/del-customers';
import getCustomers from '../pages/api/dashboard/get-customers';
import addCustomer from '../pages/api/dashboard/add-customer';
import updateCustomer from '../pages/api/dashboard/update-customer';

export default function UserManagementPanel() {

  const [customers, setCustomers] = useState([]);    // 用户数据
  const [selected, setSelected] = useState([]);    // 已选数据
  const [disabled, setDisabled] = useState(true);    // 对话框可见性
  const [visible, setVisible] = useState(false);    // 对话框可见性
  const [loading, setLoading] = useState(false);    // 对话框可见性
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  // 页面加载时请求数据
  useEffect(() => {
    getCustomers().then(res => {
      setCustomers(res.data);
    })
  }, []);
  useEffect(() => {
    console.log(selected);
  }, [selected]);

  // 选择事件
  const rowSelection = {
    onChange: (selectedRowKeys) => {

      setSelected(selectedRowKeys);
    },
  };
  // 删除事件
  useEffect(() => {
    if (selected.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [selected])
  const handleDelete = function () {
    if (selected.length !== 0) {
      delCustomers({ ids: selected }).then((res) => {
        notification.open({
          message: '删除成功',
          description:
            '已经删除' + res.data.ret + '条数据',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        setCustomers(res.data.customers);
        setSelected([]);
      })
    }
  }
  // 对话框相关事件
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    getCustomers().then(res => {
      setCustomers(res.data);
    })
    setVisible(false);
  };

  // 表单相关事件和设置
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  const onFinish = (values) => {
    if (values !== null) {
      setLoading(true);
      console.log(values);
      addCustomer(values).then((res) => {
        notification.open({
          message: '添加成功',
          description:
            '已经插入' + res.data.ret + '条数据',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
      });
      setLoading(false);
    };
  };
  const onFinishFailed = (errorInf) => {
    console.log('Failed:', errorInf);
  };



  const isEditing = (record) => record.customerId === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.customerId);
  };

  const cancel = () => {
    setEditingKey('');
  };


  const columns = [
    {
      title: 'Id',
      dataIndex: 'customerId',
      width: '15%',
      key: 'customerId',
      editable: true,
    },

    {
      title: 'Tel',
      dataIndex: 'customerTel',
      width: '15%',
      key: 'customerTel',
      editable: true,
    },
    {
      title: 'Male',
      dataIndex: 'customerMale',
      width: '15%',
      key: 'customerMale',
      editable: true,
    },

    {
      title: 'Birth',
      dataIndex: 'customerBirth',
      width: '15%',
      key: 'customerBirth',
      editable: true,
    },
    {
      title: 'Mail',
      dataIndex: 'customerMail',
      width: '15%',
      key: 'customerMail',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'customerAddress',
      width: '25%',
      key: 'customerAddress',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      updateCustomer(row).then((res) => {
        notification.open({
          message: '更改成功',
          description:
            '已经更改' + res.data.ret + '条数据',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        }
        );
        console.log(res.data);
        setCustomers(res.data.customers);
      });
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };



  return (
    <div>
      <div style={{ marginBottom: 16 }}>

        <Button type="primary" onClick={showModal}>
          Add
        </Button>
        <Button type="primary" onClick={(e) => handleDelete()} disabled={disabled} danger style={{ marginLeft: 16 }} >
          Delete
        </Button>
        <Modal
          title="Add user"
          visible={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <Space direction="vertical">
            <Form
              {...layout}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Tel"
                name="customerTel"
                rules={[{ required: true, message: 'Please input your Tel!' }]}
              >
                <Input prefix={<UserOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="Mail"
                name="customerMail"
                rules={[{ required: true, message: 'Please input your Mail!' }]}
              >
                <Input prefix={<CommentOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="Male"
                name="customerMale"
                rules={[{ required: true, message: 'Please input your Male!' }]}
              >
                <Input prefix={<MailOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="Address"
                name="customerAddress"
                rules={[{ required: true, message: 'Please input your Address!' }]}
              >
                <Input prefix={<MailOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="Birth"
                name="customerBirth"
                rules={[{ required: true, message: 'Please input your Birth!' }]}
              >
                <Input prefix={<MailOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Space>
        </Modal>
        <span style={{ marginLeft: 8 }}>

        </span>
      </div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={customers}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey={data => data.customerId}
          rowSelection={rowSelection}
          pagination={{ pageSize: 20 }}
        />
      </Form>
    </div >
  )
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};