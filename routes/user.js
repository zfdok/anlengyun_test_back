const router = require('koa-router')()
const { query } = require("../mysql/query"); //引入异步查询方法
const { QUERY_DATAS_BY_WHERE } = require("../mysql/sql"); //部分引入sql库

router.prefix('/user')

router.post('/login', async (ctx, next) => {
  let result = {}
  const name = ctx.request.body.name
  const password = ctx.request.body.password
  await query('set names utf8')
  let query_res = await query(QUERY_DATAS_BY_WHERE("alyun.users", "username", name));//异步方法调用

  if (password !== query_res[0].password) {
    result.code = -1
    result.message = '账户名或密码错误'
  } else {
    result.code = 0
    result.message = '欢迎回来' + query_res[0].username
    result.data = {}
    result.data.user = {
      name: query_res[0].username,
      avatar: query_res[0].usericon,
      address: query_res[0].address,
      position: {
        CN: query_res[0].user_role == 1 ? "管理员" : "普通用户",
        HK: query_res[0].user_role == 1 ? "管理員" : "普通用戶",
        US: query_res[0].user_role == 1 ? "admin" : "user",
      }
    }
    result.data.token = 'Authorization:' + Math.random()
    result.data.expireAt = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    result.data.permissions = [{ id: 'queryForm', operation: ['add', 'edit'] }]
    result.data.roles = [{ id: 'admin', operation: ['add', 'edit', 'delete'] }]
  }
  ctx.body = result
})

module.exports = router
