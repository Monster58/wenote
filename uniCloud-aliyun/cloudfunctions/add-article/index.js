'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const articleCollection = db.collection('articles')
	const createTime = Date.now()
	const res = await articleCollection.add({
		...event,
		createTime,
	})
	if (res.id) {
		return {
			code: 200,
			data: null,
			message: '添加成功'
		}
	} else {
		return {
			code: 500,
			data: null,
			message: '添加失败'
		}
	}

};
