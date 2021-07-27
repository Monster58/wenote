<template>
	<view>
		<view class="app-info">
			<view class="app-logo">
				<image src="../../static/logo.png" mode=""></image>
			</view>
			<view class="app-name">
				<text>
					微手记
				</text>
			</view>
			<view class="app-des">
				<text>
					个人博客笔记效率工具
				</text>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item @click="toPage('updateLog')" title="更新日志"></u-cell-item>
				<u-cell-item @click="toPage('agreement')" title="用户使用协议"></u-cell-item>
				<u-cell-item title="版本" :arrow="false">
					<text slot="right-icon">1.0.0</text>
				</u-cell-item>
			</u-cell-group>
		</view>

		<u-tabbar :list="vuex_tabbar" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
		<u-modal v-model="loginModal" :mask-close-able="true" :zoom="false" content="请先登录!" confirm-text="前往登录" @confirm="toLogin"></u-modal>
		<u-toast ref="globalUToast" />
	</view>
</template>

<script>
	import minix from '../../minix/index.js'
	export default {
		data() {
			return {}
		},
		mixins: [minix],
		onLoad() {},
		methods: {
			wxGetUserInfo(data) {
				const store = this.$store
				uni.getUserProfile({
					desc: 'Wexin', // 这个参数是必须的
					success: res => {
						const userObj = {
							openid: this.vuex_openid,
							...JSON.parse(res.rawData),
							favorites: [],
							follow: []
						}
						uniCloud.callFunction({
							name: 'add-user',
							data: userObj,
							success(res) {
								store.commit('$uStore', {
									name: 'vuex_user',
									value: userObj
								})
								store.commit('$uStore', {
									name: 'vuex_loginStatus',
									value: true
								})
							}
						});
					}
				})
			},
			goHome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			toPage(page){
				uni.navigateTo({
				    url: `/pages/${page}/${page}`
				});
			}
		}
	}
</script>

<style lang="scss">
	.app-info {
		margin: 60rpx auto;
		.app-logo {
			width: 120rpx;
			height: 120rpx;
			margin: 0 auto;
			border-radius: 50%;
			overflow: hidden;
			text-align: center;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.app-name {
			font-size: 18px;
			font-weight: bold;
		}
		.app-des {
			font-size: 12px;
			color: #6d6d6d;
		}
		.app-name,.app-des {
			display: flex;
			justify-content: center;
		}
	}
	.u-m-t-20 {
		width: 80vw;
		margin: 0 auto;
	}
</style>
