var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var db = require('../../../DataBase/db.js')

/*********支垣写的**********************************/
//查询当前用户购物车表所有数据
module.exports.getCartByCid = function (req, res) {
    db.select("cart", ['cid'], [req.query.cid], '*', function (err, result) {
        if (err) {
            return res.status(500).json('Server error')
        }
        res.json(result)
    })

}
//查询当前用户的购物车列表，里面的商品详情
module.exports.getCartGoodsInfo = function (req, res) {
    // console.log(req.query.cid);
    var sql = "SELECT cart.buynum,cart.isCheck,cart.sid,size.size,color.color,product.name,product.img,color.pprice,cart.ccid,size.num,product.pcode,product.pid FROM cart,size,color,product WHERE plgdb.cart.sid = plgdb.size.sid AND plgdb.size.colid = plgdb.color.colid AND color.pid = product.pid AND cart.cid = '" + req.query.cid + "'";
    db.selectAll(sql, function (err, result) {
        if (err) {
            return res.status(500).json('Server error')
        }
        res.json(result)
    })
}
//插入一条数据进购物车表
module.exports.postCartById = function (req, res) {
    // form:{
    //     sid:1,
    //     cid:1,顾客id
    //     buynum:10,
    //     isCheck:0  int(false)
    // }
    db.insertData('cart', req.body.form, function (err, result) {
        if (err) {
            return res.status(500).send('[INSERT ERROR] - ', err.message)
        }
        res.json("insert success")
    })
}
//删除一条数据
module.exports.delCartGoods = function (req, res) {
    // console.log(req.body.ccid);
    db.deleteData('cart', req.body.ccid, function (err, result) {
        if (err) {
            return res.status(500).send("delete failed")
        }
        res.json("delete success")
    })
}
//数量加一，根据ccid来找对应的哪一行数据
module.exports.addNum = function (req, res) {
    // console.log(req.body.form.ccid);
    // num = req.body.form.buynum;
    // console.log(req.body.form.buynum);
    db.updateDataById('cart', { buynum: req.body.form.buynum }, req.body.form.ccid, function (err, result) {
        if (err) {
            return res.status(500).send("insert failed")
        }
        res.json("insert success")
    })
}
//数量减一，根据ccid来找对应的哪一行数据
module.exports.delNum = function (req, res) {
    // console.log(req.body.form.ccid);
    // num = req.body.form.buynum;
    // console.log(req.body.form.buynum);
    db.updateDataById('cart', { buynum: req.body.form.buynum }, req.body.form.ccid, function (err, result) {
        if (err) {
            return res.status(500).send("insert failed")
        }
        res.json("insert success")
    })
}
//修改isCheck的值
module.exports.updateIsCheck = function (req, res) {
    // console.log(Number(req.body.form.isCheck));
    // num = req.body.form.buynum;
    // console.log(req.body.form.buynum);
    db.updateDataById('cart', { isCheck: Number(req.body.form.isCheck) }, req.body.form.ccid, function (err, result) {
        if (err) {
            return res.status(500).send("update failed")
        }
        res.json("update success")
    })
}
//插入数据进order表
module.exports.placeOrder = function (req, res) {
    db.insertData('`order`', req.body.form, function (err, result) {
        if (err) {
            return res.status(500).send('[INSERT ORDERTABLE ERROR] - ', err.message)
        }
        res.json(result);
    })
}
//插入orderitem表
module.exports.placeOrderItem = function (req, res) {
    db.insertData('`orderitem`', req.body.form, function (err, result) {
        if (err) {
            return res.status(500).send('[INSERT ORDERITEMTABLE ERROR] - ', err.message)
        }
        res.json("insert oderitemtable success")
    })
}
//修改用户余额
module.exports.updateMoney = function (req, res) {
    db.updateDataById('customer', { balance: req.body.form.balance }, req.body.form.cid, function (err, result) {
        if (err) {
            return res.status(500).send("update failed")
        }
        // res.json("update success")
        where = 'cid = ' + req.body.form.cid
        db.selectById('customer', where, '*', function (err, result) {
            if (err) {
                return res.status(500).json('Server error')
            }
            res.json(result)
        })
    })

}
//修改积分
module.exports.updateIntegral = function (req, res) {
    db.updateDataById('customer', { integral: req.body.form.integral }, req.body.form.cid, function (err, result) {
        if (err) {
            return res.status(500).send("update failed")
        }
        // res.json("update success")
        where = 'cid = ' + req.body.form.cid
        db.selectById('customer', where, '*', function (err, result) {
            if (err) {
                return res.status(500).json('Server error')
            }
            res.json(result)
        })
    })

}
//查询地址表的信息
module.exports.getAddressByCId = function (req, res) {
    var sql = "SELECT address.addressId, address.cid, address.userName, address.userPhone,address.userAddress, address.isDefault FROM  address WHERE address.isDefault = '" + req.query.isDefault + "' AND address.cid = '" + req.query.cid + "'";
    db.selectAll(sql, function (err, result) {
        if (err) {
            return res.status(500).json('Server error')
        }
        res.json(result)
    })

}
/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑支垣写的↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/

