const router = require('koa-router')()
const { log } = require('debug');
var request = require('request');
const { query } = require("../mysql/query"); //引入异步查询方法
const { QUERY_A_DATA_BY_WHERE } = require("../mysql/sql"); //部分引入sql库

router.prefix('/onenet')

//根据前端传入的type确定产品类型
function get_product_type(ctx, type) {
  let product_id = ""
  switch (type) {
    case 'zx':
      product_id = ctx.state.projectID_zx
      break;
    case 'ly':
      product_id = ctx.state.projectID_ly
      break;
    case 'znbwx':
      product_id = ctx.state.projectID_znbwx
      break;
    case 'llc':
      product_id = ctx.state.projectID_llc
      break;
    case 'zhlk':
      product_id = ctx.state.projectID_zhlk
      break;
    case 'lcjzx':
      product_id = ctx.state.projectID_lcjzx
      break;
    case 'ylbwx':
      product_id = ctx.state.projectID_ylbwx
      break;
    default:
      break;
  }
  return product_id;
}

//验证用户并获取groupid
async function get_groupid_by_user(username) {
  await query('set names latin1')
  let query_res = await query(QUERY_A_DATA_BY_WHERE("alyun.users", "username", username, "user_group_id"));
  return query_res[0].user_group_id
}
//获取项目信息
router.get('/get_project_info', async (ctx, next) => {
  let result = {
    code: -1
  }
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/application',
      qs: {
        action: 'QueryStatistics',
        version: 1,
        project_id: ctx.state.projectID1,
      },
      headers: {
        Authorization: ctx.state.userToken1
      }
    }, function (error, response, body) {
      result.msg = response
      result.code = 0;
      ctx.body = result
      resolve(next());
    })
  })
}), function () {
  ctx.body;
}
//获取用户的组信息
router.get('/get_user_project_info', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let user_group_id;
  //查询用户分组
  user_group_id = await get_groupid_by_user(username)
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/application',
      qs: {
        action: 'QueryGroupDetail',
        version: 1,
        project_id: ctx.state.projectID1,
        group_id: user_group_id,
      },
      headers: {
        Authorization: ctx.state.userToken1
      }
    }, function (error, response, body) {
      result.msg = response
      result.code = 0;
      ctx.body = result
      resolve(next());
    })
  })
}), function () {
  ctx.body;
}
//获取设备属性最新值
router.get('/get_device_latest', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let device_name = ctx.request.query.device_name
  let type = ctx.request.query.type
  let product_id = get_product_type(ctx, type)
  //查询用户分组ID
  user_group_id = await get_groupid_by_user(username)
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/application',
      qs: {
        action: 'QueryDeviceProperty',
        version: 1,
        project_id: ctx.state.projectID1,
        product_id: product_id,
        device_name: device_name
      },
      headers: {
        Authorization: ctx.state.userToken1
      }
    }, function (error, response, body) {
      result.msg = response
      result.code = 0;
      ctx.body = result
      resolve(next());
    })
  });//return
}//async
), //get
  function () {
    ctx.body;
  }

//获取设备详情
router.get('/get_device', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let device_name = ctx.request.query.device_name
  let type = ctx.request.query.type
  let product_id = get_product_type(ctx, type)
  //查询用户分组ID
  user_group_id = await get_groupid_by_user(username)
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/application',
      qs: {
        action: 'QueryDeviceDetail',
        version: 1,
        project_id: ctx.state.projectID1,
        product_id: product_id,
        device_name: device_name
      },
      headers: {
        Authorization: ctx.state.userToken1
      }
    }, function (error, response, body) {
      result.msg = response
      result.code = 0;
      ctx.body = result
      resolve(next());
    })
  });//return
}//async
), //get
  function () {
    ctx.body;
  }

//获取用户拥有的设备列表
router.get('/get_user_devicelist', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let user_group_id;

  let type = ctx.request.query.type
  let product_id = get_product_type(ctx, type)

  //查询用户分组ID
  user_group_id = await get_groupid_by_user(username)
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/application',
      qs: {
        action: 'QueryDeviceList',
        version: 1,
        project_id: ctx.state.projectID1,
        group_id: user_group_id,
        product_id: product_id,
        limit: 100
      },
      headers: {
        Authorization: ctx.state.userToken1
      }
    }, function (error, response, body) {
      result.msg = response
      result.code = 0;
      ctx.body = result
      resolve(next());
    })
  });//return
}//async
), //get
  function () {
    ctx.body;
  }
//获取用户拥有的
router.get('/get_device_history', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  // let user_group_id;
  let type = ctx.request.query.type
  let device_name = ctx.request.query.device_name
  let start_time = ctx.request.query.start_time
  let end_time = ctx.request.query.end_time
  let identifier = ctx.request.query.identifier
  let offset = ctx.request.query.offset
  let limit = ctx.request.query.limit
  let product_id = get_product_type(ctx, type)

  //查询用户分组ID
  user_group_id = await get_groupid_by_user(username)
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/application',
      qs: {
        action: 'QueryDevicePropertyHistory',
        version: 1,
        project_id: ctx.state.projectID1,
        product_id: product_id,
        device_name,
        identifier,
        start_time, end_time, offset,
        sort: "2",
        limit
      },
      headers: {
        Authorization: ctx.state.userToken1
      }
    }, function (error, response, body) {
      result.msg = response
      result.code = 0;
      ctx.body = result
      resolve(next());
    })
  });//return
}//async
), //get
  function () {
    ctx.body;
  }
module.exports = router