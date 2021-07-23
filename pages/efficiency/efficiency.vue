<template>
	<div>
		<h1>待办</h1>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
		<u-modal v-model="loginModal" :mask-close-able="true" :zoom="false" content="请先登录!" confirm-text="前往登录" @confirm="toLogin"></u-modal>
		<u-toast ref="globalUToast"/>
	</div>
</template>

<script>
	import minix from '../../minix/index.js'
	export default {
		mixins: [minix],
	}
</script>

<style>
</style>
