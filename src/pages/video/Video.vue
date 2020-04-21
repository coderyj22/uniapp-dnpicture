<template>
	<view class="video">
		<uni-segmented-control :current="currentNavItem" :values="navItems.map(t => t.title)" @clickItem="onClickNavItem" style-type="text" active-color="#d52a7e" />
		<view class="video-content">
			<view class="video-normalize" v-if="currentNavItem !== 4">
				<!-- 显示前4个 -->
				<video-main :data="navItems[currentNavItem]"></video-main>
			</view>
			<view class="video-category" v-else><video-category></video-category></view>
		</view>
	</view>
</template>

<script>
import { uniSegmentedControl } from '@dcloudio/uni-ui';
import VideoCategory from './videoCategory/VideoCategory';
import VideoMain from './videoMain/VideoMain';
export default {
	components: {
		uniSegmentedControl,
		VideoCategory,
		VideoMain
	},
	name: 'Video',
	data() {
		return {
			navItems: [
				{
					title: '推荐',
					url: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured',
					params: {
						limit: 30,
						skip: 0,
						order: 'hot'
					}
				},
				{
					title: '娱乐',
					url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',
					params: {
						limit: 30,
						skip: 0,
						order: 'new'
					}
				},
				{
					title: '最新',
					url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
					params: {
						limit: 30,
						skip: 0,
						order: 'new'
					}
				},
				{
					title: '热门',
					url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
					params: {
						limit: 30,
						skip: 0,
						order: 'hot'
					}
				},
				{
					title: '分类',
					url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category'
				}
			],
			currentNavItem: 0
		};
	},
	methods: {
		onClickNavItem({ currentIndex }) {
			this.currentNavItem = currentIndex;
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
