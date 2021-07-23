'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const articleCollection = db.collection('articles')
	let params
	if (event.tabsId) {
		params = {
			tabsId: event.tabsId,
			openid: event.openid
		}
	} else {
		params = {
			openid: event.openid
		}
	}
	const articleListRes = await articleCollection.where(params).orderBy("createTime", "desc").skip(event
		.pageSize * (event.pageNum - 1)).limit(event.pageSize).get()
	//返回数据给客户端
	return {
		code: 200,
		data: articleListRes.data,
		message: '获取成功'
	}
};
