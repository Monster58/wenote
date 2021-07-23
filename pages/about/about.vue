<template>
	<view>

		<view class="user-info u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30">
			<view class="u-m-r-10">
				<u-avatar :src="vuex_user.avatarUrl" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">Hi! {{vuex_user.nickName? vuex_user.nickName: '未登录'}}</view>
				<!-- <view class="u-font-14 u-tips-color">微信号:{{vuex_user.nickName}}</view> -->
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
			<button v-if="!vuex_user" class="getuserinfo-btn" @click="wxGetUserInfo"></button>
		</view>


		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item @click="goHome" icon="rmb-circle" title="我发布的"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="star" title="我的收藏"></u-cell-item>
				<u-cell-item icon="heart" title="我的关注"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="设置"></u-cell-item>
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
			}
		}
	}
</script>

<style lang="scss">
	.user-info {
		position: relative;

		.getuserinfo-btn {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			border: 0;
			background-color: transparent;
		}
	}
</style>
