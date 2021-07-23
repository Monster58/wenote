'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const tabsCollection = db.collection('tabs')
	const tabsListRes = await tabsCollection.doc(event._id).get()
	return {
		code: 200,
		data: tabsListRes.data[0],
		message: '操作成功'
	}
};
