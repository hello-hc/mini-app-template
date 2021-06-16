import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, Text, OpenData } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar/tab-bar.jsx";
import { initState } from "@/store";
import { userLogout } from "@/store/actions";
import Utils from '@/utils/utils';

import "./index.scss";

class Me extends Component {
  constructor(props) {
    const { mobile } = props.userInfo;
    super(props);
    this.state = {
      phoneNumber: mobile
    };
  }

  // 跳转至登录页
  skip() {
    Taro.reLaunch({ url: "/pages/sign-in/index" });
  }

  // 退出登录
  logout = () => {
    const that = this;

    Taro.showModal({
      title: "确认退出登录吗"
    }).then(res => {
      if (res.confirm) {
        // 退出登录，清除本地缓存
        Taro.clearStorage({
          success: () => {
            this.props.userLogout(initState);
            that.skip();
            // 关闭监听实时位置变化，前后台都停止消息接收
            Taro.stopLocationUpdate();
          },
          fail: () => {
            Utils.showToastFn("退出登录失败");
          }
        });
      }
    });
  };

  render() {
    const { phoneNumber } = this.state;

    return (
      <View className='me'>
        <View className='me-user'>
          <OpenData type='userAvatarUrl' className='me-user--icon' />
          <OpenData type='userNickName' className='me-user--name' />
          <Text className='me-user--phone'>{phoneNumber}</Text>
        </View>
        <View className='me-logout'>
          <Button onClick={this.logout}>退出登录</Button>
        </View>
        <TabBar val='me' />
      </View>
    );
  }
}

export default connect(
  ({ user }) => ({
    userInfo: user.userInfo
  }),
  {
    userLogout
  }
)(Me);
