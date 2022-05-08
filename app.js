/*
 * @Author: xia.duanjian
 * @Date: 2022-05-07 14:43:38
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 21:21:34
 * @Description: file content
 */
const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const MongoConnact = require("./db");
const koajwt = require("koa-jwt");

// 连接数据库
MongoConnact();

// 引入路由模块
const index = require("./routes/index");
const users = require("./routes/users");
const upload = require("./routes/upload");
const article = require("./routes/article");
const captcha = require("./routes/captcha");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);
// 不需要token的白名单
app.use(
  koajwt({
    secret: "template-jswt",
  }).unless({
    path: [/^\/users\/login/, /^\/users\/register/, /^\/captcha/],
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(upload.routes(), users.allowedMethods());
app.use(article.routes(), article.allowedMethods());
app.use(captcha.routes(), captcha.allowedMethods());
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
