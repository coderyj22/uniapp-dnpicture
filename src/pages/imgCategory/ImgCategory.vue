<template>
	<view>
		<view class="category-tab">
			<view class="category-title">
				<uni-segmented-control
					:values="items.map(x => x.title)"
					:current="currentItem"
					@clickItem="handleClickNavTitle"
					style-type="text"
					active-color="#d4237a"
				></uni-segmented-control>
			</view>
		</view>
		<scroll-view @scrolltolower="handleScrollLower" enable-flex scroll-y class="category_tab_content">
			<view class="cate-item" v-for="(item,index) in vertical" :key="item.id">
				<go-detail :list="vertical" :index="index">
				  <image mode="widthFix" @click="clickItemImg(item)" :src="item.thumb"></image>
				</go-detail>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import GoDetail from '@/components/godetail/GoDetail.vue';
import { uniSegmentedControl } from '@dcloudio/uni-ui';
export default {
	components: {
		uniSegmentedControl,
		GoDetail
	},
	onLoad(o) {
		this.id = o.id;
		this.getList();
		// console.log(o)
	},
	data() {
		return {
			items: [{ title: '最新', order: 'new' }, { title: '热门', order: 'hot' }],
			currentItem: 0,
			params: {
				limit: 30,
				skip: 0,
				order: 'new'
			},
			id: null,
			vertical: [], // 页面数据
			hasMore: true,
			newSkip: 0,
			hotSkip: 0
		};
	},
	methods: {
		async getList() {
			const result = await this.request({
				url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
				data: this.params
			});
			if (result.res.vertical.length === 0) {
				this.hasMore = false;
				uni.showToast({
					title: '我也是有底线的',
					icon: 'none'
				});
				return;
			}
			this.vertical = this.vertical.concat(result.res.vertical);
		},
		handleClickNavTitle({ currentIndex }) {
			if (this.currentItem === currentIndex) {
				return;
			}
			this.currentItem = currentIndex;
			this.params.order = currentIndex === 0 ? 'new' : 'hot';
			this.params.skip = 0;
			this.vertical = [];
			this.getList();
		},

		// 加载更多
		handleScrollLower() {
			if (this.hasMore) {
				this.params.skip += this.params.limit;
				this.getList();
			} else {
				uni.showToast({
					title: '我也是有底线的',
					icon: 'none'
				});
			}
		},
		clickItemImg(item) {
			console.log(item);
		}
	}
};
</script>

<style lang="scss">
.category-tab {
	width: 100%;
	display: flex;
	justify-content: center;
	.category-title {
		width: 50%;
	}
	.egmented-control__item {
		border: none !important;
	}
}
.category_tab_content {
	display: flex;
	flex-wrap: wrap;
	height: calc(100vh - 36px);
	.cate-item {
		width: 33.33%;
		border: 5rpx solid #fff;
		image {
		}
	}
}
</style>
