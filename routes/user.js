const router = require('koa-router')()
var request = require('request');
const { query } = require("../mysql/query"); //引入异步查询方法
const { QUERY_DATAS_BY_WHERE } = require("../mysql/sql"); //部分引入sql库
var sqlAPI = require('../mysql/sqlAPI')
const jwt = require('jsonwebtoken')


router.prefix('/user')

router.post('/login', async (ctx, next) => {
  let result = {}
  const name = ctx.request.body.name
  const password = ctx.request.body.password

  await query('set names utf8')
  let query_res = await query(QUERY_DATAS_BY_WHERE("alyun.users", "username", name));//异步方法调用
  if (!query_res[0]) {
    result.code = 401
    result.message = '账户名或密码错误'
  }
  else if (password !== query_res[0].password) {
    result.code = 401
    result.message = '账户名或密码错误'
  } else {
    console.log(query_res[0]);
    result.code = 200
    result.message = '欢迎回来' + query_res[0].username
    result.data = {}
    result.data.user = {
      name: query_res[0].username,
      avatar: query_res[0].usericon,
      address: query_res[0].address,
      commpany: query_res[0].commpany,
      position: {
        CN: query_res[0].user_role == 1 ? "管理员" : "普通用户",
        HK: query_res[0].user_role == 1 ? "管理員" : "普通用戶",
        US: query_res[0].user_role == 1 ? "admin" : "user",
      }
    }
    const token = jwt.sign({
      //token的创建日期
      time: Date.now(),
      //token的过期时间
      timeout: Date.now() + 7 * 24 * 60 * 60000,
      username: query_res[0].username,
      id: 1
      // token：解析token的标识
    }, 'token')
    console.log(Date.now());
    result.data.token = token
    result.data.expireAt = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    result.data.permissions = [{ id: 'queryForm', operation: ['add', 'edit'] }]
    result.data.roles = [{ id: 'admin', operation: ['add', 'edit', 'delete'] }]
  }
  ctx.body = result
})

router.get('/checktoken', async (ctx, next) => {
  ctx.body = {
    code: 200,
    status: 200,
    message: '已登陆',
    data: '已登陆'
  }
})

router.post('/check_password', async (ctx, next) => {
  const username = ctx.request.body.params.username
  const password = ctx.request.body.params.password
  let res = await sqlAPI.sql_use_pass_by_name(username)
  if (res == password) {
    ctx.body = {
      code: 200,
      status: 200,
      message: '密码正确',
      data: '密码正确'
    }
  } else {
    ctx.body = {
      code: 400,
      status: 400,
      message: '密码错误',
      data: '密码错误'
    }
  }

})

router.get('/get_user_info', async (ctx, next) => {
  let name = ctx.request.query.name
  let res = await sqlAPI.sql_user_by_name(name)
  if (res) {
    res.password = ''
    ctx.body = {
      code: 200,
      status: 200,
      message: '用户信息获取成功',
      data: res
    }
  } else {
    ctx.body = {
      code: 400,
      status: 400,
      message: '账号错误',
      data: '账号错误'
    }
  }
})

router.get('/set_user_info', async (ctx, next) => {
  let username = ctx.request.query.username
  let user_group_name = ctx.request.query.user_group_name
  let commpany = ctx.request.query.commpany
  let address = ctx.request.query.address
  let email = ctx.request.query.email
  let sms_span = ctx.request.query.sms_span
  let sms_day_limit = ctx.request.query.sms_day_limit
  let alert_phones = ctx.request.query.alert_phones
  console.log(alert_phones);
  let res = await sqlAPI.update_user_by_name(username, user_group_name, commpany, address, email, sms_span, sms_day_limit, alert_phones)
  if (res) {
    res.password = ''
    ctx.body = {
      code: 200,
      status: 200,
      message: '用户信息获取成功',
      data: res
    }
  } else {
    ctx.body = {
      code: 400,
      status: 400,
      message: '账号错误',
      data: '账号错误'
    }
  }
})
router.get('/get_sms_code', async (ctx, next) => {
  let username = ctx.request.query.username
  let phoneNum = ctx.request.query.phoneNum
  console.log(username);
  console.log(phoneNum);
  let res = await new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://www.anlengyun.com:3001/users/get_sms_code',
      qs: {
        username,
        phoneNum,
      },
    }, function (error, response, body) {
      resolve(response.body);
    })
  });
  console.log(res);
  ctx.body = res
})

router.get('/check_sms_code', async (ctx, next) => {
  let username = ctx.request.query.username
  let phoneNum = ctx.request.query.phoneNum
  let code = ctx.request.query.code

  let res = await new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://www.anlengyun.com:3001/users/check_sms_code',
      qs: {
        username,
        phoneNum,
        code
      },
    }, function (error, response, body) {
      resolve(response.body);
    })
  });
  console.log(res);
  ctx.body = res
})
router.get('/update_sms_day_limit', async (ctx, next) => {
  let username = ctx.request.query.username
  let num = ctx.request.query.num
  await sqlAPI.update_sms_day_count_by_name(username, num)
  ctx.body = {
    code: 200,
    status: 200,
    message: '密码正确',
    data: '密码正确'
  }
})

router.get('/get_user_device_info', async (ctx, next) => {
  let username = ctx.request.query.username
  let user_group_id = await sqlAPI.sql_groupid_by_user(username)
  let res = await sqlAPI.sql_devices_by_groupid(user_group_id)
  if (res) {
    ctx.body = {
      code: 200,
      status: 200,
      message: '获取设备成功',
      data: res
    }
  } else {
    ctx.body = {
      code: 400,
      status: 400,
      message: '获取设备失败',
      data: '获取设备失败'
    }
  }

})

router.post('/change_pass', async (ctx, next) => {
  const username = ctx.request.body.params.username
  const password = ctx.request.body.params.password
  console.log(username);
  console.log(password);
  let res = await sqlAPI.update_user_pass(username, password)
  console.log(res);
  ctx.body = {
    code: 200,
    status: 200,
    message: '修改成功',
    data: '修改成功'
  }
})

router.get('/set_user_phone', async (ctx, next) => {
  let phone = ctx.request.query.phone
  let username = ctx.request.query.username
  console.log(phone);
  console.log(username);
  let res = sqlAPI.update_user_phone(username, phone)
  ctx.body = {
    code: 200,
    status: 200,
    message: '设置用户手机号',
    data: res
  }
})

module.exports = router
