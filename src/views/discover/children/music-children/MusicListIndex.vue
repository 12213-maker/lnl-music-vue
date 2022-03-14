<template>
  <div class="musicListIndex">
    <!-- 精选歌单入口展示 -->
    <div class="highqualityEntry" @click="highqualitylist">
      <img :src="theFirstOfHighquality.coverImgUrl" class="backgroundImg" />
      <!-- 图片 -->
      <div class="cover">
        <img :src="theFirstOfHighquality.coverImgUrl" alt="" />
      </div>
      <!-- 信息 -->
      <div class="EntryInfo">
        <div class="tag"><i class="iconfont icon-good"></i>精选歌单</div>
        <div class="name">{{ theFirstOfHighquality.name }}</div>
        <div class="desc">{{ theFirstOfHighquality.copywriter }}</div>
      </div>
    </div>

    <!-- 歌单列表 -->
    <div class="musicListNavBar">
      <!-- 左边 -->
      <div class="left">
        <SortBox
          :currentTag="currentTag"
          :sortList="sortList"
          @getSortList="getSortList"
          @clickSortBoxItem="clickSortBoxItem"
        />
      </div>

      <!-- 右边 -->
      <div class="right">
        <SecondNavBar
          :hotTags="hotTags"
          :currentTag="currentTag"
          @clickSecondBarItem="clickSecondBarItem"
        />
      </div>
    </div>

    <!-- 歌单列表 -->
    <ListCard
      :musicListData="musicList.playlists"
      @clickListCardItem="clickListCardItem"
      type="singer"
    />

    <!-- 分页 -->
    <div class="page" v-if="musicList.playlists">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="musicList.total"
        :page-size="50"
        small
        :current-page="currentPage"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ListCard from "../../../../components/listCard/ListCard";
import SortBox from "../../../../components/sortBox/SortBox";
import SecondNavBar from "../../../../components/secondNavBar/SecondNavBar";
export default {
  name: "MusicListIndex",
  components: { ListCard, SortBox, SecondNavBar },
  data() {
    return {
      //头部的图片
      theFirstOfHighquality: {},
      //显示的十个热门标签
      hotTags: [],
      //现在所处的歌单
      currentTag: {},
      //列表显示的歌单
      currentPage: 1,
      // 分类数据
      sortList: [],
      //展示歌单
      musicList: {},
    };
  },
  methods: {
    //精选歌单图片
    async getTheFirstOfHighquality() {
      let result = await this.$request("/top/playlist/highquality", {
        limit: 1,
      });
      this.theFirstOfHighquality = result.data.playlists[0];
    },

    //获取热门歌单tag数据(只有十个)
    async getHotTag() {
      let result = await this.$request("/playlist/hot");
      this.currentTag = result.data.tags[0];
      this.hotTags = result.data.tags;
    },

    //获取歌单分类数据(左边需要的全部数据)
    async getSortList() {
      let res = await this.$request("/playlist/catlist");
      this.sortList = res.data.sub;

      // console.log(this.sortList,'woshi ');
    },

    //根据歌名请求歌单列表
    async getmusicList() {
      //每次申请之前都重置歌单列表
      this.musicList = {};
      let result = await this.$request("/top/playlist", {
        cat: this.currentTag.name,
        offset: 50 * (this.currentPage - 1),
      });

      //里面的total可以用于分页,所以保存整个对象
      this.musicList = result.data;
      // console.log(result);
    },

    //当页数发生改变时
    pageChange(page) {
      // page是当前页数
      // console.log(e);
      this.currentPage = page;
      this.getmusicList();
    },
    //右边改变了--正在激活的十个歌单中的其中一个
    clickSecondBarItem(index) {
      this.currentTag = this.hotTags[index];
      this.currentPage = 1;
      this.getmusicList();

      // console.log(index,'我是右');
      //先清空musiclist
      // this.getmusicList()
    },

    //左边改变了--正在激活的十个歌单中的其中一个
    clickSortBoxItem(item) {
      this.currentTag = item;
      this.currentPage = 1;

      this.getmusicList();
    },

    //点击精选歌单
    highqualitylist() {
      alert("我还没有做好");
    },

    //点击详情歌单
    clickListCardItem() {
      alert("我还没有写好");
    },
  },
  created() {
    this.getTheFirstOfHighquality();
    this.getHotTag();
    // this.getSortList();
    this.getmusicList();
  },
};
</script>

<style scoped>
.musicListIndex {
  width: 100%;
  height: 100%;
  /* background-color: rgb(93, 150, 150); */
}
.highqualityEntry {
  cursor: pointer;
  width: 100%;
  height: 140px;
  line-height: 140px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}
.backgroundImg {
  border: 1px solid black;
  box-sizing: border-box;
  height: 140px;
  position: absolute;
  left: 0;
  top: 0;
  filter: blur(25px);
}
.cover {
  height: 140px;
  /* background-color: rgb(107, 189, 144); */
  width: 120px;
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 20%;
}
.EntryInfo {
  height: 140px;
  position: absolute;
  left: 140px;
  font-size: 14px;
  color: white;
  /* background-color: blueviolet; */
}
.tag {
  /* background-color: blue; */
  height: 30px;
  line-height: 30px;
  border: 1px solid rgb(231, 170, 90);
  position: absolute;
  top: 14px;
  left: 10px;
  border-radius: 15px;
  padding: 0 10px;
  font-size: 12px;
  color: rgb(231, 170, 90);
}
i {
  margin-right: 2px;
}
.name {
  font-size: 14px;
  font-weight: 700;
}
.musicListNavBar {
  /* background-color: rgb(231, 170, 90); */
  display: flex;
  justify-content: space-between;
}
.el-pagination{
  height: 30px;
  line-height: 100px;
  margin-top: 10px;
}
.active{
  border-bottom: 1px solid rgb(64, 158, 255);
transform: none;
}
</style>