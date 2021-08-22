const Router = require("koa-router");
// const url = require('url');
// const querystring = require('querystring');
const router = new Router();

router.post("/login", (ctx) => {
  console.log(ctx, "ctx");

  ctx.body = {
    status: 200,
    data: {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2NWE5NDExLWI0YjgtNGIxMy1hODllLTE2YTZlNWMzOTRmOCIsInR5cGUiOiJWZW5kb3IiLCJ1aWQiOiJvcmlvbiIsImlhdCI6MTYxNDU5MjA2MSwiZXhwIjoxNjE1MTk2ODYxfQ.BZM1hcuQrlniubmykmKq_VvOR-vtP3Ijfi4ZSqeoLz8",
      mobile: "13566668888",
      openId: "od8tg5XVVth1EqdXi_99-TZU3KAY",
      type: "User",
    },
  };
});

router.post("/sendActiveCode", (ctx) => {
  ctx.body = { status: 200, data: { mobile: "13566668888" } };
});

module.exports = router.routes();
