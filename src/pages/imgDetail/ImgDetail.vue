<template>
	<view>
		<!-- 用户信息 -->
		<view class="user-info">
			<view class="user-icon"><image mode="widthFix" :src="imgDetail.user.avatar"></image></view>
			<view class="user-desc">
				<view class="user-name">{{ imgDetail.user.name }}</view>
				<view class="user-time">{{ imgDetail.cnTime }}</view>
			</view>
		</view>

		<!-- 高清大图 -->
		<view class="high-img">
			<swiper-action @swiperAction="handleSwiperAction">
				<!-- <swiper-action> -->
				<image mode="widthFix" :src="imgDetail.thumb"></image>
			</swiper-action>
		</view>

		<!-- 点赞收藏 -->
		<view class="user-rank">
			<view class="rank-collection">
				<text class="iconfont icon-dianzan">
					<text class="collection">{{ imgDetail.rank }}</text>
				</text>
			</view>
			<view class="rank-favorite">
				<text class="iconfont icon-shoucang"></text>
				<text class="favorite">收藏</text>
			</view>
		</view>

		<!-- 专辑 -->
		<view class="album-wrap" v-if="album.length">
			<view class="album-title">相关</view>
			<view class="album-list">
				<view class="album-item" v-for="item in album" :key="item.id">
					<view class="album-cover"><image mode="aspectFill" :src="item.cover"></image></view>
					<view class="album-info">
						<view class="album-info-text">专辑</view>
						<view class="album-name">{{ item.name }}</view>
						<text class="iconfont icon-youjiantou"></text>
					</view>
				</view>
			</view>
		</view>

		<!-- 最热评论 -->
		<view class="comment hot" v-if="hot.length">
			<view class="comment-title">
				<text class="iconfont icon-hot1"></text>
				<text class="comment-text">最热评论</text>
			</view>
			<view class="comment-list">
				<view class="comment-item" v-for="item in hot" :key="item.id">
					<!-- 用户信息 -->
					<view class="comment-user">
						<!-- 用户头像 -->
						<view class="user-icon"><image mode="widthFix" :src="item.user.avatar"></image></view>
						<!-- 用户名称 -->
						<view class="user-name">
							<view class="name">{{ item.user.name }}</view>
							<view class="time">{{ item.cnTime }}</view>
						</view>
						<!-- 用户徽章 -->
						<view class="user-badge"><image v-for="badge in item.user.title" :key="badge.icon" :src="badge.icon"></image></view>
					</view>
					<!-- 评论数据 -->
					<view class="comment-desc">
						<view class="comment-content">{{ item.content }}</view>
						<view class="comment-like">
							<text class="iconfont icon-dianzan">{{ item.size }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 最新评论 -->
		<view class="comment new" v-if="commnet.length">
			<view class="comment-title">
				<text class="iconfont icon-chat"></text>
				<text class="comment-text">最新评论</text>
			</view>
			<view class="comment-list">
				<view class="comment-item" v-for="item in comment" :key="item.id">
					<!-- 用户信息 -->
					<view class="comment-user">
						<!-- 用户头像 -->
						<view class="user-icon"><image mode="widthFix" :src="item.user.avatar"></image></view>
						<!-- 用户名称 -->
						<view class="user-name">
							<view class="name">{{ item.user.name }}</view>
							<view class="time">{{ item.cnTime }}</view>
						</view>
						<!-- 用户徽章 -->
						<view class="user-badge"><image v-for="badge in item.user.title" :key="badge.icon" :src="badge.icon"></image></view>
					</view>
					<!-- 评论数据 -->
					<view class="comment-desc">
						<view class="comment-content">{{ item.content }}</view>
						<view class="comment-like">
							<text class="iconfont icon-dianzan">{{ item.size }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="download">
			<view class="download-btn" @click="handleDownLoad">下载图片</view>
		</view>
	
	</view>
</template>

<script>
import SwiperAction from '@/components/swiperAction/SwiperAction';
import moment from 'moment';
moment.locale('zh-cn');
export default {
	// components:{
	// },
	components: {
		SwiperAction
	},
	data() {
		return {
			imgDetail: {},
			album: [],
			hot: [],
			comment: [],
			// 图片的索引
			imgIndex: 0
		};
	},
	onLoad() {
		const { imgIndex } = getApp().globalData;
		this.imgIndex = imgIndex;
		this.getData();
	},
	methods: {
		getData() {
			const { imgList } = getApp().globalData;
			this.imgDetail = imgList[this.imgIndex];
			this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
			// 获取图片详情的id
			this.getComments(this.imgDetail.id);
		},
		getComments(id) {
			this.request({
				url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
			}).then(result => {
				this.album = result.res.album;
				// 给hot数组对象添加一个时间属性
				result.res.hot.map(item => (item.cnTime = moment(item.atime * 1000).fromNow()));
				result.res.comment.forEach(item => (item.cnTime = moment(item.atime * 1000).fromNow()));
				this.hot = result.res.hot;
				this.comment = result.res.comment;
			});
		},
		// 滑动事件
		handleSwiperAction(e) {
			const { imgList } = getApp().globalData;
			if (e.direction === 'left' && this.imgIndex < imgList.length-1) {
				this.imgIndex += 1;
				this.getData();
			} else if (e.direction === 'right' && this.imgIndex > 0) {
				this.imgIndex -= 1;
				this.getData();
			} else {
				uni.showToast({
					title: '到底了',
					icon: 'none'
				});
			}
		},
		// 下载图片
		async handleDownLoad(){
			// uni.downloadFile()
			// uni.saveImageToPhotosAlbum
			await uni.showLoading({
				title:"下载中"
			})
			const result = await uni.downloadFile({
				url:this.imgDetail.img,
			})
			const {tempFilePath} = result[1]
			// 2. 将小程序中的临时文件下载到本地上
			const img = await uni.saveImageToPhotosAlbum({
				filePath:tempFilePath
			})
			// // 3. 提示用户下载成功
			uni.hideLoading()
			await uni.showToast({
				title:"下载成功"
			})
		}
	}
};
</script>

<style scoped lang="scss">
.user-info {
	display: flex;
	padding: 20rpx;
	.user-icon {
		padding: 0 20rpx;
		image {
			width: 88rpx;
			border-radius: 50%;
		}
	}
	.user-desc {
		.user-name {
			color: black;
			font-weight: bold;
		}
		.user-time {
			padding: 10rpx 0;
			color: #ccc;
			font-size: 24rpx;
		}
	}
}
.high-img {
	image {
		border-bottom: 1prx solid #eee;
	}
}
.user-rank {
	display: flex;
	align-items: center;
	padding: 15rpx 0;
	border-bottom: 5rpx solid #ccc;
	.rank-collection {
		width: 50%;
		text-align: center;
		.collection {
			margin-left: 10rpx;
		}
	}
	.rank-favorite {
		width: 50%;
		text-align: center;
		.favorite {
			margin-left: 10rpx;
		}
	}
}
.album-wrap {
	.album-title {
		padding: 10rpx 20rpx 0 20rpx;
	}
	.album-list {
		.album-item {
			display: flex;
			border-bottom: 10rpx solid #eee;
		}
		.album-cover {
			padding: 20rpx;
			image {
				width: 180rpx;
				height: 180rpx;
			}
		}
		.album-info {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 20rpx 0;
			.album-info-text {
				width: 100rpx;
				height: 50rpx;
				background-color: $color;
				color: #fff;
				padding: 10rpx 15rpx;
				display: flex;
				align-items: center;
			}
			.album-name {
				margin-top: 20rpx;
			}
			.icon-youjiantou {
				position: absolute;
				font-size: 40rpx;
				top: 50%;
				transform: translateY(-50%);
				right: 10%;
				color: black;
			}
		}
	}
}
.comment {
	.comment-title {
		padding: 15rpx;
		display: flex;
		align-items: center;
		.iconfont {
			color: red;
			font-size: 40rpx;
		}
		.comment-text {
			font-size: 28rpx;
			color: #666;
			margin-left: 10rpx;
			font-weight: bold;
		}
	}
	.comment-list {
		.comment-item {
			border-bottom: 15rpx solid #eee;
			display: flex;
			flex-direction: column;
			padding: 20rpx 20rpx 0 20rpx;
			// 用户信息
			.comment-user {
				display: flex;
				.user-icon {
					width: 15%;
					display: flex;
					justify-content: center;
					align-items: center;
					image {
						width: 90%;
					}
				}
				.user-name {
					flex: 1;
					margin-left: 10rpx;
					.name {
						color: #777;
					}
					.time {
						color: #ccc;
						font-size: 24rpx;
						padding: 5rpx 0;
					}
				}
				.user-badge {
					image {
						width: 40rpx;
						height: 40rpx;
						display:inline-block;
					}
				}
			}
			// 评论数据
			.comment-desc {
				display: flex;
				padding: 30rpx 0;
				.comment-content {
					flex: 1;
					padding-left: 15%;
					color: black;
				}
				.comment-like {
					text-align: right;
				}
			}
		}
	}
}
.download{
	height:120rpx;
	display:flex;
	justify-content: center;
	align-items:center;
	.download-btn{
		width:90%;
		height:80%;
		color:#fff;
		background-color: $color;
		font-size: 50rpx;
		font-weight: bold;
		display: flex;
		justify-content: center;
		align-items:center;
		
		
	}
}
</style>
