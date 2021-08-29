import React from "react";
import { View, Button } from "@tarojs/components";
import classNames from "classnames";

import "./card.scss";

const Card = props => {
  const {
    className,
    title,
    explain,
    imageUrl,
    buttonText,
    buttonClick
  } = props;
  const classes = classNames("card", className);

  const handleClick = () => {
    buttonClick && buttonClick(props);
  };

  return (
    <View className={classes}>
      <View className="card__top">
        <image className="card__top--img" src={imageUrl} />
      </View>
      <View className="card__bottom">
        <View className="card__bottom--text">
          <View className="card__bottom--text-title">{title}</View>
          <View className="card__bottom--text-explain">{explain}</View>
        </View>
        <View className="card__bottom--action">
          <Button className="card__bottom--action-btn" onClick={handleClick}>
            {buttonText}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Card;
