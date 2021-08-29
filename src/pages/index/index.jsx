import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar";
import Card from "./components/card";
import { setUserInfo, getList } from "@/store/actions";
import VirtualList from "@/common/virtual-list";

import "./index.scss";

// 请求一页的数量
const PAGE_COUNT = 3;

const Index = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(store => store.common.userInfo);
  const loading = useSelector(store => store.common.loading);
  const listResponse = useSelector(store => store.common.listData);
  const { list: listData, pageSize, hasMore } = listResponse;
  const token = Taro.getStorageSync("token");
  const mobile = Taro.getStorageSync("mobile");
  const userType = userInfo?.userType ?? Taro.getStorageSync("userType");
  const [sysInfo, setSysInfo] = useState(null);
  const [listPageSize, setListPageSize] = useState(1);

  useEffect(() => {
    if (!token) {
      Taro.redirectTo({
        url: "/pages/login/index"
      });
    } else {
      dispatch(setUserInfo({ userType, mobile }));
      dispatch(getList({ pageCount: PAGE_COUNT, pageSize: listPageSize }));
    }

    const info = Taro.getSystemInfoSync();
    setSysInfo(info);
  }, []);

  useEffect(() => {
    setListPageSize(pageSize);
  }, [listData]);

  const listReachBottom = () => {
    console.log(listPageSize, "listPageSize");
    if (hasMore && !loading) {
      dispatch(getList({ pageCount: PAGE_COUNT, pageSize: listPageSize + 1 }));
    }
  };

  if (!token || !sysInfo) return null;

  const virtualListHeight = sysInfo.windowHeight - 120 / sysInfo.pixelRatio;
  const virtualCommonProps = {
    virtualListHeight,
    listReachBottom,
    itemSize: 250,
    hasMore,
    loading
  };

  const VirtualListRow = React.memo(rowProps => {
    const { id, index, data, ...restProps } = rowProps;

    return <Card key={id} {...data[index]} {...restProps} />;
  });

  const renderCard = () => {
    return (
      <VirtualList
        className="index__content--list"
        renderList={listData}
        VirtualListRow={VirtualListRow}
        {...virtualCommonProps}
      />
    );
  };

  return (
    <View className="index">
      <View className="index__content">
        {listData?.length ? renderCard() : null}
      </View>
      <TabBar val="index" />
    </View>
  );
};

export default Index;
