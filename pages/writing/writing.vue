<template>
	<div class="writing-page">
		<u-form :model="form" ref="uForm">
			<u-form-item prop="title">
				<u-input v-model="form.title" type="text" :border="true" placeholder="请输入文章标题" />
			</u-form-item>
			<u-form-item>
				<div class="toolbar">
					<i class="iconfont icon-zitijiacu" :class="formats.bold ? 'ql-active' : ''"
						@click="format('bold')"></i>
					<i class="iconfont icon-zitixieti" :class="formats.italic ? 'ql-active' : ''"
						@click="format('italic')"></i>
					<i class="iconfont icon-zitixiahuaxian" :class="formats.underline ? 'ql-active' : ''"
						@click="format('underline')"></i>
					<i class="iconfont icon-zitishanchuxian" :class="formats.strike ? 'ql-active' : ''"
						@click="format('strike')"></i>
					<i class="iconfont icon-zuoduiqi" :class="formats.align === 'left' ? 'ql-active' : ''"
						@click="format('align','left')"></i>
					<i class="iconfont icon-juzhongduiqi" :class="formats.align === 'center' ? 'ql-active' : ''"
						@click="format('align','center')"></i>
					<i class="iconfont icon-youduiqi" :class="formats.align === 'right' ? 'ql-active' : ''"
						@click="format('align','right')"></i>
					<i class="iconfont icon-zuoyouduiqi" :class="formats.align === 'justify' ? 'ql-active' : ''"
						@click="format('align','justify')"></i>
					<i class="iconfont icon-line-height" :class="formats.lineHeight ? 'ql-active' : ''"
						@click="format('lineHeight','2')"></i>
					<i class="iconfont icon-Character-Spacing" :class="formats.letterSpacing ? 'ql-active' : ''"
						@click="format('letterSpacing','2em')"></i>
					<i class="iconfont icon-722bianjiqi_duanqianju" :class="formats.marginTop ? 'ql-active' : ''"
						@click="format('marginTop','20px')"></i>
					<i class="iconfont icon-723bianjiqi_duanhouju"
						:class="formats.micon-previewarginBottom ? 'ql-active' : ''"
						@click="format('marginBottom','20px')"></i>
					<i class="iconfont icon-clearedformat" @click="removeFormat"></i>
					<i class="iconfont icon-font" :class="formats.fontFamily ? 'ql-active' : ''"
						@click="format('fontFamily','Pacifico')"></i>
					<i class="iconfont icon-fontsize" :class="formats.fontSize === '24px' ? 'ql-active' : ''"
						@click="format('fontSize','24px')"></i>
					<i class="iconfont icon-text_color" :class="formats.color === '#0000ff' ? 'ql-active' : ''"
						@click="format('color','#0000ff')"></i>
					<i class="iconfont icon-fontbgcolor"
						:class="formats.backgroundColor === '#00ff00' ? 'ql-active' : ''"
						@click="format('backgroundColor','#00ff00')"></i>
					<i class="iconfont icon-date" @click="insertDate"></i>
					<i class="iconfont icon--checklist" @click="format('list','check')"></i>
					<i class="iconfont icon-youxupailie" :class="formats.list === 'ordered' ? 'ql-active' : ''"
						@click="format('list','ordered')"></i>
					<i class="iconfont icon-wuxupailie" :class="formats.list === 'bullet' ? 'ql-active' : ''"
						@click="format('list','bullet')"></i>
					<i class="iconfont icon-undo" @click="undo"></i>
					<i class="iconfont icon-redo" @click="redo"></i>
					<i class="iconfont icon-outdent" @click="format('indent','-1')"></i>
					<i class="iconfont icon-indent" @click="format('indent','+1')"></i>
					<i class="iconfont icon-fengexian" @click="insertDivider"></i>
					<i class="iconfont icon-charutupian" @click="insertImage"></i>
					<i class="iconfont icon-format-header-1" :class="formats.header === 1 ? 'ql-active' : ''"
						@click="format('header',1)"></i>
					<i class="iconfont icon-zitixiabiao" :class="formats.script === 'sub' ? 'ql-active' : ''"
						@click="format('script','sub')"></i>
					<i class="iconfont icon-zitishangbiao" :class="formats.script === 'super' ? 'ql-active' : ''"
						@click="format('script','super')"></i>
					<!-- <i class="iconfont icon-quanping"></i>-->
					<i class="iconfont icon-shanchu" @click="clear"></i>
					<i class="iconfont icon-direction-rtl" :class="formats.direction === 'rtl' ? 'ql-active' : ''"
						@click="format('direction','rtl')"></i>
				</div>
				<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"
					@statuschange="onStatusChange"></editor>
			</u-form-item>
			<!-- <u-form-item prop="publish">
				<u-checkbox-group>
					<u-checkbox v-model="form.publish">
						发布到微圈
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item> -->
			<u-form-item label="分类">
				<u-radio-group v-if="tabsList.length" v-model="tab">
					<u-radio v-for="(item, index) in tabsList" :key="index" :name="item.name" :disabled="item.disabled" shape="square">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
				<view v-else>
					分类未创建
				</view>
			</u-form-item>
			<u-form-item>
				<u-button @click="submit" type="primary">保存</u-button>
			</u-form-item>
		</u-form>
		<u-tabbar :list="vuex_tabbar" :mid-button="true" :before-switch="beforeSwitch"></u-tabbar>
		<u-toast ref="uToast" />
		<u-toast ref="globalUToast" />
	</div>
</template>

<script>
	import minix from '../../minix/index.js'
	export default {
		data() {
			return {
				form: {
					title: '',
					// publish: false,
				},
				editorCtx: null,
				placeholder: '开始输入...',
				formats: null,
				rules: {
					title: [{
						required: true,
						message: '请输入标题',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}]
				},
				tab: null,
				tabsList: []
			}
		},
		mixins: [minix],
		onLoad() {
			this.getTabs()
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onShow() {
			console.log('writing-onShow')
		},
		onHide() {
			console.log('writing-onHide')
		},
		methods: {
			onEditorReady() {
				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor').context((res) => {
					this.editorCtx = res.context
				}).exec()
				// #endif
			},
			onStatusChange(e) {
				this.formats = e.detail
			},
			format(name, value) {
				this.editorCtx.format(name, value)
			},
			removeFormat() {
				this.editorCtx.removeFormat()
			},
			insertDate() {
				const date = new Date()
				const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
				this.editorCtx.insertText({
					text: formatDate
				})
			},
			undo() {
				this.editorCtx.undo()
			},
			redo() {
				this.editorCtx.redo()
			},
			clear() {
				this.editorCtx.clear({
					success: function(res) {
						console.log("clear success")
					}
				})
			},
			insertDivider() {
				this.editorCtx.insertDivider({
					success: function() {
						console.log('insert divider success')
					}
				})
			},
			insertImage() {
				const that = this
				wx.chooseImage({
					count: 1,
					success: function() {
						that.editorCtx.insertImage({
							src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543767268337&di=5a3bbfaeb30149b2afd33a3c7aaa4ead&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fimages%2F20151031%2Ftooopen_sy_147004931368.jpg',
							data: {
								id: 'abcd',
								role: 'god'
							},
							success: function() {
								console.log('insert image success')
							}
						})
					}
				})
			},
			submit() {
				const currentTab = this.tabsList.find(item => item.name === this.tab)
				const that = this
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.editorCtx.getContents({
							success: function(data) {
								const {
									html,
									text
								} = data
								const {
									title,
								} = that.form
								uniCloud.callFunction({
									name: 'add-article',
									data: {
										openid: that.vuex_openid,
										title,
										html,
										text,
										tabsId: currentTab.id
									},
									success(res) {
										if (res.result.code === 200) {
											//保存成功
											that.$refs.uToast.show({
												title: res.result.message,
												type: 'success',
												isTab: true,
												url: '/pages/home/home'
											})
											that.initData()
										} else {
											that.$refs.uToast.show({
												title: res.result.message,
												type: 'error',
											})
										}
									}
								});
							}
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			initData() {
				this.form = {
					title: '',
					// publish: false,
				}
				this.clear()
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
							that.tabsList = res.result.data.tabs
						} else {}
					}
				});
			}
		}
	}
</script>

<style>
	@import url("./iconfont.css");

	.writing-page {
		padding: 10px;
	}

	.title-input {
		padding: 10px;
	}

	.container {
		padding: 10px;
	}

	.iconfont {
		display: inline-block;
		padding: 8px 8px;
		width: 37px;
		height: 37px;
		cursor: pointer;
		font-size: 20px;
	}

	.toolbar {
		box-sizing: border-box;
		/* border: 1px solid #ccc; */
		border-bottom: 0;
		font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
	}

	#editor {
		width: 100%;
		margin: 0 auto;
		height: 200px;
		background-color: #f7f7f7;
		padding: 10px;
	}

	.ql-active {
		color: #06c;
	}

	.u-form-item__message {
		padding-left: 0 !important;
	}
</style>
