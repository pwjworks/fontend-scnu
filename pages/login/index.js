import React, { useState, useEffect } from 'react';
import { Layout, Empty, Divider, Typography, Input, Space, Form, Button } from 'antd';
import BHeader from '../../components/BHeader';
import styles from '../../styles/LoginRegister.module.css';
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
  const onFinish = function () {

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
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item name="user" label="User">
                    <Input size="large" placeholder="large size" />
                  </Form.Item>
                  <Form.Item name="password" label="Password">
                    <Input size="large" placeholder="large size" />
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
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item name="user" label="User">
                    <Input size="large" placeholder="large size" />
                  </Form.Item>
                  <Form.Item name="password" label="Password">
                    <Input size="large" placeholder="large size" />
                  </Form.Item>
                  <Form.Item name="confirmpassword" label="Confirm Password">
                    <Input size="large" placeholder="large size" />
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