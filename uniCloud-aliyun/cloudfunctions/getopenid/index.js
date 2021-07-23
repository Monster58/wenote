'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let js_code = event.code
	const appid = 'wx50de00b1557d3ac1' //appid  
	const secret = '63341bf9a52635067d520ebd995c523c' //secret  
	const loginUrl = 'https://api.weixin.qq.com/sns/jscode2session'
	let res = await uniCloud.httpclient.request(loginUrl, {
		data: {
			appid: appid,
			secret: secret,
			js_code: js_code,
			grant_type: 'authorization_code'
		},
		dataType: 'json'
	})

	//返回数据给客户端
	return res.data
};
