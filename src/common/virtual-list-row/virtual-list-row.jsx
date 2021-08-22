import React from "react";
import { View, Text } from "@tarojs/components";
import { AtIcon, AtTag } from "taro-ui";
import Taro from "@tarojs/taro";

import dateTimeFormat from "@/utils/date-time-format-utils";
import Constants from "@/utils/constants";
import { warehouseStatus } from "@/utils/warehouse-status";

import "./virtual-list-row.scss";

const {
  USER_TYPE: { DRIVER }
} = Constants;

// 获取状态样式
function getClassNameOrStatus(props) {
  let tagClassName = null;
  let orderStatus = null;
  let data = warehouseStatus(props);

  if (data) {
    const { statusMsg, className } = data;
    orderStatus = statusMsg;
    tagClassName = `virtual-list-row--${className}`;

    return { tagClassName, orderStatus };
  }
  return {};
}

function handleClick(id) {
  const isDriver = Taro.getStorageSync("userType") === DRIVER;

  Taro.navigateTo({
    url: isDriver
      ? `/pages/warehouse-appointment/warehouse-detail/index?id=${id}`
      : `/pages/vehicle-management/truck-detail/index?id=${id}`
  });
}

const VirtualListRow = React.memo(({ id, index, style, data }) => {
  const {
    updateTime,
    dockApptFrom,
    warehouseName,
    warehouse,
    truckPlate,
    dockApptNumber,
    inboundTime, // 进圈时间
    isAutomaticLifter, // 是否自动抬杆

    allLoad,

    dockApptStatus, // 预约单状态
    // warehouse: {attribute: dockType}, // 仓库类型 --- 平库还是立库

    rowClassName,
    outboundTime
  } = data[index];
  const isDriver = Taro.getStorageSync("userType") === DRIVER;
  let className;
  let currentStatus;

  if (allLoad) {
    return (
      <View
        class={`virtual-list-row__all-load ${
          isDriver ? "" : "virtual-list-row__all-load--vendor"
        }`}
      >
        {allLoad}
      </View>
    );
  }

  if (isDriver) {
    let { tagClassName, orderStatus } = getClassNameOrStatus({
      dockApptStatus,
      warehouse,
      inboundTime,
      outboundTime,
      isAutomaticLifter
    });

    className = tagClassName || "";
    currentStatus = orderStatus || "";
  }

  return (
    <View
      id={id}
      className={`virtual-list-row ${rowClassName}`}
      style={style}
      onClick={handleClick.bind(this, data[index].id)}
    >
      <View className='virtual-list-row__content'>
        <View className='virtual-list-row__left'>
          <Text className='virtual-list-row__left-text virtual-list-row--truckPlate'>
            {isDriver ? dockApptNumber : truckPlate}
          </Text>
          <Text className='virtual-list-row__left-text'>
            {isDriver ? warehouse.warehouseName : warehouseName}
          </Text>
        </View>
        <View className='virtual-list-row__right'>
          <Text
            className={`virtual-list-row--time ${
              isDriver ? "" : "time-center"
            }`}
          >
            {dateTimeFormat.formatDate(isDriver ? dockApptFrom : updateTime)}
          </Text>
          {isDriver ? (
            <AtTag className={className} type='primary' circle>
              {currentStatus}
            </AtTag>
          ) : null}
        </View>
      </View>
      <View className='virtual-list-row__icon'>
        <AtIcon value='chevron-right' />
      </View>
    </View>
  );
});

export default VirtualListRow;
