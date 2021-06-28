import React, { useState, useEffect } from 'react';
import { Layout, Empty, Divider, Typography, Input, Space, Form, Button,notification  } from 'antd';
import { ExclamationCircleOutlined,SmileOutlined } from '@ant-design/icons';
import BHeader from '../../components/BHeader';
import styles from '../../styles/LoginRegister.module.css';
import register from '../api/login/register';
import login from '../api/login/login';
import { useRouter } from 'next/router'
const { Footer, Content } = Layout;
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

  return (
    <>
			<Card title="Default size card"  style={{ width: 300 }}>
				<p>Card content</p>
				<p>Card content</p>
				<p>Card content</p>
			</Card>
    </>
  )
};