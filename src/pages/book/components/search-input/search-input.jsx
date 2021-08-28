import React, { useState } from "react";
import { View, Input, Image } from "@tarojs/components";

import SearchIcon from "@/resource/images/search.png";

import "./search-input.scss";

const SearchInput = props => {
  const {
    type,
    className,
    mainClassName,
    placeholder,
    placeholderClass,
    onFocus = () => {},
    handleSearch,
    ...restProps
  } = props;
  const [value, setValue] = useState(null);

  const handleInput = value => {
    setValue(value);
  };

  const searchClick = () => {
    handleSearch && handleSearch(value);
  };

  return (
    <View className={`search-input ${mainClassName ?? ""}`}>
      <Image
        src={SearchIcon}
        className="search-input__img"
        onClick={searchClick}
      />
      <Input
        type={type ?? "text"}
        value={value}
        placeholder={placeholder ? placeholder : "搜索"}
        placeholderClass={placeholderClass ?? "search-input__input-placeholder"}
        className={className ?? "search-input__input"}
        onInput={handleInput}
        onFocus={onFocus}
        {...restProps}
      />
    </View>
  );
};

export default SearchInput;
