var nodemailer = require("nodemailer");
module.exports = function (email){
	return new Promise((resolve,reject)=>{
		 //配置邮件服务器连接信息
	    let transporter = nodemailer.createTransport({
	        service:"163",  //  邮箱
	        secure:true,    //  安全的发送模式
	        auth:{
	            user:"zebintsang@163.com", //  全局变量
	            pass:"zhengzebin98"//  授权码
	        }
	    })

	    var str = randomSum(6);  
	    //配置邮件选项
	    let mailOptions = {
	        from:"zebintsang@163.com",
	        to:email,
	        subject:"邮箱验证码是：" + str,
	        html:'<div style="text-align:center;BORDER-TOP: #e2e2e2 1px solid; HEIGHT: auto; FONT-FAMILY: "microsoft yahei"; BORDER-RIGHT: #e2e2e2 1px solid; WIDTH: 648px; BACKGROUND: #fff; BORDER-BOTTOM: #e2e2e2 1px solid; PADDING-BOTTOM: 0px; PADDING-TOP: 30px; PADDING-LEFT: 30px; BORDER-LEFT: #e2e2e2 1px solid; MARGIN: 20px auto; PADDING-RIGHT: 30px; border-radius: 4px"><div style="HEIGHT: 60px; WIDTH: 100%; COLOR: #303030; border-top-left-radius: 4px; border-top-right-radius: 4px"><h2 style="FONT-SIZE: 20px; FONT-WEIGHT: normal; COLOR: #303030; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; MARGIN: 0px; PADDING-RIGHT: 0px">亲爱的<a style="TEXT-DECORATION: none; COLOR: #303030">'+ email +'</a>，您好！</h2><p>您此次邮箱注册的验证码如下,请在30分钟内输入验证码进行下一步操作，如非您本人操作，请忽略此邮件。</p></div><div style="FONT-SIZE: 14px; COLOR: #818181; PADDING-TOP: 36px"><a style="FONT-SIZE: 24px; MARGIN-BOTTOM: 6px; TEXT-DECORATION: none; HEIGHT: 52px; WIDTH: 200px; BACKGROUND: #169bd5; COLOR: #fff !important; TEXT-ALIGN: center; DISPLAY: inline-block; LINE-HEIGHT: 52px; border-radius: 4px">'+ str +'</a><p></p></div></div>'
	    }
	    transporter.sendMail(mailOptions,(err,data) => {
	        if(err){
	            reject(false);            
	        }else{
	            resolve({'AuthCode':str,'Email':email});          
	        }
	    })
	})
}




/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
*/
 
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
 
    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}

function randomSum(max){
	var Num=""; 
	for(var i=0;i<max;i++) 
	{ 
	Num+=Math.floor(Math.random()*10); 
	} 
	return Num;
}

//发送
    
	// send(mailOptions)
	// 	.then(data=>{
	// 		console.log(data);
	//     	return data;
	// 	},data=>{
	// 		console.log(data);
	// 		return data;
	// 	})
    

 //    function send(mailOptions){
 //    	return new Promise((resolve,reject)=>{
	//         transporter.sendMail(mailOptions,(err,data) => {
	// 	        if(err){		            
	// 	            reject(false);            
	// 	        }else{		            
	// 	            resolve(true);
	// 	        }
	//     	})
 //    	})
	// }