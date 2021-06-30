import { Table, Button, Modal, Input, Space, Form, notification, InputNumber, Popconfirm, Typography, Upload, message } from 'antd';
import { UserOutlined, CommentOutlined, MailOutlined, SmileOutlined, InboxOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import delProducts from '../pages/api/dashboard/del-products';
import getProducts from '../pages/api/dashboard/get-products';
import addProduct from '../pages/api/dashboard/add-product';
import updateProduct from '../pages/api/dashboard/update-product';
import { useRouter } from 'next/router'

const { Dragger } = Upload;




export default function UserManagementPanel() {
  const router = useRouter()
  const [products, setProducts] = useState([]);    // 用户数据
  const [selected, setSelected] = useState([]);    // 已选数据
  const [disabled, setDisabled] = useState(true);  // 对话框可见性
  const [upDisabled, setUpDisabled] = useState(true);  // 对话框可见性
  const [upload, setUpload] = useState(false);   // 对话框可见性
  const [visible, setVisible] = useState(false);   // 对话框可见性
  const [loading, setLoading] = useState(false);   // 对话框可见性
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  // 页面加载时请求数据
  useEffect(() => {
    getProducts().then(res => {
      console.log(res);
      setProducts(res.data.data);
    })
  }, []);
  useEffect(() => {
    console.log(products);
    console.log(selected);
  }, [selected]);


  // 上传事件
  const showUpload = () => {
    setUpload(true);
  };
  const cancelUpload = () => {
    setUpload(false);
  }
  const props = {
    name: 'file',
    accept: ".jpg",
    action: 'http://localhost:8080/picUpload',
    headers: {
      'Authorization': localStorage.getItem('Authorization'),
    },
    data: {
      id: selected[0]
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  // 选择事件
  const rowSelection = {
    onChange: (selectedRowKeys) => {

      setSelected(selectedRowKeys);
    },
  };
  // 删除事件
  useEffect(() => {
    if (selected.length === 1) {
      setUpDisabled(false);
    } else {
      setUpDisabled(true);
    }
    if (selected.length > 0) {
      setDisabled(false);
    } else {
      setUpDisabled(true);
      setDisabled(true);
    }
  }, [selected])
  const handleDelete = function () {
    if (selected.length !== 0) {
      delProducts({ ids: selected }).then((res) => {
        notification.open({
          message: '删除成功',
          description:
            '删除数据',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        });
        setProducts(res.data.data);
        setSelected([]);
      })
    }
  }
  // 对话框相关事件
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    getProducts().then(res => {
      setProducts(res.data.data);
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
      addProduct(values).then((res) => {
        if (res.data.success) {
          notification.open({
            message: '添加成功',
            description:
              '已经插入数据',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
        } else if (res.data.code === 2001) {
          router.push("/login");
        }
      });
      setLoading(false);
    };
  };
  const onFinishFailed = (errorInf) => {
    console.log('Failed:', errorInf);
  };



  const isEditing = (record) => record.productId === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.productId);
  };

  const cancel = () => {
    setEditingKey('');
  };


  const columns = [
    {
      title: 'Id',
      dataIndex: 'productId',
      width: '10%',
      key: 'productId',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'productName',
      width: '10%',
      key: 'productName',
      editable: true,
    },

    {
      title: 'Num',
      dataIndex: 'productNum',
      width: '15%',
      key: 'productNum',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '15%',
      key: 'price',
      editable: true,
    },
    {
      title: 'Desc',
      dataIndex: 'productCore',
      width: '15%',
      key: 'productCore',
      editable: true,
    },
    {
      title: 'CategoryId',
      dataIndex: 'categoryId',
      width: '15%',
      key: 'CategoryId',
      editable: true,
    },
    {
      title: 'BrandId',
      dataIndex: 'brandId',
      width: '15%',
      key: 'brandId',
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
      updateProduct(row).then((res) => {
        notification.open({
          message: '更改成功',
          description:
            '已经更改' + res.data.ret + '条数据',
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        }
        );
        console.log(res.data);
        setProducts(res.data.productInfos);
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
        <Button type="primary" onClick={showUpload} disabled={upDisabled} style={{ marginLeft: 16 }} >
          Upload
        </Button>
        <Modal
          title="Add Product"
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
                label="ProductName"
                name="productName"
                rules={[{ required: true, message: 'Please input your productName!' }]}
              >
                <Input prefix={<UserOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="ProductNum"
                name="productNum"
                rules={[{ required: true, message: 'Please input your productNum!' }]}
              >
                <Input prefix={<CommentOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input your Price!' }]}
              >
                <Input prefix={<MailOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="Desc"
                name="productCore"
                rules={[{ required: true, message: 'Please input your Desc!' }]}
              >
                <Input prefix={<MailOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="CategoryId"
                name="categoryId"
                rules={[{ required: true, message: 'Please input your CategoryId!' }]}
              >
                <Input prefix={<MailOutlined />} style={{ width: 300 }} />
              </Form.Item>
              <Form.Item
                label="BrandId"
                name="brandId"
                rules={[{ required: true, message: 'Please input your BrandId!' }]}
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
        <Modal
          title="upload pic"
          visible={upload}
          onCancel={cancelUpload}
          footer={null}

        >
          <Dragger {...props} >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other
              band files
            </p>
          </Dragger>
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
          dataSource={products}
          columns={mergedColumns}
          rowClassName="editable-row"
          rowKey={data => data.productId}
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