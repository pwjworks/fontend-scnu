import { Layout, Empty, Card, Row, Col, Image, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import styles from '../styles/Main.module.css';
import BHeader from '../components/BHeader';

import getProduct from "./api/main/get-products";
import getPopular from "./api/main/get-popular";

const { Title } = Typography;
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

  return <Child products={props.products} popular={props.popular} />;
}


function Child(props) {
  console.log(props);
  const cols = [];
  const popular = [];
  for (let i = 0; i < props.products.length; i++) {
    cols.push(
      <Link key={i} href={"/product/" + props.products[i].productId}>
        <Col key={i} >
          <Card className={styles.productCard}
            hoverable
            cover={<Image
              width={280}
              height={280}
              preview={false}
              alt="example" src={"https://ssm-scnu.oss-cn-guangzhou.aliyuncs.com/pic/" + props.products[i].productId + ".jpg"} />}
          >
            <Meta title={props.products[i].productName} description={props.products[i].productCore} />
          </Card>
        </Col>
      </Link>

    )
  }
  for (let i = 0; i < props.popular.length; i++) {
    for (let j = 0; j < props.products.length; j++) {
      if (props.popular[i] === props.products[j].productId) {
        popular.push(
          <Link key={i} href={"/product/" + props.products[j].productId}>
            <Col key={i} >
              <Card className={styles.popularCard}
                hoverable
                cover={<Image
                  width={200}
                  height={200}
                  preview={false}
                  alt="example" src={"https://ssm-scnu.oss-cn-guangzhou.aliyuncs.com/pic/" + props.products[j].productId + ".jpg"} />}
              >
                <Meta title={props.products[j].productName} />
              </Card>
            </Col>
          </Link>
        )
      }
    }
  }
  console.log(popular);
  return (
    <>
      <Layout>
        <BHeader></BHeader>
        <Content style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <div className={styles.mainContainer}>
            <div className={styles.selection}>
              <Title level={4} className={styles.title}>热门排行</Title>
              <Row gutter={[24, 24]} className={styles.rowCard} align="middle" justify="center">
                {popular}
              </Row>
            </div>
            <div className={styles.productList}>
              <Row gutter={[24, 24]} className={styles.rowCard} align="middle">
                {cols}
              </Row>
            </div>
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await getProduct();
  const popular = await getPopular();
  return {
    props: {
      "products": res.data.data,
      "popular": popular.data.data
      // props for your component
    }
  }
}