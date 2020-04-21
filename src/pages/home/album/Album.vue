<template>
  <scroll-view @scrolltolower="handleToLower" scroll-y class="album_view">
    <view class="album_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>

    <!-- 列表 -->
    <view class="album_list">
      <navigator v-for="item in album" :key="item.id" class="album_list_item" :url="`/pages/album/AlbumDetail?id=${item.id}`">
        <view class="list-img">
          <image mode="aspectFill" class="img" :src="item.cover"></image>
        </view>
        <view class="list-detail">
          <view class="detail-title">{{ item.name }}</view>
          <view class="detail-info">{{ item.desc }}</view>
          <view class="detail-fav">
            <view class="fav-attention">+关注</view>
          </view>
        </view>
      </navigator>
    </view>
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
      },
      banner: [],
      album: [],
      hasMore:true
    };
  },
  mounted() {
    this.getAlbumData();
  },
  methods: {
    getAlbumData() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params,
      }).then((res) => {
        if (this.banner.length === 0) {
          this.banner = res.res.banner;
        }
        if(res.res.album.length === 0){
          return this.hasMore = false
        }
        this.album = [...this.album, ...res.res.album];
      });
    },
    // 上啦加载更多
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getAlbumData();
      } else {
        uni.showToast({
          title: "没有数据了",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss">
.album_view {
  height: calc(100vh - 36px);
}
.album_swiper {
  .swiper {
    width: 100%;
    height: calc(750rpx / 2.3);
    image {
      height: 100%;
    }
  }
}
.album_list {
  .album_list_item {
    padding: 30rpx 20rpx;
    border-bottom: 1rpx solid #eee;
    display: flex;
    .list-img {
      flex: 1;
      font-size: 0;
      .img {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .list-detail {
      flex: 2;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .detail-title {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 20rpx;
      }
      .detail-info {
        font-size: 30rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-bottom: 20rpx;
      }
      .detail-fav {
        display: flex;
        justify-content: flex-end;
        .fav-attention {
          display: inline-block;
          border: 1px solid $color;
          padding: 10rpx 15rpx;
          color: $color;
        }
      }
    }
  }
}
</style>
