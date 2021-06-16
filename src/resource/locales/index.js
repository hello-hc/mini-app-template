import zh from '@/resource/locales/zh';
import en from '@/resource/locales/en';

// 如有问题可查看官方说明： https://github.com/MinaAndLuoXia/Taro-i18n
export default function local(value) {
  return {
    //en 和 zh是语言类型,可以新增语言或重命名
    'en': {
      ...en(value)
    },
    'zh': {
      ...zh(value)
    }
  };
}
