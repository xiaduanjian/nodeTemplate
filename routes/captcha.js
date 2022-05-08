/*
 * @Author: xia.duanjian
 * @Date: 2022-05-08 21:08:57
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 21:22:06
 * @Description: 图形验证码
 */
const svgCaptcha = require("svg-captcha");
const router = require("koa-router")();

router.get("/captcha", async (ctx) => {
  const captcha = svgCaptcha.create({
    size: 4, //验证码长度
    fontSize: 45, //验证码字号
    noise: Math.floor(Math.random() * 5), //干扰线条数目_随机0-5条
    width: 120, //宽度
    height: 40, //高度
    color: true, //验证码字符是否有颜色，默认是没有，但是如果设置了背景颜色，那么默认就是有字符颜色
    background: "#ccc", //背景色
  });
  ctx.response.type = "image/svg+xml"; //设置返回的数据格式
  ctx.body = {
    data: captcha.data,
  };
});

module.exports = router;
