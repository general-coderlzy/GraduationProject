var express = require('express')
//创建一个路由容器
var router = express.Router()
var handler = require('../../Controllers/Customer/User/handler.js')
var db = require('../../DataBase/db.js')


var multer  = require('multer')
var storageAvatar = multer.memoryStorage()
//设置上传过来的文件的存储方式
var upload = multer({ storage: storageAvatar })

//上传图片
router.post('/api/postUploadHeadImage', function (req, res) {
  	handler.UploadHeadSculpture(req,res)	
})

module.exports = router