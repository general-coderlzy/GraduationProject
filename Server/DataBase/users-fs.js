/*
* users.js
* 数据操作文件模块
*/

var fs = require('fs')

var dbPath = './db.json'

/**
 * 读取index.html文件
 */
exports.readIndex = function (callback) {
	fs.readFile('./views/index.html','utf8',function (err,data) {
		if (err) {
			return calllback(err)
		}
		callback(null,data.toString())
	})
}

/**
 * 获取所有用户列表
 */
exports.find = function (callback) {
	fs.readFile(dbPath,'utf8',function (err,data) {
		if (err) {
			return calllback(err)
		}
		console.log(JSON.parse(data).users)
		callback(null,JSON.parse(data).users)
	})
}

/**
 * 根据 id 获取用户对象信息
 * @param  {Number}   id       [用户id]
 * @param  {Function} callback [回调函数]
 */
exports.findById = function (id,callback) {
	fs.readFile(dbPath,'utf8',function (err,data) {
		if (err) {
			return calllback(err)
		}
		var users = JSON.parse(data).users
		var ret = users.find(function (item) {
			return item.id === parseInt(id)
		})
		callback(null,ret)
	})
}

/**
 * 添加用户
 */
exports.save = function (user,callback) {
	fs.readFile(dbPath,'utf8',function (err,data) {
		if (err) {
			return next(err)
		}
		var users = JSON.parse(data).users
		//添加id,唯一不重复
		user.id = users[users.length-1].id+1
		//传递的对象保存到数组中
		users.push(user)
		//把对象数据转为字符串
		var fileData = JSON.stringify({
			users:users
		})

		fs.writeFile(dbPath,fileData,function (err) {
			if(err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

/**
 * 更新用户
 */
exports.updateById = function (user, callback) {
	fs.readFile(dbPath,'utf8',function (err, data) {
		if(err){
			return callback(err)
		}
		var users = JSON.parse(data).users;

		user.id = parseInt(user.id)

		//EcmaScript 6 的一个数组方法
		//当条件满足的时候会将item返回
		var us = users.find(function (item) {
			return item.id === user.id
		})
		//循环赋值 
		for( var key in user) {
			us[key] = user[key]
		}

		var fileData = JSON.stringify({
			users:users
		})

		fs.writeFile(dbPath,fileData,function (err) {
			if(err) {
				return callback(err)
			}
			callback(null)
		})


	})
}

/**
 * 删除用户
 */
exports.deteleById = function (id,callback) {
	fs.readFile(dbPath,'utf8',function (err, data) {
		if(err){
			return callback(err)
		}
		var users = JSON.parse(data).users;		

		//findIndex方法专门用来根据条件查找元素的下标
		var deleteId = users.findIndex(function (item) {
			return item.id === parseInt(id)
		})

		users.splice(deleteId,1)

		//把对象数据转为字符串
		var fileData = JSON.stringify({
			users:users
		})

		fs.writeFile(dbPath,fileData,function (err) {
			if(err) {
				return callback(err)
			}
			callback(null)
		})
	})
}