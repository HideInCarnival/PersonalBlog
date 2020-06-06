const syncAll = require('./models/sync');
syncAll();
require('./service/init');
const koa = require("koa2");
const serverConfig = require("./config/server");
const app = new koa();
app.proxy = true;

// middlewares
const bodyParser = require('koa-bodyparser');
const cors = require('./middlewares/cors');
const static = require("koa-static");


// routers
const adminRouter = require("./routes/admin");
const blogRouter = require("./routes/blog");

app.use(static(__dirname + '/public'))
app.use(cors);
app.use(bodyParser());

app.use(adminRouter);
app.use(blogRouter);

app.listen(serverConfig.port);

module.exports = app;