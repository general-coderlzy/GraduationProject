var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var db = require('../../../DataBase/db.js')
var md5 = require('md5-node')

module.exports.checkAdminName = function (req,res){

	db.select('admin',['username'],[req.body.name],'count(*) as count',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		count = JSON.parse(JSON.stringify(result))[0].count
		if (count == 0){
			//用户名不存在
			res.json(false)
		} else {
			//用户名存在
			res.json(true)
		}		
	})

}

module.exports.checkAdminEmail = function (req,res){

	db.select('admin',['email'],[req.body.email],'count(*) as count',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		count = JSON.parse(JSON.stringify(result))[0].count
		if (count == 0){
			//邮箱不存在
			res.json(false)
		} else {
			//邮箱存在
			res.json(true)
		}		
	})

}


module.exports.checkAdminLogin = function (req,res){
	var isUserName = false;
	req.body.form["password"] = md5(req.body.form["password"])
	AdminLogin(['username','password'],req,res)
		.then(resolve=>{			
			isUserName = true;		
			loginSuccess(req,res,resolve);
		},reject=>{
			return AdminLogin(['email','password'],req,res)
		})
		.then(resolve=>{
			if(!isUserName){				
				loginSuccess(req,res,resolve);
			}			
		},reject=>{
			res.json(false)
		})
		.catch(new Function());
}


module.exports.addAdmin = function (req,res){
    delete req.body.form["code"]
    delete req.body.form["checkPass"]
    req.body.form["password"] = md5(req.body.form["password"])
	db.insertData('admin',req.body.form,function (err,result) {
		if (err) {
			return res.status(500).json({"msg":'注册失败',"status":1})
		}
		res.json({"msg":'注册成功',"status":2})		
	})
}

module.exports.changeAdminPassword = function (req,res){
	req.body["password"] = md5(req.body["password"])
	where = "email = '" + req.body.email + "'";
	db.updateDataSelect('admin',{password:req.body.password},where,function (err,result) {
		if (err) {
			return res.status(500).json({"msg":'修改失败',"status":1})
		}
		res.json({"msg":'修改成功',"status":2})
	})
}



function AdminLogin(where,req,res){
	return new Promise((resolve,reject)=>{
		db.select('admin',where,[req.body.form.username,req.body.form.password],'count(*) as count, username, email',function (err,result) {
			if (err) {
				reject(err)
			}
			count = JSON.parse(JSON.stringify(result))[0].count
			if (count == 0){
				//登录失败
				reject()
			} else {
				//登录成功
				resolve(JSON.parse(JSON.stringify(result))[0]); 
			}		
		})
	})
}


function loginSuccess(req,res,data){
	req.session.adminLogined = true;
	req.session.loginUser = {"username":data.username,"email":data.email}
	// console.log(req.session.loginUser)
	res.json(true)
}