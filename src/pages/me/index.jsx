import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Button, Text, OpenData } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar/tab-bar.jsx";
import { initState } from "@/store";
import { userLogout } from "@/store/actions";
import Utils from "@/utils/utils";

import "./index.scss";

const Me = () => {
  const userInfo = useSelector((props) => props.common.userInfo);
  const dispatch = useDispatch();

  // 跳转至登录页
  const skip = () => {
    Taro.reLaunch({ url: "/pages/login/index" });
  };

  /**
   * 退出登录
   */
  const logout = () => {
    Taro.showModal({
      title: "确认退出登录吗",
    }).then((res) => {
      if (res.confirm) {
        // 退出登录，清除本地缓存
        Taro.clearStorage({
          success: () => {
            dispatch(userLogout(initState));
            skip();
            // 关闭监听实时位置变化，前后台都停止消息接收
            Taro.stopLocationUpdate();
          },
          fail: () => {
            Utils.showToastFn("退出登录失败");
          },
        });
      }
    });
  };

  return (
    <View className="me">
      <View className="me-user">
        <OpenData type="userAvatarUrl" className="me-user--icon" />
        <OpenData type="userNickName" className="me-user--name" />
        <Text className="me-user--phone">{userInfo?.mobile ?? null}</Text>
      </View>
      <View className="me-logout">
        <Button onClick={logout}>退出登录</Button>
      </View>
      <TabBar val="me" />
    </View>
  );
};

export default Me;
