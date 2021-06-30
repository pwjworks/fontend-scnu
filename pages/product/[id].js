import { Layout, Empty, Image, Typography, Button } from "antd";
import React, { useState, useEffect } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import styles from "../../styles/[id].module.css";
import BHeader from "../../components/BHeader";
import getProductDetails from "../api/product/get-product-details";
import addItem from "../api/shoppingcart/add-item"
import { useRouter } from 'next/router'
import { notifyOK, notifyFail } from '../../utils/notify'


const { Title, Text } = Typography;
const { Footer } = Layout;

// const getAllProductsId = async function () {
//   const res = await getProductsId();
//   return res.data.data.map(productId => {
//     return {
//       params: {
//         id: productId.toString()
//       }
//     }
//   })
// }

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
  const router= useRouter();
  const [postData,setPostData] =useState([]);
  const { id } = router.query;
  useEffect(() =>{
    getProductDetails(id).then(res=>{
      setPostData(res.data.data);
    })
  },[])
  const handleAdd = function (productId) {
    const username = window.sessionStorage.getItem("username");
    if (username == null) {
      router.push('/login')
    } else {
      addItem(username, productId).then(res => {
        if (res.data.success) {
          notifyOK("添加成功");
        } else {
          notifyFail(res.data.msg);
        }
      })
    }
  }
  return (
    <>
      <BHeader></BHeader>
      <Layout >
        <div className={styles.mainContainer}>
          <div className={styles.previewWrap}>
            <Image
              width={450}
              height={450}
              alt="example" src={"https://ssm-scnu.oss-cn-guangzhou.aliyuncs.com/pic/" + postData.productId + ".jpg"} />
          </div>

          <div className={styles.infoWrap}>
            <Title level={4}>
              {postData.productName}
            </Title>
            <p>{postData.productCore}</p>
            <div className={styles.priceInfo}>

              <Text className={styles.info} strong>限时打折:</Text>
              <Text type="danger" className={styles.realPrice} strong>{postData.price}</Text>
              <Text className={styles.deletedPrice} delete>{postData.price * 10}</Text>
            </div>
            <p className={styles.deliverInfo}>由 GGSHOP 发货, GGSHOP自营旗舰店提供售后服务. 有货（外地跨区调货）,暂免调货服务费. 18:00前下单，预计两天后送达，受道路资源影响，您的订单可能会有所延迟，我们将尽快为您送达，请您耐心等待！</p>
            <div className={styles.btn}>
              <Button onClick={() => handleAdd(postData.productId)} className={styles.addbtn} type="primary" icon={<DownloadOutlined />} size="large">加入购物车</Button>
            </div>
          </div>
        </div>
      </Layout>
      <Footer>Footer</Footer>
    </>
  )
}

// export async function getStaticPaths() {
//   const paths = await getAllProductsId();
//   return {
//     paths,
//     fallback: false
//   }
//   // Return a list of possible value for id
// }

// export async function getStaticProps({ params }) {
//   const postData = await getProductDetails(params.id);
//   return {
//     props: {
//       "postData": postData.data.data
//     }
//   }
// }