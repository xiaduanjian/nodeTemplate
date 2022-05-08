/*
 * @Author: xia.duanjian
 * @Date: 2022-05-08 15:58:44
 * @LastEditors: xia.duanjian
 * @LastEditTime: 2022-05-08 16:01:17
 * @Description: 文章管理
 */

// 引入mongoose
const mongoose = require("mongoose");

// 文章文档对象
const articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  createTime: String,
  stemfrom: String,
  read: {
    type: Number,
    default: 0,
  },
  star: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
  author: String,
});

const Article = mongoose.model("articles", articleSchema);

module.exports = Article;
