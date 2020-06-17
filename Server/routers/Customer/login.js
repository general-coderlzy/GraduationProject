var express = require('express')
//创建一个路由容器
var router = express.Router()

var handler = require('../../Controllers/Customer/Login/handler.js')
var db = require('../../DataBase/db.js')
var md5 = require('md5-node')


/*************志豪*********************************************/

//检查用户名是否正确
router.post('/api/checkUserLogin',function (req,res){
	if (req.body.code.toLowerCase() == req.session.code){
		handler.checkUserLogin(req,res)
	} else {
		res.json({"msg":"验证码错误！","status":0})
	}	
})

//注册
router.post('/api/registerUser',function (req,res){
	handler.register_user(req,res)
})

router.post('/api/UpdateInfo',function (req,res){
	handler.UpdateInfo_user(req,res)
});

router.post('/api/UpdatePassword',function (req,res){
	handler.Update_Password(req,res)
});
// 充值
router.post('/api/Recharge',function (req,res){
	handler.Recharge(req,res)
});
//绑定QQ邮箱
router.post('/api/BindQQ',function (req,res){
	handler.BindQQ(req,res)
});
//解除绑定QQ邮箱
router.post('/api/UnBindQQ',function (req,res){
	handler.UnBindQQ(req,res)
});
//查询顾客所有信息
router.get('/api/QueryPersonInfo',function (req,res){
	handler.QueryPersonInfo(req,res)
});

/*************志豪*********************************************/


module.exports = router

