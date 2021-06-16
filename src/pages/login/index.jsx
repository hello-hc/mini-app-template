import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Image, Checkbox, Button, Input, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import PhoneLogin from "@/common/phone-sign-in/phone-sign-in.jsx";
import Validate from "@/utils/WxValidate";
import wechatAuthorization from "@/utils/wechat-authorization.js";
import BackgroundImg from "@/resource/images/sign_bg.png";
import LogoImg from "@/resource/images/white_logo.png";
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
      agreePrivacyPolicy: false
    };
  }

  onLoad(options) {
    const token = Taro.getStorageSync("token");

    if (token) {
      // this.getData();
    } else if (options?.showLogin) {
      // this.isHide = 2;
    } else {
      // this.isHide = 1;
    }
    // 初始化校验规则
    this.initValidate();
    // wechatAuthorization.checkSessionAndLogin();
    Taro.login().then(res => Taro.setStorageSync("WxLoginCode", res.code));
  }

  componentDidShow() {
    this.setState({ agreePrivacyPolicy: false });
  }

  initValidate() {
    const rules = {
      phoneNumber: {
        required: true,
        phone: true
      },
      verificationCode: {
        required: true
      }
    };
    const messages = {
      phoneNumber: {
        required: "请填写你的手机号码",
        phone: "请填写正确的手机号码"
      },
      verificationCode: {
        required: "验证码为空"
      }
    };
    this.Validate = new Validate(rules, messages);
  }

  // 获取手机号
  onGetPhoneNumber = data => {
    if (!data) {
      return this.setState({
        isManuallyLogin: true,
        agreePrivacyPolicy: false
      });
    }

    wechatAuthorization.authorization(data, this.props.login, false);
  };

  handleChange = (key, e) => {
    this.setState({
      [key]: e.detail.value
    });
  };

  onSubmit = () => {
    const { phoneNumber, verificationCode, agreePrivacyPolicy } = this.state;

    if (!agreePrivacyPolicy) {
      Taro.showToast({ title: "请勾选服务协议", icon: "none" });
      return false;
    }

    console.log("onSubmit: ", this.state);
    // 传入表单数据，调用验证方法
    if (!this.Validate.checkForm({ phoneNumber, verificationCode })) {
      const error = this.Validate.errorList[0];
      // 表单校验提示信息
      Taro.showToast({ title: error.msg, icon: "none" });
      return false;
    }

    // 验证通过以后
    console.log("数据提交请求后端API时，携带的数据为：", {
      phoneNumber,
      verificationCode
    });

    wechatAuthorization.authorization(
      {
        mobile: phoneNumber,
        activeCode: verificationCode
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
          codeDisabled: false
        });
        clearInterval(this.timeInterval);
        return (this.timeInterval = null);
      }
      this.setState({
        code: `${totalTime}秒后再试`
      });
    }, 1000);
  };

  gotoWebviewPage = () => {
    const url = 'http://localhost:3000';
    Taro.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(url)}`
    });
  };

  leftBtnHandle = () => {
    this.leftHideBtnClicked = true;
    this.goToSwitchServerPage();
  }

  rightBtnHandle = () => {
    this.rightHideBtnClicked = true;
    this.goToSwitchServerPage();
  }

  goToSwitchServerPage = () => {
    if(this.leftHideBtnClicked && this.rightHideBtnClicked) {
      this.leftHideBtnClicked = false;
      this.rightHideBtnClicked = false;
      Taro.navigateTo({url: "/pages/switch-server/index"});
    }
  }

  render() {
    const {
      isManuallyLogin,
      code,
      codeDisabled,
      agreePrivacyPolicy
    } = this.state;

    return (
      <View className='login'>
        <View className='login__imgs'>
          <Image className='login__logo' src={LogoImg} />
          <Image className='login__bg' src={BackgroundImg} />
        </View>
        {!isManuallyLogin ? (
          <PhoneLogin
            agreePrivacyPolicy={agreePrivacyPolicy}
            onGetPhoneNumber={this.onGetPhoneNumber}
          />
        ) : (
          <View className='login__form'>
            <View className='login__form--phone'>
              <Input
                type='text'
                name='phoneNumber'
                className='login__form--phone-number'
                placeholder='手机号'
                value={this.state.phoneNumber}
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
                value={this.state.verificationCode}
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
            color='#e6001a'
            checked={agreePrivacyPolicy}
            onClick={e => {
              e.stopPropagation();
              this.setState({
                agreePrivacyPolicy: !agreePrivacyPolicy
              });
            }}
          />
          <View>
            登录就代表您已接受
            <Text
              className='login__bottom-link'
              onClick={this.gotoWebviewPage}
            >
              服务及隐私协议
            </Text>
          </View>
        </View>
        <View className='login__bottom-remark'>
          此小程序仅作为微信模版使用
        </View>
        <View className='switch-server-view'>
          <Button className='switch-server-button' onClick={this.leftBtnHandle} />
          <Button className='switch-server-button' onClick={this.rightBtnHandle} />
        </View>
      </View>
    );
  }
}

export default connect(
  ({ user }) => ({
    loginResult: user.loginResult
  }),
  {
    login,
    sendActiveCode
  }
)(Login);
