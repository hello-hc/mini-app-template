import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import BookIcon from "@/resource/copyImages/book.png";
import BookSelectedIcon from "@/resource/copyImages/book_active.png";
import IndexIcon from "@/resource/copyImages/home.png";
import MeIcon from "@/resource/copyImages/me.png";
import IndexSelectedIcon from "@/resource/copyImages/home_active.svg";
import MeSelectedIcon from "@/resource/copyImages/me_active.svg";

import "./tab-bar.scss";

const CustomTabBar = props => {
  const { val } = props;
  const [renderList, setRenderList] = useState([
    {
      text: "首页",
      pagePath: "/pages/index/index",
      iconPath: IndexIcon,
      selectedIconPath: IndexSelectedIcon,
      active: val === "index" ? true : false
    },
    {
      text: "书城",
      pagePath: "/pages/book/index",
      iconPath: BookIcon,
      selectedIconPath: BookSelectedIcon,
      active: val === "book" ? true : false
    },
    {
      text: "我的",
      pagePath: "/pages/me/index",
      iconPath: MeIcon,
      selectedIconPath: MeSelectedIcon,
      active: val === "me" ? true : false
    }
  ]);

  const handleClick = pagePath => {
    Taro.switchTab({ url: pagePath });
  };

  return (
    <View className="tab-bar">
      {renderList.map(item => {
        const { text, pagePath, iconPath, selectedIconPath, active } = item;

        return (
          <View
            className="tab-bar__item"
            key={text}
            onClick={() => handleClick(pagePath)}
          >
            <Image
              className="tab-bar__item-img"
              src={active ? selectedIconPath : iconPath}
            />
            <View
              className="tab-bar__item-text"
              style={{ color: active ? "#93B5CF" : "#CDD1D3" }}
            >
              {text}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
