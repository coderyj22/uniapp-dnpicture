<template>
  <view>
    <uni-segmented-control
      :values="items.map((x) => x.title)"
      :current="currentItem"
      @clickItem="handleClickNavBarItem"
      style-type="text"
      active-color="#d4237a"
    ></uni-segmented-control>
    <view class="home_tab_content">
      <view v-show="currentItem === 0">
        <recommend></recommend>
      </view>
      <view v-show="currentItem === 1">
        <category></category>
      </view>
      <view v-show="currentItem === 2">
        <new></new>
      </view>
      <view v-show="currentItem === 3">
        <album></album>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import Category from "./category/Category";
import New from "./new/New";
import Album from "./album/Album";
import Recommend from "./recommend/Recommend";
//import uniBadge from '@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue' //也可使用此方式引入组件
export default {
  components: {
    Category,
    New,
    Album,
    Recommend,
    uniSegmentedControl,
  },
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      currentItem: 1,
    };
  },
  methods: {
    handleClickNavBarItem({ currentIndex }) {
      if (this.currentItem !== currentIndex) {
        this.currentItem = currentIndex;
      }
      console.log(currentIndex);
    },
  },

};
</script>

<style lang="scss">
.segmented-control__text {
  font-size: 15px !important;
}
</style>
