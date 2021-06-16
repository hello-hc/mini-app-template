import React, { Component } from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import IndexIcon from "@/resource/copyImages/home.png";
import MeIcon from "@/resource/copyImages/me.png";
import IndexSelectedIcon from "@/resource/copyImages/home_active.svg";
import MeSelectedIcon from "@/resource/copyImages/me_active.svg";

import "./tab-bar.scss";

class CustomTabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderList: [
        {
          text: "首页",
          pagePath: "/pages/index/index",
          iconPath: IndexIcon,
          selectedIconPath: IndexSelectedIcon,
          active: props.val === "index" ? true : false
        },
        {
          text: "我的",
          pagePath: "/pages/me/index",
          iconPath: MeIcon,
          selectedIconPath: MeSelectedIcon,
          active: props.val === "me" ? true : false
        }
      ]
    };
  }

  handleClick = pagePath => {
    Taro.switchTab({ url: pagePath });
  };

  render() {
    const { renderList } = this.state;

    return (
      <View className='tab-bar'>
        {renderList.map(item => {
          const { text, pagePath, iconPath, selectedIconPath, active } = item;

          return (
            <View
              className='tab-bar__item'
              key={text}
              onClick={this.handleClick.bind(this, pagePath)}
            >
              <Image
                className='tab-bar__item-img'
                src={active ? selectedIconPath : iconPath}
              />
              <View
                className='tab-bar__item-text'
                style={{ color: active ? "#e6001a" : "#ccc" }}
              >
                {text}
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default CustomTabBar;
