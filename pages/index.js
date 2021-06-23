import { Layout, Empty, Card, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image';
import styles from '../styles/Main.module.css';
import BHeader from '../components/BHeader';

import getProduct from "./api/main/get-products";

const { Meta } = Card;
const { Footer, Content } = Layout;

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

  return <Child products={props.products} />;
}


function Child(props) {
  console.log(props);
  const cols = []
  for (let i = 0; i < props.products.length; i++) {
    cols.push(
      <Link href={"/product/" + i.toString()}>
        <Col key={i.toString()} span={6}>
          <Card className={styles.productCard}
            hoverable
            cover={<Image
              width={280}
              height={280}
              alt="example" src="/3090.jpg" />}
          >
            <Meta title={props.products[i].productName} description="www.instagram.com" />
          </Card>
        </Col>
      </Link>

    )
  }
  return (
    <>
      <Layout>
        <BHeader></BHeader>
        <Content className={styles.mainContainer}>
          <Layout className={styles.selection}>condition</Layout>
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
      products: res.data,
      // props for your component
    }
  }
}