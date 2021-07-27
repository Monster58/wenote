<template>
	<div class="weiji-page">
		<u-sticky>
			<view class="sticky-container">
				<u-tabs v-if="reRenderTabsBar" :list="tabsList" :is-scroll="true" :current="currentTab"
					@change="tabsChanged"></u-tabs>
				<view class="tabs-setting" @click="settingTabs">
					<u-icon name="setting-fill"></u-icon>
				</view>
			</view>
		</u-sticky>
		<div class="article-list" v-if="articleList.length">
			<div class="article-item" v-for="articleItem in articleList" :key="articleItem._id"
				@click="articleDetail(articleItem._id)">
				<div class="article-info">
					<div class="article-title">{{articleItem.title}}</div>
				</div>
				<div class="content">
					<div class="article-abstract">
						{{articleItem.text}}
					</div>
				</div>
				<div class="time">{{articleItem.createTime | dateFormat}}</div>
			</div>
			<u-loadmore :status="loadMoreStatus" @loadmore="loadmoreFun" />
		</div>
		<div v-else class="empty-tip">
			<u-empty text="您还没发布笔记" mode="list">
			</u-empty>
			<u-button @click="goWriting">去发布</u-button>
		</div>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
		<u-toast ref="globalUToast" />
	</div>
</template>

<script>
	import minix from '../../minix/index.js'
	export default {
		data() {
			return {
				tabsList: [{
					name: '全部'
				}, ],
				currentTab: 0,
				tabsId: 0,
				articleList: [],
				currentPageNum: 1,
				loadMoreStatus: 'loadmore',
				reRenderTabsBar: true
			}
		},
		mixins: [minix],
		onShow() {
			if (this.vuex_openid) {
				this.getArticleList({
					pageSize: 10,
					pageNum: 1
				})
				this.getTabs()
			}
		},
		onPullDownRefresh() {
			//监听下拉刷新
			this.getArticleList({
				pageSize: 10,
				pageNum: 1
			}, () => {
				uni.stopPullDownRefresh()
				this.currentPageNum = 1
			})
			this.loadMoreStatus = 'loadmore'
		},
		onReachBottom() {
			// 监听触底操作
			this.loadmoreFun()
		},
		methods: {
			tabsChanged(index) {
				console.log('===================');
				console.log('index', index);
				console.log('===================');
				this.currentTab = index;
			},
			getArticleList(params, callback, type) {
				const that = this
				const {
					pageSize,
					pageNum
				} = params
				uniCloud.callFunction({
					name: 'get-article-list',
					data: {
						tabsId: that.tabsList[that.currentTab].id,
						openid: that.vuex_openid,
						pageSize,
						pageNum
					},
					success(res) {
						if (res.result.code === 200) {
							if (type && type === 'loadmore') {
								that.articleList = [...that.articleList, ...res.result.data]
								that.loadMoreStatus = 'loadmore'
							} else {
								that.articleList = res.result.data
							}
							callback && callback()
							if (!res.result.data.length) that.loadMoreStatus = 'nomore'
						}
					}
				});
			},
			upDateLike(type, id) {
				console.log('===================');
				console.log(type, id);
				console.log('===================');
			},
			goWriting() {
				uni.switchTab({
					url: '/pages/writing/writing'
				})
			},
			loadmoreFun() {
				if (this.loadMoreStatus === 'nomore') return
				this.loadMoreStatus = 'loading'
				const currentPageNum = ++this.currentPageNum
				this.getArticleList({
					pageSize: 10,
					pageNum: currentPageNum
				}, null, 'loadmore')
			},
			articleDetail(_id) {
				uni.navigateTo({
					url: `/pages/articleDetail/articleDetail?_id=${_id}`
				})
			},
			settingTabs() {
				// uni.navigateTo({
				// 	url: `/pages/settingTabs/settingTabs`
				// })
				uni.switchTab({
					url: `/pages/settingTabs/settingTabs`
				})
			},
			getTabs() {
				const that = this
				// 获取tabs
				uniCloud.callFunction({
					name: 'get-tabs',
					data: {
						_id: this.vuex_openid,
					},
					success(res) {
						if (res.result.code === 200) {
							that.tabsList = [{
								name: '全部'
							}, ...res.result.data.tabs]
						} else {}
					}
				});
			}
		},
		watch: {
			'vuex_openid': function(_) {
				this.getArticleList({
					pageSize: 10,
					pageNum: 1
				})
				this.getTabs()
			},
			'currentTab': function() {
				this.getArticleList({
					pageSize: 10,
					pageNum: 1
				})
			},
			'tabsList': function(newVal,oldVal) {
				if(JSON.stringify(newVal) !== JSON.stringify(oldVal)){
					this.reRenderTabsBar = false
					this.$nextTick(() => {
						this.reRenderTabsBar = true;
					});
				}
			}
		}
	}
</script>

<style lang="scss">
	.weiji-page {
		background-color: #f4f4f4;
		min-height: 100vh;

		.sticky-container {
			width: 100%;
			display: flex;
			align-items: center;
			flex: 1;
			position: relative;
			border-bottom: 1px solid #f7f7f7;
			background: #fff;
			margin-bottom: 6px;

			u-tabs {
				width: 86%;

				/deep/ .u-tabs {
					background: transparent !important;
				}
			}

			.tabs-setting {
				width: 14%;
				height: 100%;
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 40rpx;
				color: #C0C0C0;
				background-color: #fff;
				box-shadow: -4px -2px 5px #d0d0d047;
			}
		}

		.article-item {
			background-color: #fff;
			padding: 6px 10px;
			margin-bottom: 6px;

			.article-info {
				display: flex;
				align-items: center;

				.article-title {
					font-weight: bold;
					font-size: 32rpx;
					text-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}

			.article-abstract {
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 4;
				-webkit-box-orient: vertical;
			}

			.time {
				font-size: 24rpx;
				color: #959595;
			}
		}
	}
</style>
