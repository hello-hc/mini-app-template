import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import TabBar from "@/common/tab-bar/tab-bar.jsx";
import Constants from "@/utils/constants";
import { setUserInfo } from "@/store/actions";

import LogoImg from "@/resource/images/white_logo.png";
import warehouseImg from "@/resource/images/warehouse_reservation.png";
import truckImg from "@/resource/images/vehicle_registration.png";
import signatureImg from "@/resource/images/electronic_signature.png";
import onTheWayImg from "@/resource/images/management_in_transit.png";
import inTransitReportIcon from "@/resource/images/in_transit_report.svg";
import rapidTransitionIcon from "@/resource/images/rapid_transition.svg";
import vehicleArrivesIcon from "@/resource/images/vehicle_arrives.svg";
import confirmReceiptIcon from "@/resource/images/confirm_receipt.svg";

import "./index.scss";

const { USER_TYPE } = Constants;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.userType = props.userInfo?.userType ?? Taro.getStorageSync("userType");
  }

  onLoad() {
    const token = Taro.getStorageSync("token");
    if (!token) {
      Taro.redirectTo({ url: "/pages/sign-in/index" });
    } else {
      const userType = Taro.getStorageSync("userType");
      this.props.setUserInfo({
        userType: userType,
        mobile: Taro.getStorageSync("mobile")
      });
    }
  }

  cardSkip = ({ path, isSkipApp, extraData }) => {
    isSkipApp
    ? Taro.navigateToMiniProgram({
      appId: "wx98899c2a0af03a27",
      path: path, // 打开的页面路径
      extraData: extraData, // 传递的数据
      fail: () => {
        Taro.showToast({title: '跳转失败', icon: 'none'});
      }
    }) : Taro.redirectTo({ url: path });
  };

  renderAppCard() {
    // TODO: 跳转至在途管理小程序的路径需要进行修改（注意：可能某些跳转还需要参数）
    // isAuthority表示是否存在权限 判断是否存在跳转权限，然后进行跳转
    const renderList = [
      {
        title: "车辆注册",
        owner: "承运商",
        img: truckImg,
        remark: "用于承运商维护车辆信息",
        isAuthority: this.userType === USER_TYPE.VENDOR,
        path: "/pages/vehicle-management/index"
      },
      {
        title: "仓库预约",
        owner: "司机",
        img: warehouseImg,
        remark: "用于司机操作和记录进出场的各个节点",
        isAuthority: this.userType === USER_TYPE.DRIVER,
        path: "/pages/warehouse-appointment/index"
      },
      {
        title: "电子签收",
        owner: "收货人&司机",
        img: signatureImg,
        remark: "用于收货人在线核对和签收实物",
        isAuthority: this.userType !== USER_TYPE.VENDOR,
        path: "/pages/electronic-sign/index"
      },
      {
        title: "在途管理",
        owner: "司机",
        img: onTheWayImg,
        remark: "用于在途异常上报、任务交接、确认车辆到达等",
        isAuthority: this.userType === USER_TYPE.DRIVER,
        isSkipApp: true,
        path: "/pages/index",
        childs: [
          {
            text: "快速交接",
            isSkipApp: true,
            icon: rapidTransitionIcon,
            path: "/pages/scan"
          },
          {
            text: "在途上报",
            isSkipApp: true,
            icon: inTransitReportIcon,
            path: "/pages/index",
            extraData: {
              jumpTodoStatus: 'INTRANSIT_EVENT',
            },
          },
          {
            text: "车辆到达",
            isSkipApp: true,
            icon: vehicleArrivesIcon,
            path: "/pages/index",
            extraData: {
              jumpTodoStatus: 'CAR_ARRIVE',
            },
          },
          {
            text: "确认签收",
            isSkipApp: true,
            icon: confirmReceiptIcon,
            path: "/pages/index",
            extraData: {
              jumpTodoStatus: 'DELIVERY',
            },
          }
        ]
      }
    ];

    return (
      <View className='index__main'>
        {renderList.filter(i => i.isAuthority).map(item => {
          const { title, owner, img, remark, isAuthority, childs } = item;

          return (
            <View key={title} className='index__cards'>
              <View
                className='index__cards-card'
                onClick={this.cardSkip.bind(this, item)}
              >
                <View className='index__cards-card--left'>
                  <Image src={img} />
                </View>
                <View className='index__cards-card--right'>
                  <View className='index__cards-card--right-title'>{title}</View>
                  <View className='index__cards-card--right-owner'>
                    使用者：{owner}
                  </View>
                  <View className='index__cards-card--right-remark'>
                    {remark}
                  </View>
                  {/* {
                    isAuthority ? (
                      <Button
                        className='index__cards-card--right-button'
                        onClick={this.cardSkip.bind(this, item)}
                      >
                        立即前往
                      </Button>
                    ) : null
                  } */}
                  {/* {!isAuthority ? (
                    <View className='index__cards-card--point'>暂无权限</View>
                  ) : null} */}
                </View>
              </View>
              {childs?.length ? (
                <View className='index__cards-childs'>
                  {childs.map(({ text, path, isSkipApp, icon, extraData }) => (
                    <View
                      key={text}
                      className='index__cards-childs--item'
                      onClick={
                        isAuthority ? this.cardSkip.bind(this, {path, isSkipApp, extraData}) : null
                      }
                    >
                      <Image src={icon} />
                      {text}
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    const token = Taro.getStorageSync("token");
    if (!token) return null;

    return (
      <View className='index'>
        <View className='index__header'>
          <Image src={LogoImg} className='index__header--logo' />
        </View>
        <View className='index__content'>{this.renderAppCard()}</View>
        <TabBar val='index' />
      </View>
    );
  }
}

export default connect(
  ({ common, user }) => ({
    loading: common.loading,
    userInfo: user.userInfo
  }),
  {
    setUserInfo
  }
)(Index);
