import { Layout, Menu, Empty, Space, Card, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Main.module.css';

import getProduct from "../api/main/get-products";

const { SubMenu } = Menu;
const { Meta } = Card;
const { Header, Footer, Content } = Layout;

export default function Parent(props) {
  const [showChild, setShowChild] = useState(false);
  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return (<Empty description="loading..." />);
  }

  return <Child products={props.products} ret={props.ret} />;
}


function Child(props) {
  console.log(props);
  const cols = []
  for (let i = 0; i < props.ret; i++) {
    cols.push(
      <Col key={i.toString()} span={6}>
        <Card className={styles.productCard}
          hoverable
          cover={<img alt="example" src={props.products[i].pic} />}
        >
          <Meta title={props.products[i].name} description="www.instagram.com" />
        </Card>
      </Col>
    )
  }
  return (
    <>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
            <SubMenu key="sub1" title="Navigation One">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </Menu></Header>
        <Content>
          <Layout className={styles.main}>
            <Row gutter={[24, 24]} className={styles.rowCard} align="middle" justify="center">
              {cols}
            </Row>
          </Layout>

        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await getProduct();
  return {
    props: {
      products: res.data.data,
      ret: res.data.ret
      // props for your component
    }
  }
}