import { Layout, Empty, Image, Typography, Button, List, Avatar, Space, Tabs, InputNumber, Radio } from "antd";
import BHeader from "../../components/BHeader";
import React, { useState, useEffect } from 'react';
import styles from "../../styles/user.module.css"
import getAll from "../api/shoppingcart/get-shoppingCart"
const { TabPane } = Tabs;
const { Content, Footer } = Layout;
const { Title } = Typography;


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
  const [data, setData] = useState([]);

  useEffect(() => {
    getAll().then(res => {
      console.log(res);
    })
  }, [])

  return (
    <>
      <BHeader></BHeader>
      <Layout>

        <div className={styles.main}>
          <div className={styles.mainContainer}>
            <Tabs defaultActiveKey="1" type="card" size="large">
              <TabPane tab="购物车" key="1">
                <List
                  bordered
                  itemLayout="vertical"
                  size="large">
                  <List.Item
                    extra={
                      <>
                        <div className={styles.extra}>
                          <div className={styles.pricenumInfo}>
                            <Title level={5}>金额</Title>
                            <Title level={5} type="danger" className={styles.price}>9999</Title>
                          </div>
                          <div className={styles.pricenumInfo}>
                            <Title level={5}>数量</Title>
                            <InputNumber className={styles.num}></InputNumber>

                          </div>
                          <div className={styles.btnContainer}>
                            <Button className={styles.btn}>更改</Button>
                            <Button danger className={styles.btn}>删除</Button>
                          </div>
                          <Radio></Radio>
                        </div>
                      </>
                    }
                  >
                    <List.Item.Meta
                      avatar={<Image src="./3090.jpg" width={150}></Image>}
                      title={<a>华硕 ASUS ROG-STRIX-RTX3090-O24G-GAMING 1860-1890MHz 赛博朋克电竞游戏专业显卡 可支持8k显示器</a>}
                      description="适配赛博朋克2077"
                    />
                  </List.Item>
                </List>
                <div className={styles.submitInfo}>
                  <p>已选商品3件</p>
                  <p>total price:99999</p>
                  <Button>submit</Button>
                </div>
              </TabPane>
              <TabPane tab="订单" key="2">
                Content of card tab 2
              </TabPane>
              <TabPane tab="已完成订单" key="3">
                Content of card tab 3
              </TabPane>
            </Tabs>



          </div>
        </div>
      </Layout>
      <Footer>123</Footer>
    </>
  )
}
