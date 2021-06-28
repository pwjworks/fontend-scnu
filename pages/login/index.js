import React, { useState, useEffect } from 'react';
import { Layout, Empty, Divider, Typography, Input, Space, Form, Button, notification } from 'antd';
import BHeader from '../../components/BHeader';
import styles from '../../styles/LoginRegister.module.css';
import register from '../api/login/register';
import login from '../api/login/login';
import { useRouter } from 'next/router'
import { notifyOK, notifyFail } from '../utils/notify'

const { Footer, Content } = Layout;
const { Title } = Typography;

export default function Parent() {

  const [showChild, setShowChild] = useState(false);
  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return (<Empty description="loading..." />);
  }

  return <Child />;
}
function Child() {

  const router = useRouter()
  const onLoginFinish = function (values) {
    console.log(values)
    login(values).then(res => {
      if (typeof window !== 'undefined') {
        localStorage.setItem("Authorization",res.headers.authorization);
      }
      if (res.data.code === 200) {
        router.push('/');
      } else {
        notifyFail(res.data.errorMsg);
      }
    })
  }
  const onRegisterFinish = function (values) {
    if (values.password === values.confirmpassword) {
      let data = {};
      data.customerEmail = values.email;
      data.customerName = values.name;
      data.customerPassword = values.password;
      console.log(data);
      register(data).then(res => {
        if(res.data.success){
          notifyOK("注册成功，请到邮箱激活！");
        }else{
          notifyFail(res.data.msg);
        }
      })
    }
    // console.log(values);
  }
  return (
    <>
      <Layout>
        <BHeader></BHeader>
        <Content className={styles.container}>
          <div className={styles.loginRegisterContainer}>
            <div className={styles.panelContainer}>
              <Space direction="vertical">
                <Title level={4} className={styles.title}>登录</Title>
                <Form layout="vertical" onFinish={onLoginFinish}>
                  <Form.Item name="username" label="Email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Email" id="loginEmail" />
                  </Form.Item>
                  <Form.Item name="password" label="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="Password" id="loginPassword" />
                  </Form.Item>

                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className={styles.button} size="large" type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </div>
            <Divider type="vertical" className={styles.border} />
            <div className={styles.panelContainer}>
              <Space direction="vertical">
                <Title level={4} className={styles.title}>注册</Title>
                <Form layout="vertical" onFinish={onRegisterFinish}>
                  <Form.Item name="email" label="Email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="large size" />
                  </Form.Item>
                  <Form.Item name="name" label="Name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="large size" />
                  </Form.Item>
                  <Form.Item name="password" label="Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="large size" />
                  </Form.Item>
                  <Form.Item name="confirmpassword" label="Confirm Password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="large size" />
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className={styles.button} size="large" type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Space>
            </div>
          </div>

        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  )
};