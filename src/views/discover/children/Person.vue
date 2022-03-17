<template>
  <div class="person">
    <!-- 轮播图 -->
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="180px">
        <el-carousel-item v-for="(item, index) in CarouselData" :key="index">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 推荐歌单 -->
    <div class="recommendMusicList">
      <h3 class="title2">推荐歌单<i class="iconfont icon-arrow-right"></i></h3>
      <ListCard
      type="person"
        class="con"
        :musicListData="musicList"
        @clickListCardItem="clickListCardItem"
      />
    </div>
  </div>
</template>

<script>
import ListCard from "../../../components/listCard/ListCard.vue";
export default {
  name: "Person",
  components: { ListCard },
  data() {
    return {
      // 轮播图的数据
      CarouselData: [],
      // 个性推荐页面展示的歌单的数据
      musicList: [],
    };
  },
  methods: {
    //获取轮播图数据
    async getCarouselData() {
      let result = await this.$request('/banner')
      this.CarouselData = result.data.banners;
    },
    //获取歌单数据
    async getMusicList() {
      let result = await this.$request('/personalized',{limit:10})
      this.musicList = result.data.result;
    },


    //点击歌单封面
    clickListCardItem(id) {
      console.log(id);
      console.log("我在那里");
    },
    //用全局事件总线进行通信
    getList(id) {
      // console.log(id);
    },
  },
  mounted() {
    //设置全局事件总线
    this.$bus.$on("getdata", this.getList);
  },
  created() {
    this.getCarouselData();
    this.getMusicList();
  },
};
</script>

<style>
.person {
  /* height: 100%; */
  padding: 0 20px;
  height: 588px;
  /* overflow-y: scroll; */
  /* background-color: cadetblue; */
  /* overflow-x: hidden; */
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.el-carousel {
  overflow: hidden;
  width: 85%;
}
.el-carousel__container {
  overflow: hidden;
  height: 200px;
}
.el-carousel__item,
el-carousel__item--card {
  border-radius: 10px;
}
.el-carousel-item {
  border-radius: 5%;
}
.el-carousel__item img {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  width: 100%;
  -webkit-border-radius: 10px;
  border-radius: 10px;

  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.el-carousel__indicators {
  height: 30px;
  line-height: 30px;
}
.recommendMusicList {
  /* padding-left: 7%; */
  width: 100%;
  line-height: 20px;
  /* background-color: cornflowerblue; */
}
.title2 {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
}
/* 这个是歌单 */
.con {
  /* background-color: rgb(150, 150, 245); */
  width: 100%;
}
</style>