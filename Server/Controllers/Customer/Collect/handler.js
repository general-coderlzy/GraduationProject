var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var db = require('../../../DataBase/db.js')

//点击收藏的商品插入商品表
module.exports.insert_collect = function (req,res) {
	db.insertData('collect',req.body.form,function (err,result) {
		if (err) {
			return res.status(500).send('[INSERT ERROR] - ',err.message)
		}		
		res.json({'msg':'收藏成功！','status':'200'})
	})
}
//查询是否已经收藏过
module.exports.iscollected = function (req,res) {
	db.selectAll("select count(*) as count from collect where name = '" + req.query.name + "' and cid = '"+ req.query.cid +"';",function (err,result) {
		if (err) {
			return res.status(500).send({'msg':"获取失败","status":1})
		}			    	
		res.json(result)	
	})
}

//取出顾客对应收藏的商品
module.exports.get_collect_data = function (req,res) {
	db.selectAll("select * from collect where collect.cid = '"+ req.query.cid +"';",function (err,result) {
		if (err) {
			return res.status(500).send({'msg':"获取失败","status":1})
		}			    	
		res.json(result)	
	})
}

//修改商品是否被选中的状态(单选) -- 全选用遍历调用单选的接口即可
module.exports.is_goods_selected = function (req,res) {
	db.updateDataById('collect',{selected:req.body.select},req.body.collectId,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(true)
	})	
}

//删除单条收藏商品
module.exports.delete_collect_goods = function (req,res) {
	db.deleteData('collect',req.body.collectId,function (err,result) {
		if (err) {
			return res.status(500).send('[DELETE ERROR] - ',err.message)
		}	
		res.json(true);
	})
}

/*  我的信息部分  */
//在地址表中插入数据
module.exports.insert_address = function (req,res) {
	db.insertData('address',req.body.form,function (err,result) {
		if (err) {
			return res.status(500).send('[INSERT ERROR] - ',err.message)
		}		
		res.json({'msg':'添加成功！！！','status':'200'})
	})
}

//获取地址表中的数据
module.exports.get_address = function (req,res) {
		where = 'cid = '+ req.body.id
		db.selectById('address',where,'addressId as id,userName as name,userPhone as tel,userAddress as address,isDefault,cid,addressId',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}
//当顾客选中默认地址，本身又已经存在默认地址了，那本身存在那个就得取消默认
module.exports.query_isdefaultAddress = function (req,res){
	console.log(req.body.id)
	where = "cid = '" + req.body.id + "' and isDefault = 1;";
	db.updateDataSelect('address',{isDefault:0},where,function (err,result) {
		if (err) {
			return res.status(500).json({"msg":'修改失败',"status":1})
		}
		res.json({"status":200})
	})

}

//修改收货地址后返回的数据
module.exports.update_addressInfo = function (req,res){
	console.log(req.body.form.addressId)
	where = "addressId = '" + req.body.form.addressId + "'";
	db.updateDataSelect('address',{isDefault:req.body.form.isDefault,username:req.body.form.userName,userPhone:req.body.form.userPhone,userAddress:req.body.form.userAddress},where,function (err,result) {
		if (err) {
			return res.status(500).json({"msg":'修改失败',"status":1})
		}
		res.json({"status":200})
	})

}

