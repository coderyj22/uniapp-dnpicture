<template>
	<scroll-view @scrolltolower="scrollToLower" scroll-y enable-flex class="video-main">
		<view @click="handleGoVideo(item)" class="video-item" v-for="item in videowp" :key="item.id">
			<image mode="widthFix" :src="item.img"></image>
		</view>
	</scroll-view>
</template>

<script>
// import GoDetail from '@/components/godetail/GoDetail.vue';
export default {
	components: {
		// GoDetail
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	// params: Object
	// limit: 30
	// order: "hot"
	// skip: 0
	// title: "热门"
	// url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp"
	data() {
		return {
			videowp: [],
			hasMore: true
		};
	},
	watch: {
		data(newValue, oldValue) {
			this.videowp = [];
			this.getList();
		}
	},
	mounted() {
		this.getList();
	},
	methods: {
		getList() {
			this.request({
				url: this.data.url,
				data: this.data.params
			}).then(res => {
				if (res.res.videowp.length === 0) {
					this.hasMore = false;
					uni.showToast({
						title: '我是有底线的',
						icon: 'none'
					});
					return;
				}
				this.videowp = [...this.videowp, ...res.res.videowp];
				console.log(this.videowp);
			});
		},
		scrollToLower() {
			if (this.hasMore) {
				this.data.params.skip += this.data.params.limit;
				this.getList();
			} else {
				uni.showToast({
					title: '我是有底线的',
					icon: 'none'
				});
			}
		},
		handleGoVideo(item){
			// 1.将数据存到全局属性中
			getApp().globalData.video = item
			uni.navigateTo({
				url:"/pages/videoPlay/VideoPlay"
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.video-main {
	display: flex;
	flex-wrap: wrap;
	height: calc(100vh - 36px);
	.video-item {
		width: 33.33%;
		border: 5rpx solid #fff;
	}
}
</style>
