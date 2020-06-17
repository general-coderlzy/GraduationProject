var express = require('express')
//创建一个路由容器
var router = express.Router()
var handler = require('../../Controllers/Admin/Product/handler.js')

var multer  = require('multer')
var storageAvatar = multer.memoryStorage()
//设置上传过来的文件的存储方式
var upload = multer({ storage: storageAvatar })

// 中间件处理
router.use((req,res,next)=>{
	// console.log(req.session.adminLogined)
	// console.log(req.session.loginUser)
   if(!req.session.adminLogined || !req.session.loginUser){
     return res.status(403).json('拒绝访问');
   }
   next();
 });
//获取商品列表
router.get('/api/getProductList',function (req,res) {	
    handler.getProductList(req,res)	
})
//获取商品列表的总数
router.get('/api/getProductCount',function (req,res) {
	handler.getProductCount(req,res)
})
//根据商品名字搜索
router.get('/api/getProductByName',function (req,res) {
	handler.getProductByName(req,res)
})
//根据商品款号搜索
router.get('/api/getProductByPcode',function (req,res) {
	handler.getProductByPcode(req,res)
})
//获取商品分类列表
router.get('/api/getCategoryList',function (req,res) {			
	handler.getCategoryList(req,res)
})
//根据商品id获取商品大纲
router.get('/api/getProductById',function (req,res) {
	handler.getProductById(req,res)	
})
//修改商品大纲
router.post('/api/postProductById',function (req,res) {
	handler.postProductById(req,res)	
})

//获取商品图片名称
router.get('/api/getProductImgById',function (req,res) {
	handler.getProductImgById(req,res)	
})
//上传图片
router.post('/api/postUploadImage', upload.single('file'), function (req, res) {
  	handler.postUploadImage(req,res)	
})
//更改商品图片名称
router.post('/api/postImgNameById',function (req,res) {
	handler.postImgNameById(req,res)
})

//根据商品id查询颜色列表
router.get('/api/getProductColorById',function (req,res) {	
	handler.getProductColorById(req,res)
})
//根据商品id查询[颜色，尺码]列表
router.get('/api/getProductSizeById',function (req,res) {			
	handler.getProductSizeById(req,res)
})
//根据颜色id修改颜色属性
router.post('/api/postColorById',function (req,res) {
	handler.postColorById(req,res)
})
//根据尺码id修改尺码属性
router.post('/api/postSizeById',function (req,res) {
	handler.postSizeById(req,res)
})
//根据商品id添加颜色款号
router.post('/api/postAddColorById',function (req,res) {
	handler.postAddColorById(req,res)
})
//根据颜色id删除颜色款号
router.post('/api/deleteColorById',function (req,res) {	
	handler.deleteColorById(req,res)
})
//根据颜色id添加尺码 req.body.form 包含 颜色id
router.post('/api/postAddSizeById',function (req,res) {
	handler.postAddSizeById(req,res)
})
//根据尺码id删除尺码款号
router.post('/api/deleteSizeById',function (req,res) {
	handler.deleteSizeById(req,res)
})

//获取商品轮播图图片名称
router.get('/api/getDetailImgById',function (req,res) {
	handler.getDetailImgById(req,res)	
})

//根据pid获取款号
router.get('/api/getPcodeById',function (req,res) {
	handler.getPcodeById(req,res)	
})

//修改轮播图照片
router.post('/api/postUploadDetailImage', upload.single('file'), function (req, res) {
  	handler.postUploadDetailImage(req,res)
})

// router.get('/api/test',function (req,res){
// 	res.send('ok')
// })
module.exports = router
