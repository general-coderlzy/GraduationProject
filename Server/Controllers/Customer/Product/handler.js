var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var db = require('../../../DataBase/db.js')
var md5 = require('md5-node')

module.exports.getProductList = function (req, res) {
	offset = (parseInt(req.query.page) - 1) * parseInt(req.query.size);
	db.selectByPagination('product', '*', offset, req.query.size, function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}
/*简单的模糊查询 根据名字查找商品 */
module.exports.getProductByName = function (req, res) {
	name = "%" + req.query.name + "%";
	db.selectLike('product', ['name'], [name], '*', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getProductByPcode = function (req, res) {
	pcode = "%" + req.query.pcode + "%";
	db.selectLike('product', ['pcode'], [pcode], '*', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getProductCount = function (req, res) {
	db.selectAll('select count(*) as count from product', function (err, result) {
		if (err) {
			return res.status(500).send({ 'msg': "获取失败", "status": 1 })
		}
		res.json(result)
	})
}

module.exports.getCategoryList = function (req, res) {
	db.selectAll('SELECT * FROM `category`', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getProductById = function (req, res) {
	db.selectById('product', req.query.id, '*', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getProductImgById = function (req, res) {
	db.selectById('product', req.query.id, 'img', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getDetailImgById = function (req, res) {
	db.selectById('detail', req.query.id, 'img1,img2,img3,img4', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getPcodeById = function (req, res) {
	db.selectById('product', req.query.id, 'pcode', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getProductColorById = function (req, res) {
	db.selectById('color', 'pid = ' + req.query.id, '*', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getProductSizeById = function (req, res) {
	db.selectAll('select b.* from color as a join size as b on a.colid = b.colid where pid = ' + req.query.id, function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getGoods = function (req, res) {
	db.selectAll('SELECT product.pid,product.pcode,color.cprice,color.pprice,product.name,product.img FROM color,product WHERE color.pid = product.pid GROUP BY product.pid', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

//模糊查询
module.exports.getGoodsByName = function (req, res) {
	var sql = "SELECT product.pid,	product.pcode,color.cprice,color.pprice,product.`name`,product.img FROM	color ,	product	WHERE color.pid = product.pid AND product.`name` LIKE '%" + req.query.name + "%' GROUP BY product.pid"
	db.selectAll(sql, function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}
module.exports.getSwipeImg = function (req, res) {
	db.selectAll('SELECT detail.img1 AS `0`,detail.img2 AS `1`,	detail.img3 AS `2`,	detail.img4 AS `3`	FROM detail', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.getDetailImg = function (req, res) {
	db.selectAll('SELECT `describe`.img1 AS `0`,`describe`.img2 AS `1`,`describe`.img3 AS `2`,`describe`.img4 AS `3`,`describe`.img5 AS `4`,`describe`.img6 AS `5`,`describe`.img7 AS `6` FROM`describe`', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}



module.exports.getSku = function (req, res) {
	db.selectAll('SELECT size.size,color.pprice,color.color,color.colid,color.pid,size.num,size.sid FROM	size ,color	WHERE size.colid = color.colid ', function (err, result) {
		if (err) {
			return res.status(500).json('Server error')
		}
		res.json(result)
	})
}

module.exports.SearchProductList = function (req, res) {
	var where = [];
	var where_data = [];
	var like = "";
	var like_data = [];
	var categoryIsExist = false;
	var category = req.query.category;
	var isFirst = true;
	if (category) {
		categoryIsExist = true
	}
	//对权限和状态条件进行判断
	if (categoryIsExist) {
		var length = category.length
		for (var k in category) {
			if (isFirst) {
				if (length == 1) {
					where.push("FIND_IN_SET(?,caid) and ")
				} else {
					where.push("(FIND_IN_SET(?,caid) or ")
				}
				isFirst = false;
			} else if (k == length - 1) {
				where.push("FIND_IN_SET(?,caid)) and ")
			} else {
				where.push("FIND_IN_SET(?,caid) or ")
			}
			where_data.push(category[k])
		}
	} else {
		where = null;
		where_data = null;
	}

	where.push('product.pid = color.pid    ');
	//对模糊查询的条件进行判断

	like_data = null
	like = null

	// console.log(where);
	// console.log(where_data);


	getSearchList('product,	color', where, where_data, like, like_data, 'DISTINCT product.pid, product.`name`, product.img,product.pcode, color.cprice, color.pprice, product.caid')
		.then(
			resolve => {
				res.json(resolve)
			},
			reject => {
				res.json(reject)
			}
		)

}

//获取搜索结果的个数
function getSearchListCount(table, where, where_data, like, like_data, results) {
	return new Promise((resolve, reject) => {
		db.selectByWhere(table, where, where_data, like, like_data, 'count(*) as count', function (err, result) {
			if (err) {
				reject(err)
			}
			count = JSON.parse(JSON.stringify(result))[0].count;
			var temp = [count, results]
			resolve(temp);
		})
	})
}
//根据分页将搜索结果返回
function getSearchList(table, where, where_data, like, like_data, field, offset, limit) {
	return new Promise((resolve, reject) => {
		db.selectByWhere(table, where, where_data, like, like_data, field, function (err, result) {
			if (err) {
				reject(err)
			}
			resolve(result);
		})
	})
}