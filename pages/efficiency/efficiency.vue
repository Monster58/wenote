<template>
	<view class="">
		<u-grid :col="3">
			<u-grid-item @click="toPage('phoneSearch')">
				<u-icon name="phone" :size="46"></u-icon>
				<view class="grid-text">归属地查询</view>
			</u-grid-item>
			<u-grid-item>
				<u-icon name="grid" :size="46"></u-icon>
				<view class="grid-text">更多功能敬请期待</view>
			</u-grid-item>
		</u-grid>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
		<u-modal v-model="loginModal" :mask-close-able="true" :zoom="false" content="请先登录!" confirm-text="前往登录" @confirm="toLogin"></u-modal>
		<u-toast ref="globalUToast" />
	</view>
</template>

<script>
	import minix from '../../minix/index.js'
	export default {
		mixins: [minix],
		methods: {
			toPage(page){
				uni.navigateTo({
				    url: `/pages/efficiency/${page}/${page}`
				});
			}
		}
	}
</script>

<style>
</style>
