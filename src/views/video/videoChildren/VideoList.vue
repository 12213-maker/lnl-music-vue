<template>
  <div class="content">
    <!-- 导航栏 -->
    <div class="navigation">
      <SortBox
        @getSortList="getSortList"
        @clickSortBoxItem="handlesortClick"
        :sortList="sortList"
        :currentTag="currentTag"
      />

      <SecondNavBar
        @clickSecondBarItem="handleSecondNavBarClick"
        :hotTags="hotTags"
        :currentTag="currentTag"
      />
    </div>
    <!-- 歌单list -->
    <div class="music_list">
      <ListCard
        type="video"
        :isLoad="true"
        :musicListData="MusicList"
        @isSortPopShow="handleisSortPopShow"
        @bottomLoad='bottomLoad'
      />
    </div>
  </div>
</template>

<script>
import ListCard from "@/components/listCard/ListCard.vue";
import SortBox from "@/components/sortBox/SortBox.vue";
import SecondNavBar from "@/components/secondNavBar/SecondNavBar.vue";
export default {
  name: "ViedeoList",
  components: { ListCard, SortBox, SecondNavBar },
  data() {
    return {
      //左边的标签汇总
      sortList: [],
      //九项热门标签
      hotTags: [],
      //歌单列表
      MusicList: [],
      //现在所处的视频界面
      currentTag: {},

      // 当前视频页数
      videoPage: 1,
      // 是否还有更多视频数据
      hasMore: true,
    };
  },
  methods: {
    //请求左边sort数据
    async getSortList() {
      const res = await this.$request("/video/group/list");
      this.sortList = res.data.data;
    },
    //请求九项hotTags数据
    async getlist() {
      const res = await this.$request("/video/category/list");
      this.hotTags = res.data.data;
      this.currentTag = res.data.data[0];
    },
    //获取歌单数据
    async getMusicInfo(id) {
      /* 这个接口一次只能返回八个数据 */
      let i = 2
      while(i){
        if(this.hasMore){
          const res = await this.$request(`/video/group?id=${id}&offset=${(this.videoPage-1)*8}`);
          this.hasMore = res.data.hasmore
          this.MusicList.push(...res.data.datas)
          this.videoPage += 1
          i--
        }else
        return;
        
      }
    },
    //sort中点击
    handlesortClick(item) {
      //要在这里处理currentTag
      this.currentTag = item;
      this.MusicList = [];
      this.getMusicInfo(this.currentTag.id);
    },

    //SecondNavBar中点击
    handleSecondNavBarClick(item) {
      this.currentTag = this.hotTags[item];
      this.MusicList = [];
      this.getMusicInfo(this.currentTag.id);
    },

    //歌单的自定义事件
    handleisSortPopShow(item) {
      console.log("歌单的自定义事件");
    },
    //懒加载
    bottomLoad(){
      if(this.hasMore){
        this.getMusicInfo(this.currentTag.id)
      }
    }
  },
  async created() {
    //要确认这些异步函数按照顺序执行,就要在前面加上await0
    await this.getSortList();
    await this.getlist();
    await this.getMusicInfo(this.currentTag.id);
  },
};
</script>

<style lang="less" scoped>
.content {
  // background-color: aquamarine;
  padding-bottom: 10px;
  navigation {
    // display: flex;
    // flex-direction: row;
    // justify-content: left;
    position: relative;
    .SortBox {
      position: absolute;
      top: 0;
      left: 0;
    }
    .SecondNavBar {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
</style>