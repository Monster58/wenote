<template>
	<view class="todo-page">
		待办事项
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
	</view>
</template>

<script>
	import minix from '../../minix/index.js'
	export default {
		mixins: [minix],
		data() {
			return {
			}
		},
		onShow() {
		},
		onPullDownRefresh() {
			//监听下拉刷新
			
		},
		onReachBottom() {
			// 监听触底操作
			
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	
</style>
