<template>
	<view class="article-detail-page">
		<view class="article-area">
			<view class="article-title">{{article.title}}</view>
			<view class="article-info">
				<div class="article-time">
					{{article.createTime | dateFormat}}
				</div>
			</view>
			<view class="articel-content" v-html="article.html"></view>
		</view>
		<u-modal v-model="loginModal" :mask-close-able="true" :zoom="false" content="请先登录!" confirm-text="前往登录" @confirm="toLogin"></u-modal>
	</view>
</template>

<script>
	import minix from '../../minix/index.js'
	export default {
		data() {
			return {
				article: {
					
				}
			}
		},
		mixins: [minix],
		onLoad(option) {
			const {
				_id
			} = option
			uniCloud.callFunction({
				name: 'get-article-details',
				data: {
					_id,
					openid: this.vuex_openid,
				},
				success: res => {
					if (res.result.code === 200) {
						const article = res.result.data
						this.article = article
					}
				}
			});
		},
		methods: {}
	}
</script>

<style lang="scss">
	.article-detail-page {
		background-color: #fff;
		min-height: 100vh;

		.article-area {
			padding: 20rpx;
			background-color: #fff;
			margin-bottom: 8rpx;
		}
	}

	.article-title {
		font-size: 40rpx;
		font-weight: bold;
		padding: 0 0 20rpx;
	}

	.article-info {
		display: flex;
		align-items: center;
		.article-time {
			font-size: 24rpx;
			color: #ccc;
		}
	}
</style>
