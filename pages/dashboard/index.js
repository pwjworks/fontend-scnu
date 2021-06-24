import { Layout, Menu, Breadcrumb, Empty, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import React, { useState, useEffect } from 'react';
import { Router, Route, Link } from 'react-router'
import UserManagementPanel from '../../components/UserManagementPanel';


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


  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            Dashboard
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
                <Menu.Item key="1"><Link to="/costomers">用户信息</Link></Menu.Item>

              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="商品管理">
                <Menu.Item key="5">option5</Menu.Item>

              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>

              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Layout>
              <Router>
              {/* <IndexRoute component={Dashboard} /> */}
              <Route path="/costomers" component={UserManagementPanel}/>

              </Router>
              </Layout>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
};
