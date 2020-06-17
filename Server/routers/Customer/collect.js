var express = require('express')
//创建一个路由容器
var router = express.Router()

var handler = require('../../Controllers/Customer/Collect/handler.js')
var db = require('../../DataBase/db.js')


//插入收藏表的商品数据
router.post('/api/insertcollect',function (req,res){
	handler.insert_collect(req,res)
})

//查询是否已经收藏过
router.get('/api/iscollected',function (req,res){
	handler.iscollected(req,res)
})

//取出顾客对应收藏的商品
router.get('/api/get_collect_data',function (req,res){
	handler.get_collect_data(req,res)
})

//修改商品是否被选中的状态
router.post('/api/is_goods_selected',function (req,res){
	handler.is_goods_selected(req,res)
})

//删除单条收藏商品
router.post('/api/delete_collect_goods',function (req,res){
	handler.delete_collect_goods(req,res)
})

/*  我的信息部分  */
//在地址表中插入数据
router.post('/api/insert_address',function (req,res){
	handler.insert_address(req,res)
})
//获取地址表中的数据
router.post('/api/get_address',function (req,res){
	handler.get_address(req,res)
})
////当顾客选中默认地址，本身又已经存在默认地址了，那本身存在那个就得取消默认
router.post('/api/query_isdefaultAddress',function (req,res){
	handler.query_isdefaultAddress(req,res)
})
//修改收货地址后返回的数据
router.post('/api/update_addressInfo',function (req,res){
	handler.update_addressInfo(req,res)
})


//导出路由
module.exports = router
