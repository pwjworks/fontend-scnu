import { Layout, Empty, Card, Row, Col,Image } from 'antd';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
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
      <Link  key={i} href={"/product/" + props.products[i].productId}>
        <Col key={i} span={6}>
          <Card className={styles.productCard}
            hoverable
            cover={<Image
              width={280}
              height={280}
              preview={false}
              alt="example" src={"https://ssm-scnu-1301304324.cos.ap-guangzhou.myqcloud.com/pic/"+ props.products[i].productId+".jpg"} />}
          >
            <Meta title={props.products[i].productName} description={props.products[i].productCore} />
          </Card>
        </Col>
      </Link>

    )
  }
  return (
    <>
      <Layout>
        <BHeader></BHeader>
        <Content style={{'display': 'flex','justifyContent': 'center'}}>
          <div  className={styles.mainContainer}>
            <div className={styles.selection}>condition</div>
            <Layout className={styles.productList}>
              <Row gutter={[24, 24]} className={styles.rowCard} align="middle">
                {cols}
              </Row>
            </Layout>
          </div>
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
      "products": res.data,
      // props for your component
    }
  }
}