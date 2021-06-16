const router = require("koa-router")();

router.use("/mini/orion/user", require("./api/user"));

module.exports = router.routes();
