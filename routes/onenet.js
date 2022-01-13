const router = require('koa-router')()
var request = require('request');
var sqlAPI = require('../mysql/sqlAPI')
router.prefix('/onenet')

//根据前端传入的type确定产品类型
function get_product_type(ctx, type) {
  let product_id = type
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
  return await sqlAPI.sql_groupid_by_user(username)
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
      result = JSON.parse(response.body)
      result.code = 200;
      result.msg = "请求成功"
      ctx.body = result
      resolve(next());
    })
  });//return
}//async
), //get
  function () {
    ctx.body;
  }

//获取设备属性最新定位
router.get('/get_device_latest_lbs', async (ctx, next) => {
  let result = {
    code: -1
  }
  let device_name = ctx.request.query.device_name
  let type = ctx.request.query.type
  let product_id = get_product_type(ctx, type)
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/lbs',
      qs: {
        action: 'latestLocation',
        version: 1,
        product_id: product_id,
        device_name: device_name
      },
      headers: {
        Authorization: ctx.state.userToken1
      }
    }, function (error, response, body) {
      result = JSON.parse(response.body)
      result.code = 200;
      result.msg = "请求成功"
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
      result = JSON.parse(response.body)
      result.code = 200
      result.msg = "请求成功"
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

      // console.log(result);
      resolve(next());
    })
  });//return
}//async
), //get
  function () {
    ctx.body;
  }

//获取用户拥有的特定产品的设备列表
router.get('/get_user_devicelist_by_type', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let user_group_id;
  let product_id = get_product_type(ctx, ctx.request.query.type)

  //查询用户分组ID
  user_group_id = await get_groupid_by_user(username)
  let rsp = await new Promise((resolve, reject) => {
    request(
      {
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
        resolve(JSON.parse(body));
      })
  });
  if (rsp.success) {
    result.code = 200
    result.message = '请求成功'
    result.data = rsp.data
    ctx.body = result
  } else {
    ctx.body = {
      code: 500,
      status: 500,
      message: '请求错误',
      data: '请求错误'
    }
  }
})


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
router.get('/get_device_desired', async (ctx, next) => {
  let type = ctx.request.query.type
  let product_id = get_product_type(ctx, type)
  let device_name = ctx.request.query.device_name

  let rsp = await new Promise((resolve, reject) => {
    request({
      method: 'POST',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/application',
      headers: {
        Authorization: ctx.state.userToken1
      },
      qs: {
        action: 'QueryDeviceDesiredProperty',
        version: 1,
      },
      json: true,
      body: {
        "project_id": ctx.state.projectID1,
        "product_id": product_id,
        "device_name": device_name,
        "params": [
          "temp_alarm",
          "tempL",
          "tempU",
          "period"
        ]
      }
    }, function (error, response, body) {
      resolve(response.body.data);
    })
  });//return
  let result = {
    data: rsp,
    msg: "请求成功",
    code: 200
  }
  ctx.body = result
  return ctx.body
})

router.get('/set_device_desired', async (ctx, next) => {
  let type = ctx.request.query.type
  let product_id = get_product_type(ctx, type)
  let device_name = ctx.request.query.device_name
  let temp_alarm = ctx.request.query.temp_alarm == 'true' ? true : false
  let tempL = parseFloat(ctx.request.query.tempL)
  let tempU = parseFloat(ctx.request.query.tempU)
  let period = parseInt(ctx.request.query.period)

  console.log(product_id);
  let rsp = await new Promise((resolve, reject) => {
    request({
      method: 'POST',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/application',
      headers: {
        Authorization: ctx.state.userToken1
      },
      qs: {
        action: 'SetDeviceDesiredProperty',
        version: 1,
      },
      json: true,
      body: {
        "project_id": ctx.state.projectID1,
        "product_id": product_id,
        "device_name": device_name,
        "params": {
          "temp_alarm": temp_alarm,
          "tempL": tempL,
          "tempU": tempU,
          "period": period
        }
      }
    }, function (error, response, body) {
      resolve(response.body);
    })
  });//return
  //将设置数据写入数据库
  if (rsp.success) {
    let query_res = await sqlAPI.sql_groupid_by_device(device_name);
    console.log("query_res");
    console.log(query_res);
    if (query_res.length) {
      await sqlAPI.update_setting_data(device_name, temp_alarm, tempL, tempU, period)
      // console.log(update_query_res);
    } else {
      //这里写数据库中没有设备时的处理
      console.log("这里写数据库中没有设备时的处理");
      request({
        method: 'GET',
        timeout: 5000,
        url:
          'http://www.anlengyun.com:3001/onenet/updategroup',
      })
    }
  }
  rsp.code = 200
  rsp.msg = "请求成功"
  ctx.body = rsp
  return ctx.body
})
router.get('/set_device_name', async (ctx, next) => {
  let type = ctx.request.query.type
  let product_id = get_product_type(ctx, type)
  let device_name = ctx.request.query.device_name
  let device_desc = ctx.request.query.name
  let rsp = await new Promise((resolve, reject) => {
    request({
      method: 'POST',
      timeout: 5000,
      url:
        'http://openapi.heclouds.com/common',
      headers: {
        Authorization: ctx.state.userToken1
      },
      qs: {
        action: 'UpdateDevice',
        version: 1,
      },
      json: true,
      body: {
        "product_id": product_id,
        "device_name": device_name,
        "desc": device_desc
      }
    }, function (error, response, body) {
      resolve(response.body);
    })
  });
  console.log(rsp);
  console.log(rsp.success);
  // console.log(rsp.body.success);
  ctx.body = {
    "success": rsp.success,
    code: 200,
    msg: "请求成功"
  }
  // return ctx.body
})


// async function test() {
//   let username = 'admin'
//   let phoneNum = '15853823881'
//   let username = 2913
//   // console.log(request);
//   // let res = request({
//   //   method: 'GET',
//   //   timeout: 5000,
//   //   url:
//   //     'http://www.anlengyun.com:3001//users/check_sms_code',
//   //   qs: {
//   //     username,
//   //     phoneNum,
//   //     code
//   //   },
//   // })
//   // console.log(res);
// }

// test()


module.exports = router