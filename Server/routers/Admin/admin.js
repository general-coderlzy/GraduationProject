var express = require('express')
//创建一个路由容器
var router = express.Router()
var handler = require('../../Controllers/Admin/User/handler.js')


//获取管理员列表
router.get('/api/getAdminList',function (req,res) {
	handler.getAdminList(req,res)	
})

router.get('/api/SearchAdminList',function (req,res) {
	console.log(req.query)
	handler.SearchAdminList(req,res)
})

router.post('/api/deleteAdmin',function (req,res) {
	handler.deleteAdmin(req,res)	
})

router.post('/api/postEditAdmin',function (req,res){
	handler.EditAdmin(req,res)
})

router.get('/api/getAdminCount',function (req,res){
	handler.getAdminCount(req,res)
})

module.exports = router
