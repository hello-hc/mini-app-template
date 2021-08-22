import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar";
import Tab from "@/common/tabs";
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

  useEffect(() => {
    if (!token) {
      Taro.redirectTo({
        url: "/pages/login/index",
      });
    } else {
      dispatch(setUserInfo({ userType, mobile }));
    }
  }, []);

  const handleTabsClick = (key) => {
    const active = tabs.findIndex(i => i.key === key);

    setTabsActive(active);
  }

  if (!token) return null;

  return (
    <View className="index">
      <View className="index__content">
        <Tab
          tabs={tabs}
          activeKey={tabsActive}
          handleTabsClick={handleTabsClick}
        >
          <TabPane>
            TabPane 1
          </TabPane>
          <TabPane>
            TabPane 2
          </TabPane>
        </Tab>
      </View>
      <TabBar val="index" />
    </View>
  );
};

export default Index;
