'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const articleCollection = db.collection('articles')
	const articleObj = await articleCollection.doc(event._id).get()
	//返回数据给客户端
	return {
		code: 200,
		data: articleObj.data[0],
		message: '获取成功'
	}
};
