import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { View, Checkbox, Button, Input, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import Validate from "Utils/wx-validate";
import WechatAuthorization from "Utils/wechat-authorization.js";
import { login, sendActiveCode } from "@/store/actions";

import "./index.scss";

const Login = () => {
  // const loginResult = useSelector((store) => store.common.loginResult);
  const dispatch = useDispatch();
  const [isManuallyLogin, setIsManuallyLogin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);
  const [code, setCode] = useState("验证码");
  const [codeDisabled, setCodeDisabled] = useState(false);
  const [agreePrivacyPolicy, setAgreePrivacyPolicy] = useState(false);
  const [timeInterval, setTimeInterval] = useState(null);
  const [validate, setValidate] = useState(null);
  let leftHideBtnClicked = false;
  let rightHideBtnClicked = false;

  useEffect(() => {
    // 初始化
    // 初始化校验规则
    initValidate();
    setAgreePrivacyPolicy(false);
    Taro.login().then(res => Taro.setStorageSync("WxLoginCode", res.code));
  }, []);

  // 初始化校验函数
  const initValidate = () => {
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
    setValidate(new Validate(rules, messages));
  };

  // 获取手机号
  const onGetPhoneNumber = data => {
    if (!data) {
      setIsManuallyLogin(true);
      setAgreePrivacyPolicy(false);
      return;
    }

    WechatAuthorization.authorization(data, login, false, dispatch);
  };

  const onSubmit = () => {
    if (!agreePrivacyPolicy) {
      Taro.showToast({ title: "请勾选服务协议", icon: "none" });
      return false;
    }

    // 传入表单数据，调用验证方法
    if (!validate.checkForm({ phoneNumber, verificationCode })) {
      const error = validate.errorList[0];
      // 表单校验提示信息
      Taro.showToast({ title: error.msg, icon: "none" });
      return false;
    }

    WechatAuthorization.authorization(
      {
        mobile: phoneNumber,
        activeCode: verificationCode
      },
      login,
      true,
      dispatch
    );
  };

  // 获取验证码
  const getVerificationCode = () => {
    if (timeInterval) {
      return null;
    } else if (!/^1\d{10}$/.test(phoneNumber)) {
      return Taro.showToast({ title: "请填写正确的手机号码", icon: "none" });
    }

    dispatch(sendActiveCode({ mobile: phoneNumber }));

    let totalTime = 60;
    setCodeDisabled(true);
    setTimeInterval(
      setInterval(() => {
        --totalTime;
        if (totalTime === 0) {
          setCode("验证码");
          setCodeDisabled(false);
          clearInterval(timeInterval);
          return setTimeInterval(null);
        }

        setCode(`${totalTime}秒后再试`);
      }, 1000)
    );
  };

  // 跳转隐私服务协议
  const gotoWebviewPage = () => {
    // const url = "http://localhost:3000";
    // Taro.navigateTo({
    //   url: `/pages/webview/index?url=${encodeURIComponent(url)}`,
    // });
  };

  const leftBtnHandle = () => {
    leftHideBtnClicked = true;
    goToSwitchServerPage();
  };

  const rightBtnHandle = () => {
    rightHideBtnClicked = true;
    goToSwitchServerPage();
  };

  // 跳转环境切换界面
  const goToSwitchServerPage = () => {
    if (leftHideBtnClicked && rightHideBtnClicked) {
      leftHideBtnClicked = false;
      rightHideBtnClicked = false;
      Taro.navigateTo({ url: "/pages/switch-server/index" });
    }
  };

  const getPhoneNumber = e => {
    if (!agreePrivacyPolicy) {
      return Taro.showToast({
        title: "请勾选服务协议",
        icon: "none"
      });
    }
    const { errMsg } = e.detail;

    onGetPhoneNumber(errMsg === "getPhoneNumber:ok" ? e.detail : false);
  };

  return (
    <View className="login">
      <View className="login__imgs">
        {/* <Image className='login__logo' src={LogoImg} />
          <Image className='login__bg' src={BackgroundImg} /> */}
      </View>
      {!isManuallyLogin ? (
        <View className="login__mode">
          <Button
            className="login__mode--one-key"
            openType="getPhoneNumber"
            onGetPhoneNumber={getPhoneNumber}
          >
            微信一键登录
          </Button>
          <Button
            className="login__mode--verification-code"
            onClick={() => onGetPhoneNumber(false)}
          >
            手机验证码登录
          </Button>
        </View>
      ) : (
        <View className="login__form">
          <View className="login__form--phone">
            <Input
              type="text"
              name="phoneNumber"
              className="login__form--phone-number"
              placeholder="手机号"
              value={phoneNumber}
              onInput={e => setPhoneNumber(e.detail.value)}
            />
            <Button
              className="login__form--phone-button"
              disabled={codeDisabled}
              onClick={getVerificationCode}
            >
              {code}
            </Button>
          </View>
          <View className="login__form--verification">
            <Input
              name="verificationCode"
              type="text"
              className="login__form--verification-code"
              placeholder="验证码"
              value={verificationCode}
              onInput={e => setVerificationCode(e.detail.value)}
            />
          </View>
          <Button className="login__form-button" onClick={onSubmit}>
            登录
          </Button>
        </View>
      )}
      <View className="login__bottom">
        <Checkbox
          className="login__bottom-checkbox"
          color="#93B5CF"
          checked={agreePrivacyPolicy}
          onClick={e => {
            e.stopPropagation();
            setAgreePrivacyPolicy(!agreePrivacyPolicy);
          }}
        />
        <View>
          登录就代表您已接受
          <Text className="login__bottom-link" onClick={gotoWebviewPage}>
            服务及隐私协议
          </Text>
        </View>
      </View>
      <View className="login__bottom-remark">此小程序仅作为微信模版使用</View>
      <View className="switch-server-view">
        <Button className="switch-server-button" onClick={leftBtnHandle} />
        <Button className="switch-server-button" onClick={rightBtnHandle} />
      </View>
    </View>
  );
};

export default Login;
