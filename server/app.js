//config
require('./config/process.config')();
const cors_config = require('./config/cors.config');
const router_config = require('./config/router.config');
const xss_init = require('./config/xss.config');
//node模块
const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
//Koa2模块
const Koa = require('koa');
const cors = require('koa2-cors');
const router = require('koa-router')(router_config);
const bodyParser = require('koa-bodyparser'); //解析request的body
//other module
const qs = require('qs');
const controller = require('./controllers');

const app = new Koa();
app.use(bodyParser());

const isHttps = false;
if (isHttps) {
  const enforceHttps = require('koa-sslify'); //把所有请求转为https
  app.use(enforceHttps());
  var ssl_options = {
    key: fs.readFileSync('../sslkey/214314921610609.key'),
    cert: fs.readFileSync('../sslkey/214314921610609.pem'),
  };
}

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} - ${ctx.request.url}`);
  ctx.response.set('Cache-Control', 'no-cache');
  xss_init(ctx); //xss过滤
  await next();
});

app.use(xss_init());

//add cors middleware
app.use(cors(cors_config));
// add router middleware:
app.use(controller(router));

//open
let server;
if (isHttps) {
  server = https.createServer(ssl_options, app.callback());
} else {
  server = http.createServer(app.callback());
}

// websocket
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server: server });
const utils = require('./utils');
const roomData = require('./data/room');

wss.on('connection', function connection(socket, request) {
  // console.log(request.url);
  let params = request.url;
  params = params.substring(params.indexOf('?') + 1);
  params = qs.parse(params, { ignoreQueryPrefix: true });
  // console.dir(params);
  socket.uid = params.uid;
  socket.roomId = params.roomId;
  socket.on('message', async function incoming(message) {
    console.log('received: %s', message);
    const messageObject = JSON.parse(message);

    for (const client of wss.clients) {
      // console.log(client.uid);
      // console.log(client.roomId);
      const { uids } = await utils.find.findDataByKey(roomData.room, 'id', messageObject.roomId);
      // const { uids } = findRoom(messageObject.roomId);
      const isOpen = client.readyState === WebSocket.OPEN;
      const isReceiveUser = uids.includes(client.uid);
      console.log('isReceiveUser', uids, client.uid, isReceiveUser);
      if (isOpen && isReceiveUser) {
        client.send(message);
      }
    }

    // wss.clients.forEach(function each(client) {
    //   // console.log(client.uid);
    //   // console.log(client.roomId);
    //   const { uids }  = await utils.find.findDataByKey(roomData.room, 'id', messageObject.roomId);
    //   // const { uids } = findRoom(messageObject.roomId);
    //   const isOpen = client.readyState === WebSocket.OPEN;
    //   const isReceiveUser = uids.includes(client.uid);
    //   console.log('isReceiveUser', uids, client.uid, isReceiveUser);
    //   if (isOpen && isReceiveUser) {
    //     client.send(message);
    //   }
    // });
  });
  // socket.send('ok');
});

if (isHttps) {
  server.listen(443);
} else {
  server.listen(3389);
}
