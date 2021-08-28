const Router = require("koa-router");
const router = new Router();

const PAGE_SIZE = "pageSize";
const PAGE_COUNT = "pageCount";

router.get("/list", ctx => {
  let pageSize = 1;
  let pageCount = 6;
  const url = ctx.request.url.slice(ctx.request.url.indexOf("?"));
  const urlParams = new URLSearchParams(url);

  pageSize = parseInt(urlParams.get(PAGE_SIZE));
  pageCount = parseInt(urlParams.get(PAGE_COUNT));

  if (pageSize === 1) {
    ctx.body = {
      status: 200,
      data: {
        list: [
          {
            id: "001",
            title: "每日一答",
            explain: "挑战连续答对12道题",
            buttonText: "玩一玩",
            imageUrl: "https://w.wallhaven.cc/full/k7/wallhaven-k7kv8d.jpg"
          },
          {
            id: "002",
            title: "读书小队",
            explain: "3人成队 · 共攒积分兑大奖",
            buttonText: "立即组队",
            imageUrl: "https://w.wallhaven.cc/full/72/wallhaven-72jwp3.jpg"
          },
          {
            id: "003",
            title: "周四集赞得12天联名卡",
            explain: "第94期 08.26 - 09.02",
            buttonText: "立即查看",
            imageUrl: "https://w.wallhaven.cc/full/57/wallhaven-57kvd3.png"
          },
          {
            id: "004",
            title: "TOP 200 飙升",
            explain: "分享得1天无限卡·百万好书免费读",
            buttonText: "立即参与",
            imageUrl: "https://w.wallhaven.cc/full/y8/wallhaven-y8gl2d.jpg"
          },
          {
            id: "005",
            title: "翻一翻",
            explain: "第126期 08.24 - 08.31",
            buttonText: "翻一翻",
            imageUrl: "https://w.wallhaven.cc/full/m9/wallhaven-m9wv21.png"
          },
          {
            id: "006",
            title: "组队抽终身无限卡",
            explain: "第151期 08.21 - 08.28",
            buttonText: "立即组队",
            imageUrl: "https://w.wallhaven.cc/full/j3/wallhaven-j3k26w.png"
          }
        ],
        pageSize: 1,
        pageCount: 6,
        hasMore: true
      }
    };
  } else if (pageSize === 2) {
    ctx.body = {
      status: 200,
      data: {
        list: [
          {
            id: "001",
            title: "每日一答",
            explain: "挑战连续答对12道题",
            buttonText: "玩一玩",
            imageUrl: "https://w.wallhaven.cc/full/k7/wallhaven-k7kv8d.jpg"
          },
          {
            id: "002",
            title: "读书小队",
            explain: "3人成队 · 共攒积分兑大奖",
            buttonText: "立即组队",
            imageUrl: "https://w.wallhaven.cc/full/72/wallhaven-72jwp3.jpg"
          },
          {
            id: "003",
            title: "周四集赞得12天联名卡",
            explain: "第94期 08.26 - 09.02",
            buttonText: "立即查看",
            imageUrl: "https://w.wallhaven.cc/full/57/wallhaven-57kvd3.png"
          }
        ],
        pageSize,
        pageCount,
        hasMore: false
      }
    };
  }
});

router.get("/detail/:id", ctx => {
  ctx.body = { status: 200, data: {} };
});

module.exports = router.routes();
