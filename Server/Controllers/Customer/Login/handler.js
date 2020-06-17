var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var db = require('../../../DataBase/db.js')
var md5 = require('md5-node')


/******************************************************************************************************************************/
//判断用户登录
module.exports.checkUserLogin = function (req,res){

	//SELECT count(*) as count FROM users WHERE name = ?, password = ?', [userId, name]
	db.select('customer',['name','password'],[req.body.name,req.body.password],'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		// count = JSON.parse(JSON.stringify(result))[0].count
		results= JSON.parse(JSON.stringify(result));
		if (results.length == 0){
			//邮箱不存在
			res.json(false)
			// res.json({'msg'：'成功','status': 200})
		} else {
			//邮箱存在
			res.json(results)
			// res.json({'msg'：'成功','status': 200})
		}		
	})
}

//注册
//req.body.cid,req.body.name,req.body.password,req.body.phone,req.body.sex,req.body.address
module.exports.register_user = function (req,res) {
	
	db.insertData('customer',req.body.form,function (err,result) {
		if (err) {
			return res.status(500).send('[INSERT ERROR] - ',err.message)
		}		
		res.json({'msg':'注册成功','status':'200'})
	})
}

// 修改个人信息
module.exports.UpdateInfo_user = function (req,res) {
	db.updateDataById('customer',{name:req.body.username,phone:req.body.phone,email:req.body.email,sex:req.body.sex,address:req.body.address,detail_address:req.body.detail_address},req.body.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		where = 'cid = '+ req.body.id
		db.selectById('customer',where,'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		result[1] = {'msg':'修改个人信息成功','status':200}
		res.json(result)
	})	
		// res.json({'msg':'修改个人信息成功','status':200})
	})
}

//充值
module.exports.Recharge = function (req,res) {
	db.updateDataById('customer',{balance:req.body.balance},req.body.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		where = 'cid = '+ req.body.id
		db.selectById('customer',where,'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		result[1] = {'msg':'充值成功','status':200}
		res.json(result)
	})	
		// res.json({'msg':'修改个人信息成功','status':200})
	})
}

//修改密码
module.exports.Update_Password = function (req,res) {
	db.updateDataById('customer',{password:req.body.password},req.body.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json({'msg':'修改密码成功','status':200})
	})
}
//绑定邮箱
module.exports.BindQQ = function (req,res) {
	db.updateDataById('customer',{bindEmail:req.body.bindEmail},req.body.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		where = 'cid = '+ req.body.id
		db.selectById('customer',where,'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		result[1] = {'msg':'成功绑定邮箱！','status':200}
		res.json(result)
	})	
	})
}
//解除绑定邮箱
module.exports.UnBindQQ = function (req,res) {
	db.updateDataById('customer',{bindEmail:req.body.bindEmail},req.body.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		where = 'cid = '+ req.body.id
		db.selectById('customer',where,'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		result[1] = {'msg':'邮箱已解除绑定！','status':200}
		res.json(result)
	})	
	})
}

//通过ID查询顾客所有信息
module.exports.QueryPersonInfo = function (req,res) {
	db.selectAll('select * from customer',function (err,result) {
		if (err) {
			return res.status(500).send({'msg':"获取失败","status":1})
		}			    	
		res.json(result)	
	})
}



/******************************************************************************************************************************/