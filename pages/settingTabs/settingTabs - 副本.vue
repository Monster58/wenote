<template>
	<view>
		<u-notice-bar mode="horizontal" :list="['拖动分类标签进行排序/点击分类标签删除']"></u-notice-bar>
		<drag-sorts :list="list" :props="props" @change="SortChange"></drag-sorts>
	</view>
</template>

<script>
	import dragSorts from '@/components/drag-sorts/index.vue'
	export default {
		components: {
			
			dragSorts
		},
		data() {
			return {
				// 对应需要显示的标题
				props: {
					label: 'label'
				},
				list: [{
						label: '标题标题标题1'
					},
					{
						label: '标题2'
					},
					{
						label: '标题标题3'
					},
					{
						label: '标题4'
					},
					{
						label: '标题5'
					},
					{
						label: '标题6'
					},
					{
						label: '标题标题标题标题7'
					},
					{
						label: '标题8'
					},
					{
						label: '标题9'
					},
					{
						label: '标题10'
					},
					{
						label: '标题11'
					},
					{
						label: '标题12'
					},
					{
						label: '标题13'
					},
				]
			}
		},
		methods: {
			SortChange(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	.title {
		text-align: center;
		color: #ccc;
		padding: 20upx;
		background: #EEEEEE;
		margin-bottom: 10px;
		font-size: 14px;
	}

	.footer {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		width: 100%;
	}

	.footer image {
		height: 100%;
		width: 100%;
	} 
</style>
