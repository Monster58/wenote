<template>
	<view>
		<u-field v-model="phone" label="手机号" placeholder="请填写手机号">
			<u-button size="medium" slot="right" type="primary" @click="phoneSearch">查询归属地</u-button>
		</u-field>
		<view class="content" v-if="Object.keys(result).length">
			<view class="province">
				省份： {{result.province}}
			</view>
			<view class="city">
				城市： {{result.city}}
			</view>
			<view class="areacode">
				区域号码： {{result.areacode}}
			</view>
			<view class="zip">
				邮编：{{result.zip}}
			</view>
			<view class="company">
				运营商：{{result.company}}
			</view>
		</view>
	</view>
</template>

<script>
	const PhoneRegExp = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
	const key = 'bded01147b670592b4d873ce8c1be09a'
	export default {
		data() {
			return {
				phone: '',
				result: {}
			}
		},
		methods: {
			phoneSearch() {
				if (PhoneRegExp.test(this.phone)) {
					uni.request({
						url: 'https://apis.juhe.cn/mobile/get',
						data: {
							phone: this.phone,
							key
						},
						success: (res) => {
							const {
								error_code,
								result,
								reason
							} = res.data
							if (error_code === 0) {
								this.result = result
							} else {
								uni.showToast({
									icon: 'none',
									title: reason
								})
							}
						}
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		margin: 30rpx auto;
		width: 94vw;
		box-shadow: 0 0 10px #d4d4d4;
		border-radius: 7rpx;
		padding: 20rpx;
	}
</style>
