const router = require("koa-router")();

router.use("/mini/app/user", require("./api/user"));
router.use("/mini/app/index", require("./api/index"));

module.exports = router.routes();
