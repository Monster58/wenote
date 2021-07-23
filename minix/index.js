// minix.js
const whitePages = [0, 4]
export default {
	data() {
		return {
			loginModal: false,
		}
	},
	methods: {
		toLogin() {
			uni.switchTab({
				url: '/pages/my/my'
			})
		},
		beforeSwitch(index) {
			return true
			/**
			 * 开发中页面
			 */
			// if (index === 3) {
			// 	this.$refs.globalUToast.show({
			// 		title: '页面开发中~'
			// 	})
			// 	return false
			// }
			// if (whitePages.includes(index)) {
			// 	return true
			// }
			// //提示登录
			// if (this.vuex_user) {
			// 	return true
			// } else {
			// 	this.loginModal = true
			// }
		}
	}
}
