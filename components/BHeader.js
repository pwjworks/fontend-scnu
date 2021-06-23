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
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
        <div className={styles.subHeaderRight}>
          <UserOutlined />
          <ShoppingCartOutlined />
          <Search className={styles.search} placeholder="input search text" style={{ width: 200 }} />
        </div>
      </Header>
    </>
  )
}