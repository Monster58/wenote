<template>
	<view class="content">
		<u-time-line>
			<u-time-line-item>
				<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
				<template v-slot:content>
					<view>
						<view class="u-order-desc">微手记1.0.0版本</view>
						<view class="u-order-time">2021-07-26 22:30</view>
					</view>
				</template>
			</u-time-line-item>
		</u-time-line>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		width: 88vw;
		margin: 0 auto;
	}
</style>
