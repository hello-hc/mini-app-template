import React, { Component, useContext } from "react";
import { View } from "@tarojs/components";

import "./tabs.scss";

const Context = React.createContext(null);

export const Tab = (props) => {
  const { tabs, children, activeKey, style, handleTabsClick } = props;

  return (
    <Context.Provider value={{ parentActiveKey: activeKey }}>
      <View className="tabs" style={style}>
        <View className="tabs__main">
          {tabs.map((tab, index) => {
            const { msg, key } = tab;

            return (
              <View
                key={key}
                style={{ width: `calc(100vw / ${tabs.length})` }}
                onClick={() => handleTabsClick(key)}
                className={`tabs__main-item ${
                  activeKey === index ? "tabs__main-item--active" : ""
                }`}
              >
                {msg}
                <View
                  className={`tabs__main-item--line ${
                    activeKey === index ? "tabs__main-item--line-active" : ""
                  }`}
                />
              </View>
            );
          })}
        </View>
        <View className="tabs__children">
          {React.Children.map(children, (child, index) => {
            return React.cloneElement(child, {
              index: index.toString(),
            });
          })}
        </View>
      </View>
    </Context.Provider>
  );
};

export const TabPane = (props) => {
  const { children, index: key } = props;
  const { parentActiveKey } = useContext(Context);

  return (
    <View
      className={`tab-pane ${
        Number(key) === parentActiveKey ? "" : "tab-pane--disabled"
      }`}
      key={key}
    >
      {children}
    </View>
  );
};

TabPane.displayName = "TabPane";
