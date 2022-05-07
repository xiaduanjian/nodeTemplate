/*
 * @Author: xia.duanjian
 * @Date: 2022-05-07 14:43:38
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-07 21:51:40
 * @Description: 系统用户
 */
const router = require('koa-router')()
const {User} = require('../models')
const {userAdd, userUpdate, userDel, userFind, userFindOne} = require("../controller/user")

router.prefix('/users')

// 添加系统用户
router.post('/add', userAdd)
// 修改系统用户
router.post('/update', userUpdate)

// 删除系统用户
router.post('/del', userDel)

// 获取系统用户
router.get('/find', userFind)
// 查询单个用户
router.get('/find/:id', userFindOne)
module.exports = router
