<template>
	<view class="video-play">
		<!-- 背景 -->
		<image class="bg-image" :src="videoObj.img"></image>
		<!-- 工具栏 -->
		<view class="video-tool">
			<view @click="muted = !muted" class="iconfont icon-shengyin" :class="muted ? 'icon-voice_stop' : 'icon-shengyin'"></view>
			<view class="iconfont icon-zhuanfa"><button open-type="share"></button></view>
		</view>

		<!-- 视频 -->
		<view class="video-wrap"><video :muted="muted" objectFit="fill" :src="videoObj.video"></video></view>

		<!-- 下载 -->
		<view @click="handleDownload" class="download"><view class="dowload-btn">下载高清</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			videoObj: {},
			// 是否静音
			muted: false
		};
	},
	onLoad() {
		this.videoObj = getApp().globalData.video;
	},
	methods: {
		async handleDownload() {
			uni.showLoading({
				title:"下载中"
			})
			const {tempFilePath} = (await uni.downloadFile({
				url: this.videoObj.video
			}))[1]
			await uni.saveVideoToPhotosAlbum({
				filePath:tempFilePath
			})
			uni.hideLoading({title:"下载成功"})
		}
	}
};
</script>

<style lang="scss" scoped>
.video-play {
	position: relative;
	.bg-image {
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		filter: blur(20px);
	}
	.video-tool {
		margin-top: 10rpx;
		height: 80rpx;
		display: flex;
		justify-content: flex-end;
		.iconfont {
			width: 80rpx;
			color: #fff;
			font-size: 50rpx;
			border-radius: 50%;
			background-color: rgba(0, 0, 0, 0.2);
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
		}
		.icon-zhuanfa {
			position: relative;
			button {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}
	}
	.video-wrap {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;

		video {
			width: 380rpx;
			height: 600rpx;
		}
	}
	.download {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		.dowload-btn {
			width: 360rpx;
			height: 80rpx;
			border-radius: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			border: 3rpx solid #fff;
			background-color: rgba(0, 0, 0, 0.5);
		}
	}
}
</style>
