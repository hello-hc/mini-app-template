import React, { Component } from "react";
import { View, Image, Text } from "@tarojs/components";

import emptyImg from "@/resource/images/noOrdersIcon.svg";

import './empty-status.scss';

class EmptyStatus extends Component {
  render() {
    const { imgSrc, text, ...others } = this.props;

    return (
      <View className='empty-status' {...others}>
        <Image className='empty-status__img' src={imgSrc || emptyImg} />
        <Text className='empty-status__text'>{text || "列表为空"}</Text>
      </View>
    );
  }
}

export default EmptyStatus;
