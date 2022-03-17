<template>
  <div class="recommendMusic">
    <!-- 每日推荐歌曲信息 -->
    <div class="recommendInfo">
      <div class="title">
        <div class="cover">
          <img src="../../assets/img/recommendMusic.png" alt="" />
        </div>
        <div class="titleInfo">
          <div class="infoTop">每日歌曲推荐</div>
          <div class="infoBottom">根据你的音乐口味生成，每天6:00更新</div>
        </div>
      </div>
      <!-- 操作按钮 -->
      <div class="buttons">
        <el-button type="danger" size="mini" round>播放全部</el-button>
         <el-button size="mini" round>收藏全部</el-button>
      </div>
    </div>

    <div class="list">
       <!-- 表格 -->
          <el-table
            :data="list"
            stripe
            size="mini"
            style="width: 100%"
            highlight-current-row
            lazy
            @row-dblclick="clickRow"
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
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[],
    }
  },
  methods:{
    async getlist(){
      let res =await this.$request('/recommend/songs')
      this.list = res.data.data.dailySongs
    },
    //双击歌曲
    clickRow(row) {

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
  },
  created(){
    this.getlist()
  }
}
</script>

<style lang="less" scoped>
.recommendMusic{
  // display: flex;
  // flex-direction: column;
  padding: 0 30px;
  padding-bottom: 12px;
  .recommendInfo{
    // background-color: aquamarine;
    position: relative;
    height: 150px;
    display: flex;
    flex-direction: column;
    .title{
      // background-color: pink;
      width: 400px;
      height: 100px;
      display: flex;
      flex-direction: row;
      .cover{
        height: 100px;
        img{
          height: 100%;
          border-radius: 10px;
        }
      }
      .titleInfo{
        // background-color: rgb(119, 119, 175);
        padding-top: 30px;
        line-height: 20px;
        text-align: left;
        .infoTop{
          font-size: 20px;
          font-weight: 600;
        }
        .infoBottom{
        font-size: 13px;
        
        }
      }
    }
    .buttons{
      // background-color: beige;
      height: 48px;
      line-height: 48px;
      position: absolute;
      bottom: 0;
    }
  }
}
</style>
<style>
el-table_1_column_2  ,.el-main[data-v-3dd2e005],   is-leaf el-table__cell{
    line-height: 0;
  }
</style>
