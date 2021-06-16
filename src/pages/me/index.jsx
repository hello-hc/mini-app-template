import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Button, Text, OpenData } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar/tab-bar.jsx";
import { initState } from "@/store";
import { userLogout } from "@/store/actions";
import Constants from "@/utils/constants";

import "./index.scss";

const { USER_TYPE } = Constants;

class Me extends Component {
  constructor(props) {
    const { userType, mobile } = props.userInfo;
    super(props);
    this.state = {
      phoneNumber: mobile
    };
    this.isDriver = userType === USER_TYPE.DRIVER;
  }

  // 跳转至登录页
  skip() {
    Taro.reLaunch({ url: "/pages/sign-in/index" });
  }

  // 退出登录事件
  logout = () => {
    let that = this;

    Taro.showModal({
      title: "确认退出登录吗"
    }).then(res => {
      if (res.confirm) {
        console.log("用户点击确定");
        // 退出登录，清除本地缓存
        Taro.clearStorage({
          success: () => {
            console.log("清除缓存成功");
            this.props.userLogout(initState);
            that.skip();
            // 关闭监听实时位置变化，前后台都停止消息接收
            Taro.stopLocationUpdate();
          },
          fail: failRes => {
            console.log(failRes, "清除缓存失败");
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
