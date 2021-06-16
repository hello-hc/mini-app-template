const Koa = require("koa");
const KoaLog = require("koa-log");

const app = new Koa();

app.use(KoaLog("dev"));
app.use(require("./main"));

app.listen(3000, () => {
  console.log(`服务器启动，运行为http://localhost:3000/`);
});
