var express = require('express')
//创建一个路由容器
var router = express.Router()
var handler = require('../../Controllers/Customer/Product/handler.js')

//中间件处理

//获取商品列表
router.get('/api/getProductList', function (req, res) {
	handler.getProductList(req, res)
})
//获取商品类别列表
router.get('/api/getCategoryList', function (req, res) {
	handler.getCategoryList(req, res)
})
//获取商品大纲
router.get('/api/getProductById', function (req, res) {
	handler.getProductById(req, res)
})

//获取商品图片名称
router.get('/api/getProductImgById', function (req, res) {
	handler.getProductImgById(req, res)
})

//根据商品id查询颜色列表
router.get('/api/getProductColorById', function (req, res) {
	handler.getProductColorById(req, res)
})
//根据商品id查询[颜色，尺码]列表
router.get('/api/getProductSizeById', function (req, res) {
	handler.getProductSizeById(req, res)
})

//获取商品轮播图图片名称
router.get('/api/getDetailImgById', function (req, res) {
	handler.getDetailImgById(req, res)
})

//根据pid获取款号
router.get('/api/getPcodeById', function (req, res) {
	handler.getPcodeById(req, res)
})


/**********支垣*********/
router.get('/api/getGoods', function (req, res) {
	handler.getGoods(req, res)
})
router.get('/api/getGoodsByName', function (req, res) {
	handler.getGoodsByName(req, res)
})
// 商品轮播图
router.get('/api/getSwipeImg', function (req, res) {
	handler.getSwipeImg(req, res)
})
// 商品详情图
router.get('/api/getDetailImg', function (req, res) {
	handler.getDetailImg(req, res)
})

// sku数据
router.get('/api/getSku', function (req, res) {
	handler.getSku(req, res)
})

//分类
router.get('/api/getProductByCategory', function (req, res) {
	handler.SearchProductList(req, res)
})

/**********支垣*********/


module.exports = router
