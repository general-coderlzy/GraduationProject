var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var db = require('../../../DataBase/db.js')
var md5 = require('md5-node')

var multer  = require('multer')
var storageAvatar = multer.memoryStorage()
//设置上传过来的文件的存储方式
var upload = multer({ storage: storageAvatar })


module.exports.UploadHeadSculpture = function (req, res) {

    imgData = req.body.file.content;

    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, '')

    var type = imgData.substring(parseInt(imgData.indexOf(':'))+1,imgData.indexOf(';'))

    // var dataBuffer = new Buffer(base64Data, 'base64')

  	mime = type.split('/')

  	if(mime[0] === 'image') filetype = `.${mime[1]}`  

  	imageName = `${req.body.name}.jpg_${req.body.cid}${filetype}`

  	imageUrl = path.join(__dirname,`../../../public/uploads/headSculpture/${imageName}`)

  	fs.writeFile(imageUrl,Buffer.from(base64Data, 'base64'),function(err){
  		if(err){
  			return res.status(500).json('Server error, File write failed')
  		}  	 		
	  		db.updateDataById('customer',{photo:imageName},req.body.cid,function (err,result) {
				if (err) {
					return res.status(500).json('Server error')
				}
  			res.json({"status":200})
  		})
  	})  	
}