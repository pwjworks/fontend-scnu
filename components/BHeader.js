import { Menu, Layout, Input,Select } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import searcher from '../pages/api/search/searcher';

const { Option } = Select;
const { Header } = Layout;
import styles from '../styles/BHeader.module.css';


export default function BHeader() {
  const [keywords,setKeywords] =useState('');
  const [data,setData] = useState([]);
  const options = data.map(d => 
      <Option key={d.productId}>{d.productName}</Option>
  );
  let timeout;
  let currentValue;
  const handleChange=(value)=>{
      setKeywords(value);
  }
  const handleSearch=(value)=>{
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;
    function fetch(){
      if(currentValue){
        searcher(currentValue).then(res=>{
          setData(res.data);
        });
      }else {
        setData([]);
      }
    }
    timeout = setTimeout(fetch, 1000);
  }
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
          <Select
            className={styles.search}
            showSearch
            placeholder="Search..."
            value={keywords}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
          >
            {options}
          </Select>
        </div>
      </Header>
    </>
  )
}