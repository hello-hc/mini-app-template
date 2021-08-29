import React from "react";
import { View } from "@tarojs/components";

import TabBar from "@/common/tab-bar";
import SearchInput from "./components/search-input";

import "./index.scss";

const Book = () => {
  const renderCard = () => {
    return (
      <View className="book__card">
        <View className="book__card-title">哈哈哈 · 无限卡今日到期</View>
        <View className="book__card-content">1234567890</View>
        <View className="book__card-feedback">反馈</View>
      </View>
    );
  };

  return (
    <View>
      <SearchInput onFocus={() => {}} />
      {renderCard()}
      <TabBar val="book" />
    </View>
  );
};

export default Book;
