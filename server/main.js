const router = require('koa-router')();

router.use("/mini/app/user", require("./api/user"));

module.exports = router.routes();
