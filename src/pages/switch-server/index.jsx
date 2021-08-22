/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { View, Button, RadioGroup, Radio, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import ApiRequest from "@/utils/api-request";

import "./index.scss";

class SwitchServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 环境切换列表
      serverList: [
        {
          name: "login",
          address: "https://login.cn/mini/app",
        },
        {
          name: "qa",
          address: "https://qa.cn/mini/app",
        },
        {
          name: "dev",
          address: "http://localhost:3000",
        },
      ],
    };
  }

  onLoad() {
    const { serverList } = this.state;
    const serverUrl = ApiRequest.getBaseUrl();
    let found = false;

    for (let serverDic of serverList) {
      if (serverDic.address === serverUrl) {
        serverDic.checked = true;
        found = true;
        break;
      }
    }
    if (!found) {
      // 如果都没有选中，则默认选中最后一个，而且把之前输入的值显示出来
      const lastServerDic = serverList[serverList.length - 1];
      lastServerDic.checked = true;
      lastServerDic.address = serverUrl;
    }

    this.setState({ serverList: [...serverList] });
  }

  radioChange = (e) => {
    const { serverList } = this.state;

    for (let serverDic of serverList) {
      if (serverDic.name === e.detail.value) {
        serverDic.checked = true;
      } else {
        serverDic.checked = false;
      }
    }
    this.setState({ serverList: [...serverList] });
  };

  saveHandle = () => {
    const { serverList } = this.state;

    for (let serverDic of serverList) {
      if (serverDic.checked) {
        ApiRequest.setBaseUrl(serverDic.address);
        Taro.navigateBack({ delta: 1 });
      }
    }
  };

  render() {
    const { serverList } = this.state;

    console.log("====================================");
    console.log(serverList);
    console.log("====================================");

    return (
      <View className="switch-server">
        <RadioGroup className="radio-group" onChange={this.radioChange}>
          {serverList.map((item) => {
            const { name, checked, address = "" } = item;

            return (
              <Radio
                className="radio"
                key={name}
                value={name}
                checked={checked}
                color="skyblue"
              >
                <Text className="switch-server_text">{address}</Text>
              </Radio>
            );
          })}
        </RadioGroup>
        <Button class="switch-server_save" onClick={this.saveHandle}>
          保存
        </Button>
      </View>
    );
  }
}

export default SwitchServer;
