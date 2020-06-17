var express = require('express')
//创建一个路由容器
var router = express.Router()
var handler = require('../../Controllers/Admin/Login/handler.js')

/*  req.session.adminLogined: Boolean，管理员是否登录
	req.session.customerLogined: Boolean，顾客是否登录
    req.session.loginUser: Object，已经登录用户的信息     */

router.get('/api/islogin', function (req, res) { 
//判断session是否为true
	if(req.session.adminLogined){
		res.send(true)
	}else{
		res.send(false)
	}
})

router.get('/api/loginUser',function (req, res){
	// console.log(req.session.loginUser)
	if(req.session.loginUser){
		res.send(req.session.loginUser)
	}else{
		res.send(false)
	}
})

router.post('/api/checkAdminName', function (req,res){
	handler.checkAdminName(req,res)
})

router.post('/api/checkAdminEmail', function (req,res){
	handler.checkAdminEmail(req,res)
})


router.post('/api/postAdminRegister',function (req,res){
	if(req.body.form.code.toLowerCase() == req.session.Code){
		res.json({"msg":'验证码错误',"status":0})
	} else {		
		handler.addAdmin(req,res)
	}
})

router.post('/api/postforgetAdminPassword',function (req,res){
	if(req.session.forget != true)
	{
		handler.changeAdminPassword(req,res)
	} else {
		res.json({"msg":'拒绝访问',"status":0})
	}
	
})

router.post('/api/postAdminLogin',function (req,res){
	handler.checkAdminLogin(req,res)
})

router.get('/api/adminLogout',function (req,res){
	req.session.adminLogined = false
	req.session.loginUser = null
	if(!req.session.adminLogined){
		res.json({"msg":"注销成功","status":2})
	} else {
		res.json({"msg":"注销失败","status":1})
	}
	
})

router.get('/api/test',function (req,res){
	console.log(req.session.loginUser)
})

module.exports = router
