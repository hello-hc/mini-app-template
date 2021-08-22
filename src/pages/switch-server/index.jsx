import React, { useState, useEffect } from "react";
import { View, Button, RadioGroup, Radio, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import ApiRequest from "@/utils/api-request";

import "./index.scss";

const SwitchServer = () => {
  // // 环境切换列表
  const [serverList, setServerList] = useState([
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
  ]);
  const serverUrl = ApiRequest.getBaseUrl();

  useEffect(() => {
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
    setServerList([...serverList]);
  }, []);

  const radioChange = (e) => {
    for (let serverDic of serverList) {
      if (serverDic.name === e.detail.value) {
        serverDic.checked = true;
      } else {
        serverDic.checked = false;
      }
    }
    setServerList([...serverList]);
  };

  const saveHandle = () => {
    for (let serverDic of serverList) {
      if (serverDic.checked) {
        ApiRequest.setBaseUrl(serverDic.address);
        Taro.navigateBack({ delta: 1 });
      }
    }
  };

  return (
    <View className="switch-server">
      <RadioGroup className="radio-group" onChange={radioChange}>
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
      <Button class="switch-server_save" onClick={saveHandle}>
        保存
      </Button>
    </View>
  );
};

export default SwitchServer;
