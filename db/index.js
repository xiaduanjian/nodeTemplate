/*
 * @Author: xia.duanjian
 * @Date: 2022-05-07 18:44:16
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-07 18:58:26
 * @Description: 数据库配置
 */
const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/nodeTemplate', { useUnifiedTopology:true, useNewUrlParser: true })
  .then(() => { 
    console.log('数据库连接成功')
  }).catch(err => {
    console.error('数据库连接失败', err)
  })
}