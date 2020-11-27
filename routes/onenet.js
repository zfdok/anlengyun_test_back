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
  console.log(ctx.request.query.user);
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
        product_id:ctx.state.projectID_zx,
        limit: 100
      },
      headers: {
        Authorization: ctx.state.userToken1
      }
    }, function (error, response, body) {
      result.msg = response
      result.code = 0;
      console.log(result);
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
          product_id:ctx.state.projectID_ly,
          limit: 100
        },
        headers: {
          Authorization: ctx.state.userToken1
        }
      }, function (error, response, body) {
        result.msg = response
        result.code = 0;
        console.log(result);
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