import { notification } from 'antd';
import React from 'react';
import { ExclamationCircleOutlined, SmileOutlined } from '@ant-design/icons';


export const notifyOK = function (msg) {
  notification.open({
    message: "成功",
    description: msg,
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
}
export const notifyFail = function (msg) {
  notification.open({
    message: "失败",
    description: msg,
    icon: <ExclamationCircleOutlined style={{ color: '#108ee9' }} />,
  });
}

