'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const tabsCollection = db.collection('tabs')
	const updateTabsRes = await tabsCollection.doc(event._id).set({
		tabs: event.tabs
	})
	if (updateTabsRes.upsertedId || updateTabsRes.updated === 1) {
		return {
			code: 200,
			data: updateTabsRes,
			message: '操作成功'
		}
	} else {
		return {
			code: 500,
			data: updateTabsRes,
			message: '操作失败'
		}
	}
};
