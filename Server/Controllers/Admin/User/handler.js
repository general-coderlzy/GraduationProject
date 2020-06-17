var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var db = require('../../../DataBase/db.js')
var moment = require('moment');

module.exports.getAdminList = function (req,res){
	offset = (parseInt(req.query.currpage)-1) * parseInt(req.query.pagesize)
	getAdminList(offset,req.query.pagesize)
		.then(
			resolve => {
				res.json(resolve)
			},
			reject => {
				res.json(reject)
			}
		)
}

module.exports.deleteAdmin = function (req,res){
	deleteAdmin(req.body.id)
		.then(resolve=>{
			return getAdminList()
		})
		.then(resolve=>{
			res.json(resolve)
		})
}

module.exports.getAdminCount = function (req,res){
	db.selectAll('select count(*) as count from admin',function (err,result) {
			if (err) {
				return res.status(500).send({'msg':"获取失败","status":1})
			}			    	
			res.json(result)	
		})
}

module.exports.SearchAdminList = function (req,res){
	var where = "";
	var where_data = [];
	var like = "";
	var like_data = [];
	var time = [];
	//对权限和状态条件进行判断
	if(req.query.state == 0 && req.query.power != 0 ){
		if(req.query.power == 1){
			where_data = ["1"]
		} else {
			where_data = ["0"]
		}
		where = ["power"]
	} else if (req.query.state != 0 && req.query.power == 0 ) {
		if(req.query.state == 1){
			where_data = ["正常"];
		} else {
			where_data = ["禁用"];
		}
		where = ["state"]
	} else if (req.query.state != 0 && req.query.power != 0 ) {
		if(req.query.power == 1){
			where_data[0] = "1";
		} else {
			where_data[0] = "0";
		}
		if(req.query.state == 1){
			where_data[1] = "正常";
		} else {
			where_data[1] = "禁用";
		}
		where = ["power","state"];
	} else {
		where = null;
		where_data = null;
		// where = ['regtime >=','regtime <='];                        //报错的
		// where_data = [ '2019-12-21 00:00:00', '2019-12-28 00:00:00']
		// where = ["regtime =","regtime ="]; 							报错的
		// where_data = [ '2019-12-21 00:00:00', '2019-12-28 00:00:00']
		// where = ["regtime","regtime"]; 
		// where_data = [ '2019-12-21 00:00:00', '2019-12-28 00:00:00']
	}
	//增加时间条件 
	if(req.query.time != null){
		time[0] = moment(req.query.time[0]).format('Y-MM-DD HH:mm:ss');
		time[1] = moment(req.query.time[1]).format('Y-MM-DD HH:mm:ss');
		if(where_data == null && where == null){ 
			where_data = [];
			where = ["regtime"]
			where_data[0] = time[0];
			where_data[1] = time[1];
		} else if( where_data.length == 2){
			where = where.concat(["regtime"]);
			where_data[2] = time[0];
			where_data[3] = time[1];
		} else if( where_data.length == 1){
			where = where.concat(["regtime"]);
			where_data[1] = time[0];
			where_data[2] = time[1];
		} 
	}
	//对模糊查询的条件进行判断
	if(req.query.like == "name"){
		str = "%" + req.query.keywords + "%"
		like_data = [str];
		like = ["username"]
	} else if (req.query.like == "email") {
		str = "%" + req.query.keywords + "%"
		like_data = [str];
		like = ["email"]
	} else {
		like_data = null
		like = null
	}

	offset = (parseInt(req.query.currpage)-1) * parseInt(req.query.pagesize)
    limit = req.query.pagesize
	// (table,where,where_data,like,like_data,field,offset,limit,callback) 
	getSearchList('admin',where,where_data,like,like_data,'*',offset,limit)
		.then(
			resolve => {
				return getSearchListCount("admin",where,where_data,like,like_data,resolve)
			},
			reject => {
				res.json(reject)
			}
		)
		.then(
			resolve => {				
				res.json(resolve)
			},
			reject => {
				res.json(reject)
			}
		)
	
}

module.exports.EditAdmin = function (req,res){
	db.updateData('admin',req.body.data,function (err,result){
		if (err) {
			return res.status(500).send({'msg':"修改失败","status":1})
		}			    
		res.json({"msg":'修改成功',"status":2})
	})
}

function getAdminList(offset,pagesize) {
	return new Promise((resolve,reject)=>{
		db.selectByPagination('admin','*',offset, pagesize,function (err,result) {
			if (err) {
				reject(err)
			}			    
			for (var item in result) {  //遍历结果
				result[item].regtime = moment(result[item].regtime).format('Y-MM-DD HH:mm:ss');
			}	
			resolve(result); 	
		})
	})
}
//获取搜索结果的个数
function getSearchListCount(table,where,where_data,like,like_data,results){
	return new Promise((resolve,reject)=>{
		db.selectByWhere('admin',where,where_data,like,like_data,'count(*) as count',function (err,result){
			if (err) {
				reject(err)
			}    
			count = JSON.parse(JSON.stringify(result))[0].count;
			var temp = [count,results]
			resolve(temp); 
		})
	})
}
//根据分页将搜索结果返回
function getSearchList(table,where,where_data,like,like_data,field,offset,limit){
	return new Promise((resolve,reject)=>{
		db.selectByPaginationWhere(table,where,where_data,like,like_data,field,offset,limit,function (err,result){
			if (err) {
				reject(err)
			}			    
			for (var item in result) {  //遍历结果
				result[item].regtime = moment(result[item].regtime).format('Y-MM-DD HH:mm:ss');
			}	
			resolve(result);
		})
	})
}
function deleteAdmin(id){
	return new Promise((resolve,reject)=>{
		db.deleteData('admin',id,function (err,result) {
			if (err) {
				reject(err)
			}   
			resolve(result); 		
		})
	})
}