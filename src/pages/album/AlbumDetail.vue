<template>
  <view>
    <view class="album_bg">
      <image mode="widthFix" :src="album.cover"></image>
      <view class="album_info">
        <view class="album_name">{{ album.name }}</view>
        <view class="album_btn">关注专辑</view>
      </view>
    </view>

    <!-- 专辑作者 -->
    <view class="album_author">
      <view class="album_author_info">
        <image mode="widthFix" :src="album.user.avatar"> </image>
        <view class="author_name">{{ album.user.name }}</view>
      </view>
      <view class="album_author_desc">
        <text>{{ album.desc }}</text>
      </view>
    </view>

    <!-- 列表开始 -->
    <view class="album_list">
      <view class="album_item" v-for="(item,index) in wallpaper" :key="item.id">
        <go-detail :list="wallpaper" :index='index'>
          <image mode="aspectFill" :src="item.imgUrl"></image>
        </go-detail>
      </view>
    </view>
  </view>
</template>

<script>
import GoDetail from '@/components/godetail/GoDetail'
export default {
  components:{
    GoDetail
  },
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        first: 1,
      },
      id: null,
      wallpaper: [],
      album: {},
      hasMore: true,
    };
  },
  onLoad(options) {
    this.id = options.id;
    this.getList();
  },
  onReachBottom() {
    if (this.hasMore) {
      this.params.skip += this.params.limit;
      this.getList();
    } else {
      uni.showToast({
        title: "没有更多数据了",
        icon: "none",
      });
    }
  },
  methods: {
    getList() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        data: this.params,
      }).then((result) => {
        if (Object.keys(this.album).length === 0) {
          this.album = result.res.album;
          this.params.first = 0;
        }
        result.res.wallpaper.map((item) => {
          item.imgUrl = item.thumb + item.rule.replace("$<Height>", 360);
        });
        if (result.res.wallpaper.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
        this.wallpaper = this.wallpaper.concat(result.res.wallpaper);
      });
    },
  },
};
</script>

<style lang="scss">
.album_bg {
  position: relative;
  image {
  }
  .album_info {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    height: 80rpx;
    align-items: center;
    color: #eee;
    .album_name {
      margin-left: 20rpx;
      font-size: 40rpx;
    }
    .album_btn {
      display: flex;
      background-color: $color;
      width: 150rpx;
      height: 60rpx;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
      padding: 0 15rpx;
      margin-right: 20rpx;
    }
  }
}
.album_author {
  padding: 10rpx;
  .album_author_info {
    padding: 10rpx;
    display: flex;
    align-items: center;
    image {
      width: 50rpx;
    }

    .author_name {
      color: black;
      margin-left: 15rpx;
    }
  }

  .album_author_desc {
    padding: 10rpx 20rpx;
    font-size: 32rpx;
  }
}
.album_list {
  display: flex;
  flex-wrap: wrap;
  .album_item {
    width: 33.33%;
    border: 1px solid #fff;
    image {
      height: 160rpx;
    }
  }
}
</style>
