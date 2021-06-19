import { Table, Button, Modal, Input, Space, Form, notification, InputNumber, Popconfirm, Typography } from 'antd';
import { UserOutlined, CommentOutlined, MailOutlined, SmileOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import delUsers from '../pages/api/dashboard/del-users';
import getUsers from '../pages/api/dashboard/get-users';
import addUser from '../pages/api/dashboard/add-user';
import updateUser from '../pages/api/dashboard/update-user';

export default function UserManagementPanel() {

  const [users, setUsers] = useState([]);    // 用户数据
  const [selected, setSelected] = useState([]);    // 已选数据
  const [disabled, setDisabled] = useState(true);    // 对话框可见性
  const [visible, setVisible] = useState(false);    // 对话框可见性
  const [loading, setLoading] = useState(false);    // 对话框可见性
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  // 页面加载时请求数据
  useEffect(() => {
    getUsers().then(res => {
      setUsers(res.data);
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
      delUsers({ ids: selected }).then((res) => {
        notification.open({
          message: '删除成功',
          description:
            '已经删除' + res.data.ret + '条数据',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        setUsers(res.data.users);
        setSelected([]);
      })
    }
  }
  // 对话框相关事件
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    getUsers().then(res => {
      setUsers(res.data);
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
      addUser(values).then((res) => {
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



  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };


  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '10%',
      key: 'id',
      editable: true,
    },

    {
      title: 'name',
      dataIndex: 'name',
      width: '15%',
      key: 'name',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      key: 'age',
      editable: true,
    },
    {
      title: 'email',
      dataIndex: 'email',
      width: '40%',
      key: 'email',
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
      updateUser(row).then((res) => {
        notification.open({
          message: '更改成功',
          description:
            '已经更改' + res.data.ret + '条数据',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        setUsers(res.data.users);
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
                label="Username"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input prefix={<UserOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: 'Please input your age!' }]}
              >
                <Input prefix={<CommentOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
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
          dataSource={users}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey={data => data.id}
          rowSelection={rowSelection}
          pagination={{ pageSize: 10 }}
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