var express = require('express')
var fs = require('fs')
var path = require('path')
var router_public = require('./routers/Public/public.js')
var router_admin_product = require('./routers/Admin/product.js')
var router_admin_login = require('./routers/Admin/login.js')
var router_admin_user = require('./routers/Admin/admin.js')
var router_customer_product = require('./routers/Customer/product.js')
var router_customer_login = require('./routers/Customer/login.js')
var router_customer_collect = require('./routers/Customer/collect.js')
var router_customer_order = require('./routers/Customer/order.js')
var router_customer_user = require('./routers/Customer/user.js')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieParser = require('cookie-parser');
//1.创建服务器app
var app = express()

app.use(cookieParser());

// app.use(session({
//   resave: false, // don't save session if unmodified
//   saveUninitialized: false, // don't create session until something stored
//   secret: 'admin', //密钥
//   name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//   cookie: {
//     maxAge: 80000
//   } //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
// }));
// 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//开放public中资源，当以/public/开头的时候，去/.public中找对应的资源
app.use('/public/',express.static('./public/'))
//同理
app.use('/node_moudules/',express.static('./node_modules/'))

app.engine('html',require('express-art-template'))
//配置模板引擎和解析body-parser  一定要在 app.use(router)
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));

//把路由容器挂载到app服务中
app.use(router_public)
app.use(router_customer_product)
app.use(router_customer_collect)
app.use(router_customer_login)
app.use(router_customer_order)
app.use(router_customer_user)

app.use(router_admin_login)
app.use(router_admin_user)
app.use(router_admin_product)



app.use(function (req,res) {
	res.status(404).render('404.html')
})

//配置错误处理中间件
app.use(function (err,req,res,next) {
	res.status(500).json({
		err_code:500,
		message:err.message,
	})
})

app.listen(3000,function(){
	console.log('running 3000...')
})


