import { Menu, Layout, Input } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React from 'react';

const { Search } = Input;
const { Header } = Layout;
import styles from '../styles/BHeader.module.css';



export default function BHeader() {
  return (
    <>
      <Header className={styles.mainHeader}>
        <h1 className={styles.title}>BESTBUY</h1>
      </Header>
      <Header className={styles.subHeader}>
        <Menu className={styles.subHeaderNav} mode="horizontal">
          <Menu.Item key="1">手机</Menu.Item>
          <Menu.Item key="2">衣服</Menu.Item>
          <Menu.Item key="3">电脑</Menu.Item>
        </Menu>
        <div className={styles.subHeaderRight}>
          <UserOutlined style={{ fontSize: '16px' }} />
          <ShoppingCartOutlined style={{ fontSize: '16px' }} />
          <Search className={styles.search} placeholder="input search text" style={{ width: 200 }} />
        </div>
      </Header>
    </>
  )
}