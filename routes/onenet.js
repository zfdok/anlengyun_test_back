const router = require('koa-router')()
var request = require('request');

router.prefix('/onenet')

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

router.get('/get_user_project_info', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let user_group_id;
  //假装查了数据库,并返回了用户对应的分组ID
  if (username == '熊爸') {
    user_group_id = 'AYqdps'
  }
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

router.get('/get_devicedetail', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let device_name = ctx.request.query.device_name
  let type = ctx.request.query.type
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
  //假装查了数据库,并返回了用户对应的分组ID
  if (username == '熊爸') {
    user_group_id = 'AYqdps'
  }
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

router.get('/get_device', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let device_name = ctx.request.query.device_name
  let type = ctx.request.query.type
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
  //假装查了数据库,并返回了用户对应的分组ID
  if (username == '熊爸') {
    user_group_id = 'AYqdps'
  }
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

router.get('/get_user_devicelist', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let user_group_id;

  let type = ctx.request.query.type
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

  //假装查了数据库,并返回了用户对应的分组ID
  if (username == '熊爸') {
    user_group_id = 'AYqdps'
  }
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

router.get('/get_device_history', async (ctx, next) => {
  let result = {
    code: -1
  }
  let username = ctx.request.query.user
  let user_group_id;
  let type = ctx.request.query.type
  let device_name = ctx.request.query.device_name
  let start_time = ctx.request.query.start_time
  let end_time = ctx.request.query.end_time
  let identifier = ctx.request.query.identifier
  let offset = ctx.request.query.offset
  let limit = ctx.request.query.limit
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

  //假装查了数据库,并返回了用户对应的分组ID
  if (username == '熊爸') {
    user_group_id = 'AYqdps'
  }
  /**** */
  console.log(ctx.state.projectID1);
  console.log(product_id);
  // console.log(device_name);
  console.log(device_name);
  console.log(identifier);
  console.log(start_time);
  console.log(end_time);
  console.log(offset);
  console.log(limit);

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
        start_time, end_time,
        sort: "2", offset,
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