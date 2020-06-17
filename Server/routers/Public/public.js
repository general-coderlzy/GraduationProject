var express = require('express')
//创建一个路由容器
var router = express.Router()
var code = require('../../Controllers/Public/code/code.js')
var email = require('../../Controllers/Public/email/email.js')
var nodemailer = require("nodemailer"); 

router.get("/api/getCode",function (req, res, next){
	code.createcode(req, res, next);
})

router.post('/api/postSendEmail', function (req,res){
	email(req.body.email).then(data=>{
		req.session.Email = data;	
    	res.json(true);
	},data=>{
    	res.json(data);
	})
})

router.post('/api/postEmail',function (req, res){
	if(!req.session.Email){
		res.json({"msg":'验证码已过期',"status":0})
	} else {
		let AuthCode = req.body.AuthCode == req.session.Email['AuthCode'];
		let Email = req.body.Email == req.session.Email['Email'];
		if( AuthCode && Email ){
			req.session.Email = null
			req.session.forget = true
			res.json({"msg":'验证成功',"status":2})
		} else {				
			res.json({"msg":'验证码错误',"status":1})
		}
	}	
})

module.exports = router