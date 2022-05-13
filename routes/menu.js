/*
 * @Author: xia.duanjian
 * @Date: 2022-05-09 22:05:18
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-11 15:34:56
 * @Description: 菜单管理
 */
const router = require("koa-router")();

const { menuAdd, menuFind } = require("../controller/menu");
router.prefix("/menu");
// 创建菜单
router.post("/add", menuAdd);
router.post("/find", menuFind);
module.exports = router
