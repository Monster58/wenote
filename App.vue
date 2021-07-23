<script>
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	export default {
		onLaunch: function() {
			console.log('App Launch')
			const store = this.$store
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					uniCloud.callFunction({
						name: 'getopenid',
						data: {
							code: loginRes.code
						},
						success(getopenidRes) {
							store.commit('$uStore', {
								name: 'vuex_openid',
								value: getopenidRes.result.openid
							})
						}
					});
				}
			});
			checkUpdate() //更新升级
		},
		mounted() {
			// #ifdef H5
			//const VConsole = require('@/common/js/vconsole.min.js')
			//new VConsole()
			// #endif
		},
		onShow: function() {},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";

	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	view {
		box-sizing: border-box;
	}

	@font-face {
		font-family: "iconfont";
		src: url('https://at.alicdn.com/t/font_2354462_s00xh8caffp.ttf');
	}

	.ico {
		font-family: iconfont;
	}
	
	/* #endif */
	.empty-tip {
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>