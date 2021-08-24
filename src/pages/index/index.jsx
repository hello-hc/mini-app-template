import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar";
import Tab from "@/common/tabs";
import VirtualList from '@/common/virtual-list';
import Constants from "@/utils/constants";
import { setUserInfo } from "@/store/actions";

import "./index.scss";

const {TabPane} = Tab;
const {INDEX_TABS_KEY, INDEX_TABS_MSG} = Constants;

const Index = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.common.userInfo);
  const token = Taro.getStorageSync("token");
  const mobile = Taro.getStorageSync("mobile");
  const userType = userInfo?.userType ?? Taro.getStorageSync("userType");
  const [tabsActive, setTabsActive] = useState(0);
  const [tabs, setTabs] = useState(Object.values(INDEX_TABS_KEY).map(key => ({key, msg: INDEX_TABS_MSG[key]})))
  const [sysInfo, setSysInfo] = useState(null);

  // TODO：这里我只是模拟了两个tab栏的数据，实际需要使用网络请求去获取对应的列表数据
  const [timer, setTimer] = useState(null);
  const [dataOne, setDataOne] = useState(Array(100).fill(0).map((_, i) => i + 2));
  const dataTwo = [];

  useEffect(() => {
    if (!token) {
      return Taro.redirectTo({
        url: "/pages/login/index",
      });
    } else {
      dispatch(setUserInfo({ userType, mobile }));
    }

    const info = Taro.getSystemInfoSync();
    setSysInfo(info);
  }, []);

  const handleTabsClick = (key) => {
    const active = tabs.findIndex(i => i.key === key);

    setTabsActive(active);
  };

  const listReachBottom = () => {
    // TODO: 模拟异步请求获取下一页的数据
    if (!timer) {
      setTimer(setTimeout(() => {
        setDataOne(dataOne.concat(Array(50).fill(8).map((_, i) => i + 2)));
        setTimer(null);
      }, 1000));
    }
  };

  if (!token || !sysInfo) return null;

  const virtualListHeight = sysInfo.windowHeight - (120 / sysInfo.pixelRatio) - (80 / sysInfo.pixelRatio);
  const virtualCommonProps = {
    virtualListHeight,
    listReachBottom
  };

  return (
    <View className="index">
      <View className="index__content">
        <Tab
          tabs={tabs}
          activeKey={tabsActive}
          handleTabsClick={handleTabsClick}
        >
          <TabPane>
            <VirtualList
              renderList={dataOne}
              {...virtualCommonProps}
            />
          </TabPane>
          <TabPane>
            <VirtualList
              renderList={dataTwo}
              {...virtualCommonProps}
            />
          </TabPane>
        </Tab>
      </View>
      <TabBar val="index" />
    </View>
  );
};

export default Index;
