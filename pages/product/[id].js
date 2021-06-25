import { Layout, Empty, Card, Image, Typography, Button } from "antd";
import React, { useState, useEffect } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import styles from "../../styles/[id].module.css";
import BHeader from "../../components/BHeader";
import getProductsId from '../api/product/get-products-id'
import getProductDetails from "../api/product/get-product-details";


const { Title, Text } = Typography;

const getAllProductsId = async function () {
  const res = await getProductsId();
  return res.data.map(productId => {
    return {
      params: {
        id: productId.toString()
      }
    }
  })
}

export default function Parent({ postData }) {
  const [showChild, setShowChild] = useState(false);
  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return (<Empty description="loading..." />);
  }

  return <Child postData={postData} />;
}

function Child({ postData }) {
  console.log(postData);
  return (
    <>
      <BHeader></BHeader>
      <Layout >
      <div className={styles.mainContainer}>
        <div className={styles.previewWrap}>
          <Image
            width={450}
            height={450}
            alt="example" src={"https://ssm-scnu-1301304324.cos.ap-guangzhou.myqcloud.com/pic/"+postData.productId+".jpg"} />
        </div>

          <div className={styles.infoWrap}>
            <Title level={4}>
              {postData.productName}
            </Title>
            <p>{postData.productCore}</p>
            <div className={styles.priceInfo}>

              <Text className={styles.info} strong>限时打折:</Text>
              <Text type="danger" className={styles.realPrice} strong>{postData.price}</Text>
              <Text className={styles.deletedPrice} delete>13999</Text>
            </div>
            <Button type="primary" icon={<DownloadOutlined />} size="large">加入购物车</Button>

          </div>
        </div>
      </Layout>

    </>
  )
}

export async function getStaticPaths() {
  const paths = await getAllProductsId();
  return {
    paths,
    fallback: false
  }
  // Return a list of possible value for id
}

export async function getStaticProps({ params }) {
  const postData = await getProductDetails(params.id);
  return {
    props: {
      "postData": postData.data
    }
  }
}