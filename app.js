const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors');

const index = require('./routes/index')
const user = require('./routes/user')
const routes = require('./routes/routes')
const headernotice = require('./routes/headernotice')
const onenet = require('./routes/onenet')

app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求
      }
      return '*'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 全局变量
app.use(async (ctx, next) => {
  ctx.state.projectID1 = '5ihtoF';
  ctx.state.projectID_zx = '4LwKzUwOpX';
  ctx.state.projectID_ly = 'TUqIt2dd20';
  ctx.state.projectID_znbwx = 'KytCaEItQL';
  ctx.state.projectID_llc = '89A3wY6lQy';
  ctx.state.projectID_zhlk = 'Ygy2xf0iYx';
  ctx.state.projectID_lcjzx = 'Z0P3ivtq9Z';
  ctx.state.projectID_ylbwx = 'F0Z9ecQd7i';
  ctx.state.userToken1 = 'version=2020-05-29&res=userid%2F163120&et=1763514709&method=sha1&sign=ftEhYGS5HqfRd7ubdLJ5JQGizkY%3D'
  await next();
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(routes.routes(), routes.allowedMethods())
app.use(headernotice.routes(), headernotice.allowedMethods())
app.use(onenet.routes(), onenet.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
