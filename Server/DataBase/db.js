var mysql = require('mysql');

var dbConfig = require('./db.config');

var connection = mysql.createConnection(dbConfig);

function end() {
  connection.end();
}
/*根据传递过来的sql执行
  sql 查询语句
 */
let selectAll = (sql, callback) => {
  connection.query(sql, (err, result) => {
    if (err) {
      console.log('错误信息-', err.sqlMessage);
      let errNews = err.sqlMessage;
      callback(errNews, '');
      return;
    }
    var string = JSON.stringify(result);
    var data = JSON.parse(string);
    callback(null, data, end);
  })
}
/*根据字段和数据查询
    where  数组
    where_data 数组
    field 查询的字段
    var query = connection.query('SELECT * FROM users WHERE id = ?, name = ?', [userId, name], function(err, results) {
    // ...
    });
 */
let select = (table, where, where_data, field, callback) => {
  var _WHERE = '';
  for (var k in where) {
    _WHERE += where[k] + ' = ? and '
  }
  _WHERE = _WHERE.slice(0, -4);
  var sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _WHERE;
  connection.query(sql, where_data, (err, result) => {
    if (err) {
      console.log('错误信息-', err.sqlMessage);
      let errNews = err.sqlMessage;
      callback(errNews, '');
      return;
    }
    callback(null, result, end);
  })
}
/*根据选择的表进行初级分页
  table  表名
  field  选择的字段
  offset  偏移量
  limit   返回数量
 */
let selectByPagination = (table, field, offset, limit, callback) => {
  var sql = "SELECT " + field + " FROM " + table + ' limit ' + offset + ', ' + limit;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log('错误信息-', err.sqlMessage);
      let errNews = err.sqlMessage;
      callback(errNews, '');
      return;
    }
    callback(null, result, end);
  })
}
/*根据条件对相对应的表进行查询并进行分页
  table  表名
  field  选择的字段
  where   查询字段
  where_data   查询字段对应的数据
  like    模糊查询字段
  like_data   模糊查询字段对应的数据
  offset  偏移量
  limit   返回数量
 */
let selectByPaginationWhere = (table, where, where_data, like, like_data, field, offset, limit, callback) => {
  var Data = [];
  var sql = "";
  whereIsNull = (where != null && where_data != null);
  likeIsNull = (like != null && like_data != null);
  //对精准查询的字段进行拼接 
  if (whereIsNull) {
    var _WHERE = '';
    for (var k in where) {
      if (where[k].indexOf('FIND_IN_SET') !== -1) {
        _WHERE += where[k];
      } else if (where[k].search(/time/g) !== -1) {
        _WHERE += where[k] + ' between ? and ? and ';
      } else if (where[k].search(/(>|<)/g) !== -1) {
        _WHERE += where[k] + ' ? and ';
      } else if (where[k].indexOf('=') !== -1) {
        _WHERE += where[k];
      } else {
        _WHERE += where[k] + ' = ? and ';
      }
    }
    _WHERE = _WHERE.slice(0, -4);
  }

  //对模糊查询的字进行拼接
  if (likeIsNull) {
    var _LIKE = '';
    for (var k in like) {
      _LIKE += like[k] + ' like ? and '
    }
    _LIKE = _LIKE.slice(0, -4);

  }
  //对两种数据数据进行合并
  if (where_data != null && like_data != null) {
    Data = where_data.concat(like_data);
  } else if (where_data != null) {
    Data = where_data;
  } else if (like_data != null) {
    Data = like_data;
  }
  //对sql语句进行拼接
  if (whereIsNull && likeIsNull) {
    sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _WHERE + ' and ' + _LIKE + ' limit ' + offset + ', ' + limit;
  } else if (whereIsNull) {
    sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _WHERE + ' limit ' + offset + ', ' + limit;
  } else if (likeIsNull) {
    sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _LIKE + ' limit ' + offset + ', ' + limit;
  } else {
    sql = "SELECT " + field + " FROM " + table + ' limit ' + offset + ', ' + limit;
  }
  connection.query(sql, Data, (err, result) => {
    if (err) {
      console.log('错误信息-', err.sqlMessage);
      let errNews = err.sqlMessage;
      callback(errNews, '');
      return;
    }
    callback(null, result, end);
  })
}
/*根据条件对相对应的表进行查询
  table  表名
  field  选择的字段
  where   查询字段
  where_data   查询字段对应的数据
  like    模糊查询字段
  like_data   模糊查询字段对应的数据
 */
let selectByWhere = (table, where, where_data, like, like_data, field, callback) => {
  var Data = [];
  var sql = "";
  whereIsNull = (where != null && where_data != null);
  likeIsNull = (like != null && like_data != null);
  //对精准查询的字段进行拼接 
  if (whereIsNull) {
    var _WHERE = '';
    for (var k in where) {
      if (where[k].indexOf('FIND_IN_SET') !== -1) {
        _WHERE += where[k];
      } else if (where[k].search(/time/g) !== -1) {
        _WHERE += where[k] + ' between ? and ? and ';
      } else if (where[k].search(/(>|<)/g) !== -1) {
        _WHERE += where[k] + ' ? and ';
      } else if (where[k].indexOf('=') !== -1) {
        _WHERE += where[k];
      } else {
        _WHERE += where[k] + ' = ? and ';
      }
    }
    _WHERE = _WHERE.slice(0, -4);
  }
  //对模糊查询的字进行拼接
  if (likeIsNull) {
    var _LIKE = '';
    for (var k in like) {
      _LIKE += like[k] + ' like ? and '
    }
    _LIKE = _LIKE.slice(0, -4);

  }
  //对两种数据数据进行合并
  if (where_data != null && like_data != null) {
    Data = where_data.concat(like_data);
  } else if (where_data != null) {
    Data = where_data;
  } else if (like_data != null) {
    Data = like_data;
  }
  //对sql语句进行拼接
  if (whereIsNull && likeIsNull) {
    sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _WHERE + ' and ' + _LIKE;
  } else if (whereIsNull) {
    sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _WHERE;
  } else if (likeIsNull) {
    sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _LIKE;
  } else {
    sql = "SELECT " + field + " FROM " + table;
  }
  // console.log(sql);

  connection.query(sql, Data, (err, result) => {
    if (err) {
      console.log('错误信息-', err.sqlMessage);
      let errNews = err.sqlMessage;
      callback(errNews, '');
      return;
    }
    callback(null, result, end);
  })
}



let selectById = (table, id, field, callback) => {
  var _WHERE = '';
  if (id.toString().indexOf('=') != -1) {
    _WHERE = id;
  } else {
    _WHERE = getId(table) + '=' + id;
  }

  var sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _WHERE;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log('错误信息-', err.sqlMessage);
      let errNews = err.sqlMessage;
      callback(errNews, '');
      return;
    }
    callback(null, result, end);
  })
}
/*
  根据条件对表进行模糊查询数据
 */
let selectLike = (table, like, like_data, field, callback) => {
  var _WHERE = '';
  for (var k in like) {
    _WHERE += like[k] + ' like ? and '
  }
  _WHERE = _WHERE.slice(0, -4);
  var sql = "SELECT " + field + " FROM " + table + ' WHERE ' + _WHERE;
  connection.query(sql, like_data, (err, result) => {
    if (err) {
      console.log('错误信息-', err.sqlMessage);
      let errNews = err.sqlMessage;
      callback(errNews, '');
      return;
    }
    callback(null, result, end);
  })
}

// 插入一条数据
let insertData = (table, datas, callback) => {
  var fields = '';
  var values = '';
  //var a = true;
  for (var k in datas) {
    fields += k + ',';
    if (datas[k] == null) {
      values = values + datas[k] + ","
    } else {
      values = values + "'" + datas[k] + "',"
    }
  }
  fields = fields.slice(0, -1);
  values = values.slice(0, -1);
  console.log(sql)
  var sql = "INSERT INTO " + table + '(' + fields + ') VALUES(' + values + ')';

  connection.query(sql, callback, end);
}
// 更新表某行全部数据
let updateData = function (table, sets, callback) {
  var _SETS = '';
  var _WHERE = '';
  var keys = '';
  var values = '';
  for (var k in sets) {
    if (k == getId(table)) {
      _WHERE = getId(table) + '=' + sets[k];
    } else if (k == 'caid') {
      var temp = '';
      for (var i = 0; i < sets[k].length; i++) {
        temp += getCategory(sets[k][i]) + ','
      }
      temp = temp.slice(0, -1);
      _SETS += k + "='" + temp + "',";
    } else if (k == 'issell') {
      if (sets[k]) {
        _SETS += k + "='" + 1 + "',";
      } else {
        _SETS += k + "='" + 0 + "',";
      }
    } else {
      _SETS += k + "='" + sets[k] + "',";
    }
  }
  _SETS = _SETS.slice(0, -1);
  var sql = "UPDATE " + table + ' SET ' + _SETS + ' WHERE ' + _WHERE;
  connection.query(sql, callback, end);
}
// 更新表某行部分数据
let updateDataById = function (table, sets, where, callback) {
  var _SETS = '';
  var _WHERE = '';
  var keys = '';
  var values = '';
  var changeWhere = false;
  for (var k in sets) {
    if (k != getId(table)) {
      _SETS += k + "='" + sets[k] + "',";
    } else {
      _WHERE = getId(table) + '=' + sets[k]
      changeWhere = true;
    }
  }
  _SETS = _SETS.slice(0, -1);
  if (!changeWhere) {
    _WHERE = getId(table) + '=' + where
  }
  var sql = "UPDATE " + table + ' SET ' + _SETS + ' WHERE ' + _WHERE;
  console.log(sql)
  connection.query(sql, callback, end);
}
//自定义更新条件
let updateDataSelect = function (table, sets, where, callback) {
  var _SETS = '';
  var _WHERE = '';
  var keys = '';
  var values = '';

  for (var k in sets) {
    if (k != getId(table)) {
      _SETS += k + "='" + sets[k] + "',";
    }
  }
  _SETS = _SETS.slice(0, -1);
  _WHERE = where;
  var sql = "UPDATE " + table + ' SET ' + _SETS + ' WHERE ' + _WHERE;
  connection.query(sql, callback, end);
}

// 删除一条数据
let deleteData = function (table, where, callback) {
  var _WHERE = '';
  _WHERE = getId(table) + '=' + where
  var sql = "DELETE FROM " + table + ' WHERE ' + _WHERE;
  connection.query(sql, callback, end);
}

// 删除多条数据
let deleteDatas = function (table, where, callback) {
  var _WHERE = '';
  var _SETS = '(';
  for (var i in where) {
    _SETS += where[i] + ','
  }
  _SETS = _SETS.slice(0, -1) + ")";
  _WHERE = getId(table) + ' in ' + _SETS;
  var sql = "DELETE FROM " + table + ' WHERE ' + _WHERE;
  connection.query(sql, callback, end);
}


function getId(tableName) {
  switch (tableName) {
    case 'product':
      return 'pid';
    case 'cart':
      return 'ccid';
    case 'category':
      return 'caid';
    case 'color':
      return 'colid';
    case 'comment':
      return 'coid';
    case 'customer':
      return 'cid';
    case '`describe`':
      return 'descid';
    case 'detail':
      return 'did';
    case 'order':
      return 'oid';
    case 'orderitem':
      return 'oiid';
    case 'product':
      return 'pid';
    case 'size':
      return 'sid';
    case 'admin':
      return 'aid';
    case 'collect':
    return 'collectId';
    default:
      return 'id';
  }
}

function getCategory(category) {
  switch (category) {
    case "打底衫":
      return "1";
    case "长袖T恤":
      return "2";
    case "衬衫":
      return "3";
    case "夹克":
      return "4";
    case "卫衣":
      return "5";
    case "外套":
      return "6";
    case "毛衣":
      return "7";
    case "针织衫":
      return "8";
    case "短棉衣":
      return "9";
    case "长棉衣":
      return "10";
    case "毛呢大衣":
      return "11";
    case "短羽绒服":
      return "12";
    case "长羽绒服":
      return "13";
    case "短袖T恤":
      return "14";
    case "背心":
      return "15";
    case "马夹":
      return "16";
    case "短裤":
      return "17";
    case "七分裤":
      return "18";
    case "九分裤":
      return "19";
    case "长裤":
      return "20";
    case "工装裤":
      return "21";
    default:
      return "null";
  }
}

exports.select = select;
exports.selectAll = selectAll;
exports.selectByPagination = selectByPagination;
exports.selectByPaginationWhere = selectByPaginationWhere;
exports.selectByWhere = selectByWhere;
exports.selectLike = selectLike;
exports.insertData = insertData;
exports.deleteData = deleteData;
exports.deleteDatas = deleteDatas;
exports.updateData = updateData;
exports.selectById = selectById;
exports.updateDataById = updateDataById;
exports.updateDataSelect = updateDataSelect;

