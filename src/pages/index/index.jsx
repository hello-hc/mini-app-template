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

  useEffect(() => {
    if (!token) {
      Taro.redirectTo({
        url: "/pages/login/index",
      });
    } else {
      dispatch(setUserInfo({ userType, mobile }));
    }

    const info = Taro.getSystemInfoSync();

    console.log(info, 'info');

    setSysInfo(info);
  }, []);

  const handleTabsClick = (key) => {
    const active = tabs.findIndex(i => i.key === key);

    setTabsActive(active);
  }

  if (!token || !sysInfo) return null;

  const dataOne = Array(100).fill(0).map((_, i) => i + 2);
  const dataTwo = Array(200).fill(1).map((_, i) => i + 5);

  console.log(sysInfo, 'sysInfo');
  const height = sysInfo.windowHeight - (120 / sysInfo.pixelRatio) - (80 / sysInfo.pixelRatio);
  console.log(height, 'height');

  return (
    <View className="index">
      <View className="index__content">
        <Tab
          tabs={tabs}
          activeKey={tabsActive}
          handleTabsClick={handleTabsClick}
        >
          <TabPane>
            <VirtualList renderList={dataOne} virtualListHeight={height} />
          </TabPane>
          <TabPane>
            <VirtualList renderList={dataTwo} virtualListHeight={height} />
          </TabPane>
        </Tab>
      </View>
      <TabBar val="index" />
    </View>
  );
};

export default Index;
