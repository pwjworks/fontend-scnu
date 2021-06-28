import { Menu, Layout, Select, Button } from 'antd';
import { UserOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import searcher from '../pages/api/search/searcher';
import Link from 'next/link'

const { Option } = Select;
const { Header } = Layout;
import styles from '../styles/BHeader.module.css';


export default function BHeader() {
  const [id, setId] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState([]);
  const options = data.map(d =>
    <Option key={d.productId}>{d.productName}</Option>
  );
  let timeout;
  let currentValue;
  const handleChange = (value) => {
    setDisabled(false);
    setId(value);
  }
  const handleSearch = (value) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;
    function fetch() {
      if (currentValue) {
        searcher(currentValue).then(res => {
          setData(res.data);
        });
      } else {
        setData([]);
      }
    }
    timeout = setTimeout(fetch, 300);
  }
  return (
    <>
      <Header className={styles.mainHeader}>
        <h1 className={styles.title}>GGSHOP</h1>
      </Header>
      <Header className={styles.subHeader}>
        <Menu className={styles.subHeaderNav} mode="horizontal">
          <Menu.Item key="1">手机</Menu.Item>
          <Menu.Item key="2">衣服</Menu.Item>
          <Menu.Item key="3">电脑</Menu.Item>
        </Menu>
        <div className={styles.subHeaderRight}>
          <Link key="user" href="/login"><UserOutlined style={{ fontSize: '20px' }} /></Link>

          <Link key="user" href="/dashboard"><ShoppingCartOutlined style={{ fontSize: '20px' }} /></Link>
          <Select
            className={styles.search}
            showSearch
            placeholder="Search..."
            value={id}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
          >
            {options}

          </Select>
          <Link key="id" href={"/product/" + id}>
            <Button shape="circle" icon={<SearchOutlined />} disabled={disabled}>
            </Button>
          </Link>
        </div>
      </Header>
    </>
  )
}