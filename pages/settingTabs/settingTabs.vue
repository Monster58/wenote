<template>
	<view class="content">

		<u-notice-bar mode="horizontal" :list="['拖动分类标签进行排序/左滑分类标签进行删除']"></u-notice-bar>
		<!-- 示例仅仅实现效果，实际上的按钮事件，需要在HM-dragSorts组件里去监听uni-swipe组件的事件，再去实现相关逻辑，这个需要自己写 -->
		<!-- 示例仅仅实现效果，实际上的按钮事件，需要在HM-dragSorts组件里去监听uni-swipe组件的事件，再去实现相关逻辑，这个需要自己写 -->
		<!-- 示例仅仅实现效果，实际上的按钮事件，需要在HM-dragSorts组件里去监听uni-swipe组件的事件，再去实现相关逻辑，这个需要自己写 -->

		<!-- 参数 
		* @property {ObjectArray} list = [] 列表数据,自定义数据，会传递到name="rowContent"插槽  
		* @property {Boolean} feedbackGeneratorState = [true|false] 是否开启拖动触感反馈  
		* @property {Boolean} isLongTouch = [true|false] 是否开启长按拖动  
		* @property {Number} longTouchTime = [] 选填,触发长按时长,单位:ms,默认350ms,不支持微信小程序 
		* @property {Number} listHeight = [] 选填,可拖动列表整体的高度,单位:px,默认等于窗口高度 
		* @property {Number} rowHeight = [] 必填,行高,单位:px,默认44px
		* @event {Function} change 行位置发生改变时触发事件 返回值:{index:'原始下标',moveTo:'被拖动到的下标',moveRow:'拖动行数据'}   
		* @event {Function} confirm 拖拽结束且行位置发生了改变触发事件 返回值:{index:'原始下标',moveTo:'被拖动到的下标',moveRow:'拖动行数据',list:'整个列表拖动后的数据'}  
		* @event {Function} onclick 点击行触发事件 返回值:{index:'被点击行下标',value:'被点击行数据'} 
		*/ 
		-->
		<!-- 当前属性设置 isLongTouch开启长按拖动 feedbackGeneratorState关闭触感反馈 rowHeight行高55 -->
		<HM-dragSorts v-if="list.length" :listHeight="listHeight" :list="list" :isLongTouch="true" :feedbackGeneratorState="false"
			:rowHeight="55" @change="change" @confirm="confirm" @onclick="onclick" @deleteTab="deleteTab">
			<template v-slot:rowContent="{row}">
				<view class="row">
					<!-- <image v-if="row.icon" class="icon" :src="row.icon"></image> -->
					<u-icon name="file-text"></u-icon>
					<text class="text">{{row.name}}</text>
				</view>
			</template>
		</HM-dragSorts>
		<u-empty v-else text="还没有创建分类" mode="list"></u-empty>


		<view class="tmp">
			<view class="btn">
				<u-button plain type="primary" :ripple="true" @click="addTabPopupShow = true">创建分类</u-button>
			</view>

			<view class="btn">
				<u-button @click="saveTabsChange" type="primary" :ripple="true">保存修改</u-button>
			</view>
		</view>
		<!-- 创建分类 -->
		<u-popup v-model="addTabPopupShow" mode="center" border-radius="14" closeable>
			<view class="add-tab-popup">
				<text>创建分类</text>
				<u-field v-model="tabName" placeholder="请填写分类名称" />
				<u-button type="primary" @click="addTab">确定</u-button>
			</view>
		</u-popup>
		
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
		<u-toast ref="globalUToast" />
	</view>
</template>
<script>
	import minix from '../../minix/index.js'
	import { nanoid } from 'nanoid/non-secure'
	export default {
		mixins: [minix],
		data() {
			return {
				/*
					0.数据结构说明 可以在结构中添加其他的数据，比如id,value等，不影响组件使用，拖动调整顺序后，组件会把传入的数据排序后原封不动在@confirm中返回。
					
					1.动态修改list数据，组件会响应变化，但拖动排序不会影响list，
					  所以，要特别注意，在动态修改list数据时候，由于组件内数据可能已经拖动重新排序过，页面的list顺序和组件内数据顺序不一致了，
					  最好在操作list时候，先和@confirm返回的值同步一下，或者直接操作@confirm返回的值，然后赋值给list。
					  
					n.最后，组件你下载了，代码你也看了，不给个五星好评，我可要打人了啊  (╬￣皿￣)=○  ヽ(#`Д´)ﾉ
				*/
				list: [],
				sortList: [],
				ispush: false,
				listHeight: 100,
				addTabPopupShow: false,
				tabName: ''
			}
		},
		onLoad() {
			let windowHeight = uni.getSystemInfoSync().windowHeight;
			let headerHeight = uni.upx2px(80);
			let tmpHeight = uni.upx2px(320);
			this.listHeight = windowHeight - headerHeight - tmpHeight;
			console.log("this.listHeight: ", this.listHeight);
			const that = this
			// 获取tabs
			uniCloud.callFunction({
				name: 'get-tabs',
				data: {
					_id: this.vuex_openid,
				},
				success(res) {
					if(res.result.code === 200){
						that.list = [...res.result.data.tabs]
						that.sortList = [...res.result.data.tabs]
					} else {}
				}
			});
		},
		onReady() {},
		methods: {
			addTab() {
				if (!this.tabName.trim()) {
					return uni.showToast({
						title: '请输入内容',
						icon: 'none',
						duration: 2000
					});
				}
				this.list = [...this.list, {
					name: this.tabName,
					id: nanoid()
				}]
				this.addTabPopupShow = false
				this.tabName = ''
			},
			saveTabsChange() {
				uniCloud.callFunction({
					name: 'update-tabs',
					data: {
						_id: this.vuex_openid,
						tabs: this.sortList
					},
					success(res) {
						if(res.result.code === 200) {
							uni.showToast({
								title: '保存成功',
								icon: 'none',
								duration: 2000
							});
						}
					}
				});
			},
			onclick(e) {
				console.log('=== onclick start ===');
				console.log("被点击行: " + JSON.stringify(e.value));
				console.log("被点击下标: " + JSON.stringify(e.index));
				console.log('=== onclick end ===');
			},
			change(e) {
				console.log('=== change start ===');
				console.log("被拖动行: " + JSON.stringify(e.moveRow));
				console.log('原始下标：', e.index);
				console.log('移动到：', e.moveTo);
				console.log('=== change end ===');
			},
			confirm(e) {
				console.log('=== confirm start ===');
				console.log("被拖动行: " + JSON.stringify(e.moveRow));
				console.log('原始下标：', e.index);
				console.log('移动到：', e.moveTo);
				console.log('移动后的数据：', e.list);
				this.sortList = e.list
				console.log(this.sortList)
				console.log('=== confirm end ===');
			},
			deleteTab(e) {
				const index = this.list.findIndex(item => {
					return e.row.id === item.id
				})
				this.list.splice(index,1)
			}
		},
		watch: {
			'list': function(){
				this.sortList = [...this.list]
			}
		}
	}
</script>
<style lang="scss" scoped>
	/deep/ .u-empty {
		min-height: 30vh;
	}
	.tmp {
		height: 320rpx;
		overflow: hidden
	}

	.btn {
		width: 80%;
		margin: 40rpx auto;
		height: 80rpx;
		color: white;
		text-align: center;
		line-height: 80rpx;
	}

	//scoped css只在当前页生效 不影响子组件
	page {
		background-color: #efeff4;
	}

	@media (prefers-color-scheme: dark) {
		page {
			background-color: #000000;
		}
	}

	.content {
		.row {
			display: flex;
			flex-direction: row;
			align-items: center;

			.icon {
				width: 30px;
				height: 30px;
				border-radius: 6px;
				margin-right: 13px;
			}

			u-icon {
				color: #2979ff;
				font-size: 16px;
				line-height: 1;
				display: inline-block;
				margin-right: 20rpx;
			}

			.text {
				font-size: 13px;
			}
		}
	}

	.add-tab-popup {
		padding: 30rpx 20rpx 20rpx;

		text {
			font-size: 16px;
			font-weight: bold;
		}

		/deep/ u-field {
			.u-field {
				padding: 20rpx 0;
				width: 450rpx;
			}

			.u-field-inner {
				.u-label {
					display: none;
				}

				input {
					background-color: #f3f3f3;
					padding: 20rpx;
					border-radius: 4px;
				}
			}
		}
	}
</style>
