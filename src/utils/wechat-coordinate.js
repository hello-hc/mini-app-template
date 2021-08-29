/**
 * 微信坐标系转换
 * 支持 gcj-02 to bd-09
 * 支持 bd-09 to gcj-02
 */
class WechatCoordinate {
  /**
   *  将GCJ-02(火星坐标)转为bd-09(百度坐标):
   *  @param {Number | String} latitude 纬度
   *  @param {Number | String} longitude 经度
   */
  static transformFromGCJToBaidu(latitude, longitude) {
    const pi = (3.14159265358979324 * 3000.0) / 180.0;

    const z =
      Math.sqrt(longitude * longitude + latitude * latitude) +
      0.00002 * Math.sin(latitude * pi);
    const theta =
      Math.atan2(latitude, longitude) + 0.000003 * Math.cos(longitude * pi);
    const bd_latitude = z * Math.sin(theta) + 0.006;
    const bd_longitude = z * Math.cos(theta) + 0.0065;

    return { latitude: bd_latitude, longitude: bd_longitude };
  }

  /**
   *  将bd-09(百度坐标)转为GCJ-02(火星坐标):
   *  @param {Number | String} latitude 纬度
   *  @param {Number | String} longitude 经度
   */
  static transformFromBaiduToGCJ(latitude, longitude) {
    const xPi = (3.14159265358979323846264338327950288 * 3000.0) / 180.0;

    const x = longitude - 0.0065;
    const y = latitude - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPi);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPi);
    const gcj_latitude = z * Math.sin(theta);
    const gcj_longitude = z * Math.cos(theta);

    return { latitude: gcj_latitude, longitude: gcj_longitude };
  }
}

export default WechatCoordinate;
