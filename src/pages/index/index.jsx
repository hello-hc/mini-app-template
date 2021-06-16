import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar/tab-bar.jsx";
import { setUserInfo } from "@/store/actions";

import "./index.scss";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.userType = props.userInfo?.userType ?? Taro.getStorageSync("userType");
  }

  onLoad() {
    const token = Taro.getStorageSync("token");
    if (!token) {
      Taro.redirectTo({ url: "/pages/sign-in/index" });
    } else {
      const userType = Taro.getStorageSync("userType");
      this.props.setUserInfo({
        userType: userType,
        mobile: Taro.getStorageSync("mobile"),
      });
    }
  }

  render() {
    const token = Taro.getStorageSync("token");
    if (!token) return null;

    return (
      <View className='index'>
        <View className='index__content'>index page</View>
        <TabBar val='index' />
      </View>
    );
  }
}

export default connect(
  ({ common, user }) => ({
    loading: common.loading,
    userInfo: user.userInfo,
  }),
  {
    setUserInfo,
  }
)(Index);
