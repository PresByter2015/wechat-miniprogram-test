<template>
  <div class="cnt">
    <div class="content">test</div>
    <wx-button type="primary" @click="getDataList">获取数据</wx-button>
    <block v-for="(item, index) in movieList" :key="item.id">
      <view
        @click="handleMovieChecked(item.id)"
        :class="{ active: item.checked }"
        >{{ index + 1 }}、{{ item.title }}
      </view>
    </block>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: '测试数据',
      movieList: []
    }
  },
  onLoad() {},
  methods: {
    getDataList() {
      wx.request({
        url: 'https://api.douban.com/v2/movie/top250', // 仅为示例，并非真实接口地址。
        data: {
          start: 0,
          count: 500,
          apikey: '0df993c66c0c636e29ecbb5344252a4a'
        },
        header: {
          'content-type': 'json' // 默认值
        },
        success: (res) => {
          console.log(res.data)
          //   this.text = "request success";
          this.movieList = res.data.subjects
        }
      })
    },
    handleMovieChecked(id) {
      this.movieList = this.movieList.map(v =>
        (v.id === id ? { ...v, checked: !v.checked } : { ...v })
      )
    }
  }
}
</script>

<style>
.active {
  color: red;
}
.cnt {
  margin-top: 20px;
}
a,
.content {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ddd;
}
</style>
