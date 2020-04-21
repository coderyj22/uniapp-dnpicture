<template>
	<view class="category">
		<navigator
		 :url="`/pages/imgCategory/ImgCategory?id=${item.id}`"
		 class="cate-item" v-for="item in category" :key="item.id">
			<image mode="aspectFill" :src="item.cover"></image>
			<view class="cate-name">{{ item.name }}</view>
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {
			category: []
		};
	},
	mounted() {
		this.getList();
	},
	methods: {
		getList() {
			this.request({
				url: 'http://157.122.54.189:9088/image/v1/vertical/category'
			}).then(res => {
				this.category = res.res.category;
				console.log(this.category);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.category {
	display: flex;
	flex-wrap: wrap;
	.cate-item {
		position: relative;
		width: 33.33%;
		border:5rpx solid #fff;
		image {
			height:240rpx;
		}
		.cate-name {
			position: absolute;
			width: 100%;
			height: 50rpx;
			left: 0;
			bottom: 0;
			color: #fff;
			// css3 渐变颜色
			background-image: linear-gradient(to right top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0));
			font-size: 40rpx;
			display: flex;
			align-items: center;
			padding-left: 20rpx;
			
		}
	}
}
</style>
