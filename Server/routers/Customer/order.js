var express = require('express')
//创建一个路由容器
var router = express.Router()

var handler = require('../../Controllers/Customer/Order/handler.js')
var db = require('../../DataBase/db.js')
var md5 = require('md5-node')

/*支垣写的*********************************/
//查询当前用户购物车表
router.get('/api/getCartByCid', function (req, res) {
    handler.getCartByCid(req, res);
})
//查询当前用户的购物车列表，里面的商品详情
router.get('/api/getCartGoodsInfo', function (req, res) {
    handler.getCartGoodsInfo(req, res)
})
//插入一条数据进购物车表
router.post('/api/postCartById', function (req, res) {
    handler.postCartById(req, res)
})
//删除购物车表一条数据
router.post('/api/delCartGoods', function (req, res) {
    handler.delCartGoods(req, res)
})
//商品数量加一
router.post('/api/addNum', function (req, res) {
    handler.addNum(req, res)
})
//商品数量减一
router.post('/api/delNum', function (req, res) {
    handler.delNum(req, res)
})
//修改商品isCheck的值
router.post('/api/updateIsCheck', function (req, res) {
    handler.updateIsCheck(req, res)
})
//插入order表
router.post('/api/placeOrder', function (req, res) {
    handler.placeOrder(req, res)
})
//插入orderitem表
router.post('/api/placeOrderItem', function (req, res) {
    handler.placeOrderItem(req, res)
})
//修改用户余额
router.post('/api/updateMoney', function (req, res) {
    handler.updateMoney(req, res)
})
//修改用户积分
router.post('/api/updateIntegral', function (req, res) {
    handler.updateIntegral(req, res)
})
//查询地址表信息
router.get('/api/getAddressByCId', function (req, res) {
    handler.getAddressByCId(req, res)
})
/*上面是支垣写的***********************************************/
module.exports = router