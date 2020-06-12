<template>
  <view class="content">
    <view>
      <text class="title">{{ title }}</text>
    </view>
    <button type="primary" @click="getDataList">获取数据</button>
    <block v-for="(item, index) in movieList" :key="item.id">
      <view
        @click="handleMovieChecked(item.id)"
        :class="{ active: item.checked }"
        >{{ index + 1 }}、{{ item.title }}
      </view>
    </block>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "测试数据",
      movieList: []
    };
  },
  onLoad() {},
  methods: {
    getDataList() {
      uni.request({
        url: "https://api.douban.com/v2/movie/top250", //仅为示例，并非真实接口地址。
        data: {
          start: 0,
          count: 500,
          apikey: "0df993c66c0c636e29ecbb5344252a4a"
        },
        header: {
          "content-type": "json" // 默认值
        },
        success: res => {
          console.log(res.data);
          //   this.text = "request success";
          this.movieList = res.data.subjects;
        }
      });
    },
    handleMovieChecked(id) {
      this.movieList = this.movieList.map(v => {
        return v.id === id ? { ...v, checked: !v.checked } : { ...v };
      });
    }
  }
};
</script>

<style>
.active {
  color: red;
}
.content {
  text-align: center;
  height: 400upx;
}

.logo {
  height: 200upx;
  width: 200upx;
  margin-top: 200upx;
}

.title {
  font-size: 36upx;
  color: #8f8f94;
}
</style>
