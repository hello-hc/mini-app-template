/**
 * 日期时间处理相关工具函数
 */
class DateTimeFormatUtils {
  /**
   * string 格式
   * IOS 以下时间可以有效转换
   * 2020-10-10, 2020/10/10
   * 2020/10/10 12:12:12
   * 2020-04-13T07:56:54.565Z
   * 2020-04-20T00:00:00.000
   * IOS 以下时间不能转换
   * 2020-10-10 12:12:12 ->2020/10/10 12:12:12
   * 2020-04-20T00:00:00.000+0800 ->2020-04-20T00:00:00.000
   * 2020/04/20T00:00:00.000
   */
  static stringToDate(string) {
    let diffTimeZone;

    if (/\+\d{4}$/.test(string)) {
      const m =
        Number(string.substr(string.length - 4, 2) * 60) +
        Number(string.substr(string.length - 2));
      const current = -new Date().getTimezoneOffset();

      diffTimeZone = current - m;
      if (!new Date(string).getTime()) {
        diffTimeZone = diffTimeZone - 480;
      }

      string = string.replace(/\+\d+$/, "");
    } else if (/^\d+-\d+-\d+ /.test(string)) {
      string = string.replace(/-/g, "/");
    }
    const date = new Date(string);

    if (diffTimeZone) {
      date.setMinutes(date.getMinutes() + diffTimeZone);
    }

    return date;
  }

  /**
   * 将日期格式化为字符串
   * @param {string | number | Date} date
   * @param {string} fmt: example 'yyyy-MM-dd'
   */
  static formatDate(date, fmt = "yyyy-MM-dd hh:mm:ss") {
    if (!date) return "";
    if (["string", "number"].includes(typeof date)) {
      date = DateTimeFormatUtils.stringToDate(date);
    }

    const o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
      );
    }

    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        );
      }
    }

    return fmt;
  }

  /**
   * 转换为 yyyy-MM-dd'T'HH:mm:ss.SSS+0080 格式
   */
  static timeISO(time) {
    const isoDate = DateTimeFormatUtils.stringToDate(time).toISOString();
    const bjDate = isoDate.substring(0, isoDate.length - 1) + "+0800";

    return bjDate;
  }

  /**
   * 转换为时间戳
   */
  static convertToTimestamp(date) {
    const timestamp = new Date(
      DateTimeFormatUtils.stringToDate(date)
    ).getTime();
    return timestamp;
  }
}

export default DateTimeFormatUtils;
