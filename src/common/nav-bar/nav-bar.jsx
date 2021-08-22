import React, { Component } from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import SearchInput from "@/common/search-input/search-input.jsx";
import HomeImg from "@/resource/images/home.svg";

import "./nav-bar.scss";

class CustomNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    Taro.switchTab({ url: "/pages/index/index" });
  };

  onFocus = () => {
    Taro.redirectTo({ url: "/pages/vehicle-management/search-page/index" });
  };

  render() {
    const { height, showInput, title } = this.props;

    return (
      <View className='nav-bar' style={{ height }}>
        <View className='nav-bar--home' onClick={this.handleClick}>
          <Image src={HomeImg} className='nav-bar--home-img' />
        </View>
        {
          showInput ? (
            <SearchInput onFocus={this.onFocus} />
          ) : (
            <View className='nav-bar--text'>
              {title}
            </View>
          )
        }
      </View>
    );
  }
}

export default CustomNavBar;
