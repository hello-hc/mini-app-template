import React from "react";
import { View, Image, Text } from "@tarojs/components";

import emptyImg from "@/resource/images/noOrdersIcon.svg";

import "./empty-status.scss";

const EmptyStatus = props => {
  const { imgSrc, text, ...restProps } = props;

  return (
    <View className="empty-status" {...restProps}>
      <Image className="empty-status__img" src={imgSrc ?? emptyImg} />
      <Text className="empty-status__text">{text ?? "暂无数据"}</Text>
    </View>
  );
};

export default EmptyStatus;
