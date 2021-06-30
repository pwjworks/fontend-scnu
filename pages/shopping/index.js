import { Layout, Empty, Image, Typography, Button, List, Steps, Avatar, Form, Space, Tabs, InputNumber, Radio, Checkbox } from "antd";
import BHeader from "../../components/BHeader";
import React, { useState, useEffect } from 'react';
import styles from "../../styles/user.module.css"
import getAll from "../api/shoppingcart/get-shoppingCart"
import updateCart from "../api/shoppingcart/update-shoppingCart"
import deleteItem from "../api/shoppingcart/delete-item";
import intoOrder from "../api/shoppingcart/into-order";
import getOrders from "../api/shoppingcart/get-order";
import { notifyOK, notifyFail } from '../../utils/notify';
const { TabPane } = Tabs;
const { Content, Footer } = Layout;
const { Title } = Typography;
const { Step } = Steps;


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
  const [cartId, setCartId] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [productIds, setProductIds] = useState([]);
  const [orders, setOrders] = useState([]);
  const items = [];
  const orderList = [];
  useEffect(() => {
    let tmp = 0;
    let ids = []
    if (data.length !== 0) {
      data.forEach((item) => {
        tmp += item.price * item.productNum;
        ids.push(item.productId);
      })
      setCartId(data[0].cartId);
      setTotalPrice(tmp);
      setProductIds(ids);
    } else {
      setTotalPrice(0);
    }
  }, [data]);


  useEffect(() => {
    getOrders(window.sessionStorage.getItem("username")).then(res => {
      if (res.data.success) {
        console.log(res.data);
        setOrders(res.data.data);
      } else {
        notifyFail(res.data.msg);
      }
    });
    getAll(window.sessionStorage.getItem("username")).then(res => {
      if (res.data.success) {
        setData(res.data.data);
      }
    });

  }, [])

  const handleDelete = function (id) {


    deleteItem({ id }).then(res => {
      if (res.data.success) {
        getAll(window.sessionStorage.getItem("username")).then(res => {
          if (res.data.success) {
            setData(res.data.data);
            notifyOK("删除成功");
          }
        })
      }
    })
  }

  const handlePay = function () {
    const username = window.sessionStorage.getItem("username");
    intoOrder(
      {
        username,
        productIds
      }
    ).then(res => {
      if (res.data.success) {
        getAll(window.sessionStorage.getItem("username")).then(res => {
          if (res.data.success) {
            setData(res.data.data);
            notifyOK("购买成功");
          }
        });
        getOrders(window.sessionStorage.getItem("username")).then(res => {
          if (res.data.success) {
            console.log(res.data);
            setOrders(res.data.data);
          } else {
            notifyFail(res.data.msg);
          }
        });
      }
    });
  }
  const handleUpdate = function (e, productId) {
    const num = e.target.ariaValueNow;

    updateCart({
      cartId,
      productId,
      productNum: num
    }).then(res => {
      if (res.data.success) {
        getAll(window.sessionStorage.getItem("username")).then(res => {
          if (res.data.success) {
            setData(res.data.data);
            notifyOK("更新成功");
          }
        });
        getOrders(window.sessionStorage.getItem("username")).then(res => {
          if (res.data.success) {
            setOrders(res.data.data);
          } else {
            notifyFail(res.data.msg);
          }
        });
      }
    })
  }
  for (let item of orders) {
    orderList.push((
      <List.Item
        key={item.itemId}
        extra={
          <div className={styles.processing}>
            <Steps current={item.stage}>
              <Step title="已付款" description="使用支付宝付款" />
              <Step title="快递运送中" description="顺丰快递" />
              <Step title="已收货" description={item.receiverAddress} />
            </Steps>
          </div>
        }
      >
        <List.Item.Meta
          title={item.productName}
          description={"数量：" + item.productNum + " 总价：" + item.productNum * item.price}
        />
      </List.Item>
    ))
  }
  for (let item of data) {
    items.push((
      <List.Item key={item.itemId}
        extra={
          <>
            <div className={styles.extra}>
              <div className={styles.pricenumInfo}>
                <Title level={5}>金额</Title>
                <Title level={5} type="danger" className={styles.price}>{item.price * item.productNum}</Title>
              </div>
              <div className={styles.pricenumInfo}>
                <Title level={5}>数量</Title>
                <InputNumber onPressEnter={(e) => handleUpdate(e, item.productId)} className={styles.num} defaultValue={item.productNum}></InputNumber>
              </div>
              <Button onClick={() => handleDelete(item.itemId)} danger>删除</Button>
            </div>
          </>
        }
      >
        <List.Item.Meta
          avatar={<Image src={"https://ssm-scnu.oss-cn-guangzhou.aliyuncs.com/pic/" + item.productId + ".jpg"} width={150}></Image>}
          title={<a>{item.productName}</a>}
          description={<><p>单价：</p><Title level={5} type="danger">{item.price}</Title></>}
        />
      </List.Item>
    ));
  }
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
                  size="large"
                >
                  {items}
                </List>
                <div className={styles.submitInfo}>
                  <p>已选商品<Title level={5} type="danger">{data.length}</Title>件</p>
                  <p>总价:<Title level={5} type="danger">{totalPrice}</Title></p>
                  <Button onClick={handlePay} type="primary" size="large">立即购买</Button>
                </div>
              </TabPane>
              <TabPane tab="订单" key="2">
                <List
                  bordered
                  itemLayout="vertical"
                  size="large"
                >
                  {orderList}
                </List>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Layout>
      <Footer>
        <div>
          <Title level={3}>Power By E322B!</Title>
        </div>
      </Footer>
    </>
  )
}
