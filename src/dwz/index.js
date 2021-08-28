import { axios } from "taro-axios";

export default async function getDwz(params = {}) {
  await axios({
    url: "https://dwz.cn/api/v3/short-urls",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Dwz-Token": "", // 短网址 token
      "Content-Language": "zh"
    },
    data: params
  })
    .then(res => {
      console.log("响应：", res.data);
      // if (res.data) {
      //   resolve(res.data);
      // } else {
      //   reject(res.data);
      // }

      return res;
    })
    .catch(err => {
      console.log("请求失败：", err);
      // reject(err);
    });
}
