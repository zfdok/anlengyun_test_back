const router = require('koa-router')()
var request = require('request');

router.prefix('/onenet')

router.get('/', async (ctx, next) => {
  ctx.body = "12312";
})

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

router.get('/get_user_devicelist_zx', async (ctx, next) => {
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
        action: 'QueryDeviceList',
        version: 1,
        project_id: ctx.state.projectID1,
        group_id: user_group_id,
        product_id: ctx.state.projectID_zx,
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


router.get('/get_user_devicelist_ly', async (ctx, next) => {
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
        action: 'QueryDeviceList',
        version: 1,
        project_id: ctx.state.projectID1,
        group_id: user_group_id,
        product_id: ctx.state.projectID_ly,
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
    default:
      break;
  }
  console.log(product_id);
  console.log(device_name);
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


router.get('/get_user_devicelist_znbwx', async (ctx, next) => {
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
        action: 'QueryDeviceList',
        version: 1,
        project_id: ctx.state.projectID1,
        group_id: user_group_id,
        product_id: ctx.state.projectID_znbwx,
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

router.get('/get_user_devicelist_llc', async (ctx, next) => {
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
        action: 'QueryDeviceList',
        version: 1,
        project_id: ctx.state.projectID1,
        group_id: user_group_id,
        product_id: ctx.state.projectID_llc,
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

router.get('/get_user_devicelist_zhlk', async (ctx, next) => {
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
        action: 'QueryDeviceList',
        version: 1,
        project_id: ctx.state.projectID1,
        group_id: user_group_id,
        product_id: ctx.state.projectID_zhlk,
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

router.get('/get_user_devicelist_lcjzx', async (ctx, next) => {
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
        action: 'QueryDeviceList',
        version: 1,
        project_id: ctx.state.projectID1,
        group_id: user_group_id,
        product_id: ctx.state.projectID_lcjzx,
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

module.exports = router