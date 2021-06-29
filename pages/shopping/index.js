import { Layout, Empty, Image, Typography, Button, List, Avatar,Form, Space, Tabs, InputNumber, Radio,Checkbox  } from "antd";
import BHeader from "../../components/BHeader";
import React, { useState, useEffect } from 'react';
import styles from "../../styles/user.module.css"
import getAll from "../api/shoppingcart/get-shoppingCart"
import updateCart from "../api/shoppingcart/update-shoppingCart"
import deleteItem from "../api/shoppingcart/delete-item";
import { notifyOK, notifyFail } from '../utils/notify'
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
  const [cartId,setCartId] = useState('');
  const [totalPrice,setTotalPrice]=useState(0);
  const items=[];

  useEffect(() => {
    console.log(data);
    let tmp=0;

    if(data.length!==0){
      data.forEach((item)=>{
        tmp+=item.price*item.productNum;
      })
      setCartId(data[0].cartId);
      setTotalPrice(tmp);
    }else {
      setTotalPrice(0);
    }
  },[data]);

  useEffect(() => {
    getAll(window.sessionStorage.getItem("username")).then(res=>{
      console.log(res);
      if(res.data.success){
        setData(res.data.data);

      }
    })
  }, [])

  const handleDelete=function(id){


    deleteItem({id}).then(res=>{
      if(res.data.success){
        getAll(window.sessionStorage.getItem("username")).then(res=>{
          console.log(res);
          if(res.data.success){
            setData(res.data.data);
            notifyOK("删除成功");
          }
        })
      }
    })
  }

  const handleUpdate=function(productId){
    const num=e.target.ariaValueNow;

    updateCart({
      cartId,
      productId,
      productNum:num
    }).then(res => {
      if(res.data.success){
        getAll(window.sessionStorage.getItem("username")).then(res=>{
          console.log(res);
          if(res.data.success){
            setData(res.data.data);
            notifyOK("更新成功");
          }
        })
      }
    })
  }

  for(let item of data){
    items.push((
    <List.Item key={item.itemId}
    extra={
      <>
        <div className={styles.extra}>
          <div className={styles.pricenumInfo}>
            <Title level={5}>金额</Title>
            <Title level={5} type="danger" className={styles.price}>{item.price*item.productNum}</Title>
          </div>
          <div className={styles.pricenumInfo}>
            <Title level={5}>数量</Title>
            <InputNumber onPressEnter={handleUpdate(item.productId)} className={styles.num} defaultValue={item.productNum}></InputNumber>
          </div>
          <Button onClick={()=>handleDelete(item.itemId)} danger>删除</Button>
        </div>
      </>
    }
  >
    <List.Item.Meta
      avatar={<Image src="./3090.jpg" width={150}></Image>}
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
                  <Button type="primary" size="large">立即购买</Button>
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
