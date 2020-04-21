<template>
  <scroll-view
    @scrolltolower="handleToLower"
    scroll-y
    class="recommend_view"
    v-if="recommend.length > 0"
  >
    <!-- 推荐 -->
    <view class="recommend_wrap">
      <navigator
        class="recommend_item"
        v-for="item in recommend"
        :key="item.id"
        :url="`/pages/album/AlbumDetail?id=${item.target}`"
      >
        <image mode="widthFix" :src="item.thumb"></image>
      </navigator>
    </view>
    <!-- 月份 -->
    <view class="months_wrap">
      <view class="monthds_title">
        <view class="months_title_info">
          <view class="months_info">
            <text class="month_big"> {{ months.DD }} / </text>
            <text class="month_mini">{{ months.MM }} 月</text>
          </view>
          <view class="months_text"> 你负责美丽就好 </view>
        </view>
        <view class="months_title_more">更多 > </view>
      </view>
      <view class="months_content">
        <view
          class="months_item"
          v-for="(item, index) in months.items"
          :key="item.id"
        >
          <go-detail :list="months.items" :index="index">
            <image mode="aspectFill" :src="item.imgUrl"></image>
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门 -->
    <view class="hots_warp">
      <view class="hots_title">
        <text>热门</text>
      </view>
      <view class="hots_content">
        <view class="hot_item" v-for="(item,index) in hots" :key="item.id">
          <go-detail :list='hots' :index="index">
            <image mode="widthFix" :src="item.thumb"></image>
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import moment from "moment";
import GoDetail from "@/components/godetail/GoDetail";
export default {
  components: {
    GoDetail,
  },
  data() {
    return {
      recommend: [],
      months: {},
      hots: [],
      params: {
        limit: 30,
        order: "hot",
        skip: 0,
      },
      hasMore: true,
    };
  },
  mounted() {
    this.getList();
    // 修改页面的标题
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params,
      }).then((res) => {
        // 头部推荐模块
        if (this.recommend.length === 0) {
          this.recommend = res.res.homepage[1].items;
          this.months = res.res.homepage[2];
          this.months.MM = moment(this.months.stime).format("MM");
          this.months.DD = moment(this.months.stime).format("DD");
          this.months.items.map((item) => {
            item.imgUrl = item.img + item.rule.replace("$<Height>", 360);
          });
        }
        // 判断是否还有更多
        if (res.res.vertical.length === 0) {
          this.hasMore = false;
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
        // 热门
        this.hots = this.hots.concat(res.res.vertical);
        // this.hots = [...this.hots,...res.res.vertical];
      });
    },
    // 上啦加载更多
    handleToLower() {
      if (this.hasMore) {
        this.params.skip += this.params.limit;
        this.getList();
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
.recommend_view {
  height: calc(100vh - 36px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}
.months_wrap {
  width: 100%;
  .monthds_title {
    margin-top: 10rpx;
    padding: 10rpx 20rpx;
    display: flex;
    justify-content: space-between;
    .months_title_info {
      color: $color;
      font-size: 30rpx;
      display: flex;
      line-height: 42rpx;
      .months_info {
        font-size: 36rpx;
        .month_big {
          font-weight: bold;
          font-size: 36rpx;
        }
        .month_mini {
          font-size: 30rpx;
        }
      }
      .months_text {
        margin-left: 20rpx;
        color: $uni-text-color;
        font-size: 34rpx;
        font-weight: bold;
      }
    }
    .months_title_more {
      color: $color;
      font-size: 24rpx;
      line-height: 42rpx;
    }
  }

  .months_content {
    display: flex;
    flex-wrap: wrap;
    .months_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
.hots_warp {
  .hots_title {
    padding: 20rpx;
    text {
      padding-left: 20rpx;
      font-size: 24rpx;
      font-weight: 600;
      border-left: 20rpx solid $color;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
</style>
