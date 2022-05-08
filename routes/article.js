/*
 * @Author: xia.duanjian
 * @Date: 2022-05-08 16:05:15
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 16:12:15
 * @Description: 文章管理路由控制
 */
const router = require("koa-router")();

const { add, findAll, findOne } = require("../controller/article");
router.prefix("/articles");
// 发布文章
router.post("/add", add);

// 查询所有文章 （分页）
router.get("/findAll", findAll);

// 查询单个文章
router.get("/find/:id", findOne);
module.exports = router;
