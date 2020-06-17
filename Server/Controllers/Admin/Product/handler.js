var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')

var multer  = require('multer')
var storageAvatar = multer.memoryStorage()
//设置上传过来的文件的存储方式
var upload = multer({ storage: storageAvatar })
var db = require('../../../DataBase/db.js')

module.exports.getProductList = function (req,res) {
	offset = (parseInt(req.query.page)-1) * parseInt(req.query.size);
	db.selectByPagination('product','*',offset, req.query.size,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}			    	
		res.json(result)	
	})
}

module.exports.getProductByName = function (req,res) {
	name = "%" + req.query.name + "%";
	db.selectLike('product',['name'],[name],'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)	
	})
}

module.exports.getProductByPcode = function (req,res) {
	pcode = "%" + req.query.pcode + "%";
	db.selectLike('product',['pcode'],[pcode],'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)	
	})
}

module.exports.getProductCount = function (req,res) {
	db.selectAll('select count(*) as count from product',function (err,result) {
		if (err) {
			return res.status(500).send({'msg':"获取失败","status":1})
		}			    	
		res.json(result)	
	})
}

module.exports.getCategoryList = function (req,res) {			
	db.selectAll('SELECT * FROM `category`',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})	
}

module.exports.getProductById = function (req,res) {
	db.selectById('product',req.query.id,'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})	
}

module.exports.postProductById = function (req,res) {
	db.updateData('product',req.body,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json("ok")
	})	
}

module.exports.getProductImgById = function (req,res) {
	db.selectById('product',req.query.id,'img',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})	
}

module.exports.postUploadImage = function (req, res) {
  	// console.log(req.file);
  	// console.log(req.query);
  	// console.log(req.file.buffer);
  	mime = req.file.mimetype.split('/')

  	if(mime[0] === 'image') filetype = `.${mime[1]}`  

  	imageName = `${req.query.name}.jpg_180x180${filetype}`

  	imageUrl = path.join(__dirname,`./public/uploads/images/${req.query.pcode}/${imageName}`)

  	fs.writeFile(imageUrl,Buffer.from(req.file.buffer),function(err){
  		if(err){
  			return res.status(500).json('Server error, File write failed')
  		}  	 		
  		db.updateDataById('product',{img:imageName},req.query.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json('Upload picture succeeded')
		})
  	})  	
}

module.exports.postImgNameById = function (req,res) {
	db.updateDataById('product',{img:req.body.name},req.body.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json('Upload picture succeeded')
	})
}

module.exports.getProductColorById = function (req,res) {	
	db.selectById('color','pid = ' + req.query.id,'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getProductSizeById = function (req,res) {			
	db.selectAll('select b.* from color as a join size as b on a.colid = b.colid where pid = '+ req.query.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})	
}

module.exports.postColorById = function (req,res) {
	db.updateDataById('color',{cprice:req.body.cprice,pprice:req.body.pprice},req.body.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json('Modified success')
	})
}

module.exports.postAddColorById = function (req,res) {
	db.insertData('color',req.body,function (err,result) {
		if (err) {
			return res.status(500).send('[INSERT ERROR] - ',err.message)
		}		
		db.selectById('color','pid = ' + req.body.pid,'*',function (err,result) {
			if (err) {
				return res.status(500).json('Server error')
			}
			res.json(result);
		})
	})
}

module.exports.postSizeById = function (req,res) {
	db.updateDataById('size',{num:req.body.num},req.body.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json('Modified success')
	})
}

module.exports.deleteColorById = function (req,res) {	
	db.selectById('size','colid = ' + req.body.colid,'*',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		var childsize = [];
		data = JSON.parse(JSON.stringify(result));
		for(var i = 0;i<data.length;i++){
		    for(var j in data[i]){
		    	if(j=='sid'){
		    		childsize.push(data[i][j]);
		    	}			        
		    }
		}
		if (childsize.length != 0 ){
			db.deleteDatas('size',childsize,function (err,result) {
				if (err) {
					return res.status(500).send('[DELETE ERROR] - ',err.message)
				}
				deleteColorData(req,res);
			})			
		} else {
			deleteColorData(req,res);
		}		
	})	
}

let deleteColorData = function(req,res){
	db.deleteData('color',req.body.colid,function (err,result) {
		if (err) {
			return res.status(500).send('[DELETE ERROR] - ',err.message)
		}
		
		db.selectById('color','pid = ' + req.body.pid,'*',function (err,result) {
			if (err) {
				return res.status(500).json('Server error')
			}
			res.json(result);
		})		
	})
}

module.exports.postAddSizeById = function (req,res) {
	db.insertData('size',req.body.form,function (err,result) {
		if (err) {
			return res.status(500).send('[INSERT ERROR] - ',err.message)
		}		
		db.selectAll('select b.* from color as a join size as b on a.colid = b.colid where pid = '+ req.body.pid,function (err,result) {
			if (err) {
				return res.status(500).json('Server error')
			}
			res.json(result);
		})

	})
}

module.exports.deleteSizeById = function (req,res) {
	db.deleteData('size',req.body.sid,function (err,result) {
		if (err) {
			return res.status(500).send('[DELETE ERROR] - ',err.message)
		}
		db.selectAll('select b.* from color as a join size as b on a.colid = b.colid where pid = '+ req.body.pid,function (err,result) {
			if (err) {
				return res.status(500).json('Server error')
			}
			res.json(result);
		})		
	})
}

module.exports.getDetailImgById = function (req,res) {
	db.selectById('detail',req.query.id,'img1,img2,img3,img4',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})	
}

module.exports.getPcodeById = function (req,res) {
	db.selectById('product',req.query.id,'pcode',function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})	
}

module.exports.postUploadDetailImage = function (req, res) {

  	mime = req.file.mimetype.split('/')

  	if(mime[0] === 'image') filetype = `.${mime[1]}`  

  	name_prefix = 'chaopai'+req.query.id+'_0'+(req.query.img).slice(-1);

  	imageName = `${name_prefix}.jpg_430x430${filetype}`

  	var data = new Array();
    data[req.query.img] = imageName;

  	imageUrl = path.join(__dirname,`./public/uploads/images/${req.query.pcode}/${imageName}`)

  	fs.writeFile(imageUrl,Buffer.from(req.file.buffer),function(err){
  		if(err){
  			return res.status(500).json('Server error, File write failed')
  		}  	 		

  		db.updateDataById('detail',data,req.query.id,function (err,result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json('Upload picture succeeded')
		})

	})	
  	
}