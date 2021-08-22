import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar/tab-bar.jsx";
import { setUserInfo } from "@/store/actions";

import "./index.scss";

const Index = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.common.userInfo);
  const token = Taro.getStorageSync("token");
  const mobile = Taro.getStorageSync("mobile");
  const userType = userInfo?.userType ?? Taro.getStorageSync("userType");

  useEffect(() => {
    if (!token) {
      Taro.redirectTo({
        url: "/pages/login/index",
      });
    } else {
      dispatch(setUserInfo({ userType, mobile }));
    }
  }, []);

  if (!token) return null;

  return (
    <View className="index">
      <View className="index__content">index page</View>
      <TabBar val="index" />
    </View>
  );
};

export default Index;
