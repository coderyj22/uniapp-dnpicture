<template>
	<view @touchstart="handleTouchStart" @touchend="handleTouchEnd"><slot></slot></view>
</template>

<script>
export default {
	data() {
		return {
			touchStart: {
				startX: 0,
				startY: 0,
				startTime: 0
			}
		};
	},
	methods: {
		handleTouchStart(e) {
			const touch = e.changedTouches[0];
			this.touchStart.startX = touch.clientX;
			this.touchStart.startY = touch.clientY;
			this.touchStart.startTime = e.timeStamp;
		},
		handleTouchEnd(e) {
			const endX = e.changedTouches[0].clientX;
			const endY = e.changedTouches[0].clientY;
			const endTime = e.timeStamp;
			const touch = this.touchStart;
			if (endTime - touch.startTime > 2000) {
				return;
			}
			let direction = '';
			if (!Math.abs(endX - touch.startX) > 10) {
				return;
			}
			const deltaX = endX - this.touchStart.startX
			const deltaY = endY - this.touchStart.startY
			if(Math.abs(deltaY) > Math.abs(deltaX) ){
				console.log('不切换')
				return 
			}
			direction = endX - touch.startX > 0 ? 'right' : 'left';
			console.log(direction);
			this.$emit('swiperAction', { direction });
			this.touchStart = {};
		}
	}
};
</script>

<style></style>
