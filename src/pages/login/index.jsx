import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Checkbox, Button, Input, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import Validate from "@/utils/wx-validate";
import WechatAuthorization from "@/utils/wechat-authorization.js";
import { login, sendActiveCode } from "@/store/actions";

import "./index.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isManuallyLogin: false,
      phoneNumber: null,
      verificationCode: null,
      code: "验证码",
      codeDisabled: false,
      agreePrivacyPolicy: false,
    };
  }

  onLoad() {
    // 初始化校验规则
    this.initValidate();
    Taro.login().then((res) => Taro.setStorageSync("WxLoginCode", res.code));
  }

  componentDidShow() {
    this.setState({ agreePrivacyPolicy: false });
  }

  initValidate() {
    const rules = {
      phoneNumber: {
        required: true,
        phone: true,
      },
      verificationCode: {
        required: true,
      },
    };
    const messages = {
      phoneNumber: {
        required: "请填写你的手机号码",
        phone: "请填写正确的手机号码",
      },
      verificationCode: {
        required: "验证码为空",
      },
    };
    this.Validate = new Validate(rules, messages);
  }

  // 获取手机号
  onGetPhoneNumber = (data) => {
    if (!data) {
      return this.setState({
        isManuallyLogin: true,
        agreePrivacyPolicy: false,
      });
    }

    WechatAuthorization.authorization(data, this.props.login, false);
  };

  handleChange = (key, e) => {
    this.setState({
      [key]: e.detail.value,
    });
  };

  onSubmit = () => {
    const { phoneNumber, verificationCode, agreePrivacyPolicy } = this.state;

    if (!agreePrivacyPolicy) {
      Taro.showToast({ title: "请勾选服务协议", icon: "none" });
      return false;
    }

    // 传入表单数据，调用验证方法
    if (!this.Validate.checkForm({ phoneNumber, verificationCode })) {
      const error = this.Validate.errorList[0];
      // 表单校验提示信息
      Taro.showToast({ title: error.msg, icon: "none" });
      return false;
    }

    // 验证通过以后
    console.log("数据验证后的请求参数：", {
      phoneNumber,
      verificationCode,
    });

    WechatAuthorization.authorization(
      {
        mobile: phoneNumber,
        activeCode: verificationCode,
      },
      this.props.login,
      true
    );
  };

  // 获取验证码
  getVerificationCode = () => {
    const { phoneNumber } = this.state;

    if (this.timeInterval) {
      return null;
    } else if (!/^1\d{10}$/.test(phoneNumber)) {
      return Taro.showToast({ title: "请填写正确的手机号码", icon: "none" });
    }
    this.props.sendActiveCode({ mobile: phoneNumber });

    let totalTime = 60;
    this.setState({ codeDisabled: true });
    this.timeInterval = setInterval(() => {
      --totalTime;
      if (totalTime === 0) {
        this.setState({
          code: "验证码",
          codeDisabled: false,
        });
        clearInterval(this.timeInterval);
        return (this.timeInterval = null);
      }
      this.setState({
        code: `${totalTime}秒后再试`,
      });
    }, 1000);
  };

  // 跳转隐私服务协议
  gotoWebviewPage = () => {
    // const url = "http://localhost:3000";
    // Taro.navigateTo({
    //   url: `/pages/webview/index?url=${encodeURIComponent(url)}`,
    // });
  };

  leftBtnHandle = () => {
    this.leftHideBtnClicked = true;
    this.goToSwitchServerPage();
  };

  rightBtnHandle = () => {
    this.rightHideBtnClicked = true;
    this.goToSwitchServerPage();
  };

  // 跳转环境切换界面
  goToSwitchServerPage = () => {
    if (this.leftHideBtnClicked && this.rightHideBtnClicked) {
      this.leftHideBtnClicked = false;
      this.rightHideBtnClicked = false;
      Taro.navigateTo({ url: "/pages/switch-server/index" });
    }
  };

  getPhoneNumber = (e) => {
    const { agreePrivacyPolicy } = this.state;

    if (!agreePrivacyPolicy) {
      return Taro.showToast({
        title: "请勾选服务协议",
        icon: "none",
      });
    }
    const { errMsg } = e.detail;

    this.onGetPhoneNumber(errMsg === "getPhoneNumber:ok" ? e.detail : false);
  };

  render() {
    const {
      isManuallyLogin,
      code,
      codeDisabled,
      agreePrivacyPolicy,
      phoneNumber,
      verificationCode,
    } = this.state;

    return (
      <View className='login'>
        <View className='login__imgs'>
          {/* <Image className='login__logo' src={LogoImg} />
          <Image className='login__bg' src={BackgroundImg} /> */}
        </View>
        {!isManuallyLogin ? (
          <View className='login__mode'>
            <Button
              className='login__mode--one-key'
              openType='getPhoneNumber'
              onGetPhoneNumber={this.getPhoneNumber}
            >
              微信一键登录
            </Button>
            <Button
              className='login__mode--verification-code'
              onClick={() => this.onGetPhoneNumber(false)}
            >
              手机验证码登录
            </Button>
          </View>
        ) : (
          <View className='login__form'>
            <View className='login__form--phone'>
              <Input
                type='text'
                name='phoneNumber'
                className='login__form--phone-number'
                placeholder='手机号'
                value={phoneNumber}
                onInput={this.handleChange.bind(this, "phoneNumber")}
              />
              <Button
                className='login__form--phone-button'
                disabled={codeDisabled}
                onClick={this.getVerificationCode}
              >
                {code}
              </Button>
            </View>
            <View className='login__form--verification'>
              <Input
                name='verificationCode'
                type='text'
                className='login__form--verification-code'
                placeholder='验证码'
                value={verificationCode}
                onInput={this.handleChange.bind(this, "verificationCode")}
              />
            </View>
            <Button className='login__form-button' onClick={this.onSubmit}>
              登录
            </Button>
          </View>
        )}
        <View className='login__bottom'>
          <Checkbox
            className='login__bottom-checkbox'
            color='#93B5CF'
            checked={agreePrivacyPolicy}
            onClick={(e) => {
              e.stopPropagation();
              this.setState({
                agreePrivacyPolicy: !agreePrivacyPolicy,
              });
            }}
          />
          <View>
            登录就代表您已接受
            <Text className='login__bottom-link' onClick={this.gotoWebviewPage}>
              服务及隐私协议
            </Text>
          </View>
        </View>
        <View className='login__bottom-remark'>此小程序仅作为微信模版使用</View>
        <View className='switch-server-view'>
          <Button
            className='switch-server-button'
            onClick={this.leftBtnHandle}
          />
          <Button
            className='switch-server-button'
            onClick={this.rightBtnHandle}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  ({ common }) => ({
    loginResult: common.loginResult,
  }),
  {
    login,
    sendActiveCode,
  }
)(Login);
