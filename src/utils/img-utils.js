import Taro from "@tarojs/taro";

const LIMIT_SIZE = 500;

/**
 * 图片相关工具函数
 */
class ImageUtils {
  /**
   * 批量压缩图片
   */
  static async compressImageList(imgPathList, canvasId) {
    let compressPathList = [];
    for (let index = 0; index < imgPathList.length; index++) {
      const imgPath = imgPathList[index];

      const compressPath = await ImageUtils.compressImage(imgPath, canvasId);
      compressPathList.push(compressPath);
    }

    return new Promise(resolve => {
      resolve(compressPathList);
    });
  }

  /**
   * 压缩图片
   */
  static async compressImage(imgPath, canvasId) {
    const isContinue = await ImageUtils.imageIsLimitSize(imgPath);
    let compressPath = imgPath;
    if (isContinue) {
      const compressFilePath = await ImageUtils.getCanvasImage(
        canvasId,
        imgPath
      );
      compressPath = await ImageUtils.compressImage(compressFilePath, canvasId);
    }

    console.log("图片压缩完成:", imgPath);
    return compressPath;
  }

  /**
   * 判断图片是否小于LIMIT_SIZE
   */
  static async imageIsLimitSize(filePath) {
    return new Promise((resolve, reject) => {
      Taro.getFileInfo({
        filePath: filePath,
        success(res) {
          console.log("图片大小:", res.size / 1024);
          if (res.size / 1024 > LIMIT_SIZE) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        fail() {
          console.log("获取图片信息失败");
          reject();
        }
      });
    });
  }

  /**
   * Canvas 绘制压缩的图片
   */
  static async getCanvasImage(canvasId, filePath) {
    return new Promise(async (resolve, reject) => {
      Taro.getImageInfo({
        src: filePath,
        success(imgInfo) {
          const { width, height } = imgInfo;
          // 宽高压缩
          //const maxSide = Math.max(width, height);
          // const windowWidth = Taro.getSystemInfoSync().windowWidth;
          // let scale = 1;
          // if (width > windowWidth) {
          //   scale = windowWidth / width;
          // }
          // const imgWidth = Math.floor(width * scale);
          // const imgHeight = Math.floor(height * scale);

          // console.log("window宽", windowWidth);
          // console.log("压缩比例", scale);
          // console.log("原始宽高", width + '---' + height);
          // console.log("压缩宽高", imgWidth + '---' + imgHeight);

          const ctx = Taro.createCanvasContext(canvasId);
          ctx.drawImage(filePath, 0, 0, width, height);
          ctx.draw(
            false,
            setTimeout(() => {
              Taro.canvasToTempFilePath({
                canvasId,
                x: 0,
                y: 0,
                destWidth: width,
                destHeight: height,
                width: width,
                height: height,
                quality: 0.8, // 质量压缩
                success: function(res) {
                  console.log("Canvas绘制完成", res.tempFilePath);
                  resolve(res.tempFilePath);
                },
                fail: function(err) {
                  console.log("Canvas绘制失败", err);
                  reject(err);
                }
              });
            }, 200)
          );
        },
        fail(err) {
          reject(err);
        }
      });
    });
  }
}

export default ImageUtils;
