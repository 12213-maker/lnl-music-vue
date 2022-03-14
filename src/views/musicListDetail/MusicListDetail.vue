<template>
  <div class="MusicListDetail1">
    <!-- 歌单简介 -->
    <div class="listInfo">
      <!-- 头像 -->
      <div class="avater">
        <img class="img2" :src="musicListDetail.coverImgUrl" alt="" />
      </div>

      <!-- 右边的介绍 -->
      <div class="right">
        <!-- 名字 -->
        <div class="name1">
          <div class="gedan">歌单</div>
          <div class="name2">{{ musicListDetail.name }}</div>
        </div>
        <div class="all">
          <div class="in">
            <img class="img4" :src="musicListDetailCreator.avatarUrl" />
            <div class="name3">{{ musicListDetailCreator.nickname }}</div>
            <div class="createTime">{{ musicListDetail.createTime }}创建</div>
          </div>
        </div>

        <!-- 按钮 -->
        <div class="buttons">
          <div class="btn"><i class="iconfont icon-play"></i>播放全部</div>
          <div class="btn"><i class="iconfont icon-add"></i>收藏</div>
          <div class="btn">
            <i class="iconfont icon-salescenter-fill"></i>分享
          </div>
          <div class="btn"><i class="iconfont icon-download"></i>下载全部</div>
        </div>

        <!-- 标签 -->
        <div class="tag">标签:</div>
        <div class="tags">
          <div
            class="tag2"
            v-for="(item, index) in musicListDetailTags"
            :key="index"
          >
            {{ item }}
          </div>
          <div v-if="musicListDetailTags.length == 0">暂无标签</div>
        </div>

        <!-- 歌曲列表的歌曲数量和播放量 -->
        <div class="otherInfo">
          <div class="musicNum">歌曲: {{ musicListDetail.trackCount }}</div>
          <div class="playCount">播放: {{ musicListDetail.playCount }}</div>
        </div>

        <div class="desc">
          简介:
          {{
            musicListDetail.description
              ? musicListDetail.description
              : "暂无简介"
          }}
        </div>
      </div>
    </div>

    <!-- 歌单列表 -->
    <div class="musicList">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first">
          <!-- 表格 -->
          <el-table
            :data="musicListDetail.tracks"
            stripe
            size="mini"
            style="width: 100%"
            highlight-current-row
            lazy
            @row-dblclick="clickRow"
            @cell-click="clickCell"
          >
            <el-table-column type="index" width="50"> </el-table-column>

            <el-table-column
              prop="name"
              class="title3"
              label="标题"
              width="600"
            >
            </el-table-column>
            <el-table-column prop="ar[0].name" label="歌手"> </el-table-column>
            <el-table-column prop="al.name" label="专辑"> </el-table-column>
            <el-table-column prop="dt" label="时间"> </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="评论" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="收藏者" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "MusicListDetail",
  data() {
    return {
      musicListDetail: [],
      activeName: "first",
      musicListDetailCreator: {},
      musicListDetailTags: [],
    };
  },
  methods: {
    // 根据传来的 id 查询歌单
    async getMusicListDetail() {
      let id = this.$route.params.id;
      let result = await this.$request(`/playlist/detail?id=${id}`);

      this.musicListDetail = result.data.playlist;
      // console.log('我在这里',this.musicListDetail);
      this.musicListDetailCreator = result.data.playlist.creator;
      this.musicListDetailTags = result.data.playlist.tags;
      // console.log(this.musicListDetailCreator);
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },

    //双击歌曲
    clickRow(row) {
      // console.log('我是row',row);

      //将musicId提交到vuex中,供bottomContorl查询歌曲url和其它的操作
      this.$store.commit("updateMusicId", row.id);
      //把当前这首歌的全部信息传到vuex
      this.$store.commit("setcurrentmusic", row);
      //把歌单上传到vuex
      // this.$store.commit('updataMusicList',this.musicListDetail.tracks)
      //将歌曲播放状态置为true
      this.$store.commit("updataisPlay", true);

      // 如果歌单发生变化,则提交歌单到vuex
      if (this.$store.state.musicListId != this.musicListDetail.id) {
        this.$store.commit("updateMusicList", {
          musicListId: this.musicListDetail.id,
          musicList: this.musicListDetail.tracks,
        });
      }
    },
    //单击cell
    clickCell() {
      // console.log('这首歌被单击了');
    },
  },
  created() {
    this.getMusicListDetail();
  },
  watch: {
    "$route.params.id"() {
      this.getMusicListDetail();
    },
  },
};
</script>

<style scoped>
.MusicListDetail1 {
  color: rgb(103, 103, 103);
  /* background-color: rgb(139, 139, 185); */
  overflow-y: scroll;
  height: 62px;
  overflow: visible;
  padding: 20px 30px 0 30px;
}
.listInfo {
  /* background-color: cadetblue; */
  height: 300px;
  display: flex;
  flex-direction: row;
  height: 180px;
}
.avater {
  width: 180px;
  border-radius: 10px;
}
.img2 {
  width: 100%;
  border-radius: 10px;
  min-width: 180px;
}
.right {
  /* background-color: coral; */
  width: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.name1 {
  /* background-color: rgb(139, 82, 82); */
  height: 30px;
  line-height: 30px;
  position: relative;
  color: rgb(0, 0, 0);
}
.gedan {
  /* background-color: crimson; */
  border: 1px solid rgb(236, 65, 65);
  width: 40px;
  height: 20px;
  line-height: 20px;
  display: inline;
  font-size: 14px;
  color: rgb(236, 65, 65);
  /* padding: 3px;
  margin-right: 5px; */
  position: absolute;
  top: 4px;
  left: 20px;
}
.name2 {
  /* background-color: cyan; */
  display: inline;
  position: absolute;
  top: 0px;
  left: 70px;
  font-weight: 1000;
  font-size: 22px;
  min-width: 238px;
  text-align: left;
}
.all {
  position: absolute;
  /* background-color: deeppink; */
  height: 30px;
  line-height: 30px;
  top: 30px;
  left: 20px;
  width: 100%;
}
.in {
  width: 30px;
  border-radius: 50%;
}
.img4 {
  width: 100%;
  border-radius: 50%;
}
.name3 {
  /* background-color: crimson; */
  width: 200px;
  position: absolute;
  top: 0;
  left: -25px;
  font-size: 12px;
  color: rgb(94, 88, 183);
}
.createTime {
  width: 200px;
  position: absolute;
  top: 0;
  left: 70px;
  font-size: 12px;
}
.buttons {
  position: absolute;
  /* background-color: rgb(112, 55, 55); */
  width: 600px;
  /* height: 30px; */
  top: 60px;
  display: flex;
  flex-direction: row;
  left: 15px;
}
.btn {
  /* background-color: white; */
  border-radius: 30px;
  margin: 7px 5px;
  height: 20px;
  line-height: 20px;
  border: 1px solid rgb(216, 216, 216);
  padding: 2px 10px;
  font-size: 15px;
}
.tags {
  /* background-color: bisque; */
  position: absolute;
  top: 150px;
  width: 500px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  top: 95px;
  left: 55px;
  font-size: 12px;
  text-align: left;
  display: inline-block;
  display: flex;
  flex-direction: row;
}
.tag {
  /* background-color: blue; */
  position: absolute;
  top: 25px;
  width: 50px;
  /* height: 30px; */
  left: 12px;
  font-size: 12px;
}
.tag2 {
  padding-right: 5px;
}
.otherInfo {
  position: absolute;
  /* background-color: blue; */
  width: 500px;
  height: 20px;
  line-height: 20px;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  top: 115px;
  left: 22px;
}
.playCount {
  margin-left: 15px;
}
.desc {
  position: absolute;
  /* background-color: blue; */
  width: 900px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  top: 135px;
  left: 22px;
  text-align: left;
}
.musicList {
  margin-top: 10px;
  /* background-color: cadetblue; */
  /* height: 417px; */
  overflow: hidden;
}
.el-tabs {
  /* background-color: chartreuse; */
  line-height: 0;
}
</style>

<style>
.el-table__row,
.el-table__row--striped {
  cursor: pointer;
}
.el-table__row {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap !important;
}
.el-table,
.cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap !important;
}
</style>