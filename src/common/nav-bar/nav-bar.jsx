import React from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import SearchInput from "@/common/search-input";
import HomeImg from "@/resource/images/home.svg";

import "./nav-bar.scss";

const CustomNavBar = props => {
  const {
    title = "",
    height = 80,
    showInput = false,
    searchInputProps = {}
  } = props;

  const handleClick = () => {
    Taro.switchTab({ url: "/pages/index/index" });
  };

  return (
    <View className="nav-bar" style={{ height }}>
      <View className="nav-bar--home" onClick={handleClick}>
        <Image src={HomeImg} className="nav-bar--home-img" />
      </View>
      {showInput ? (
        <SearchInput {...searchInputProps} />
      ) : (
        <View className="nav-bar--text">{title}</View>
      )}
    </View>
  );
};

export default CustomNavBar;
