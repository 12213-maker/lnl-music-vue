<template>
  <div class="all">
    <div class="top">
      <div class="title">搜索 {{this.$route.params.id}}</div>
      <div class="like">
        <div class="top">你可能感兴趣</div>
        <div class="item"
        
        >
        占位
        </div>
      </div>
    </div>
    <el-table
    :data="songList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      type="index"
      width="35">
    </el-table-column>
    <el-table-column
      width="25">
    <i class="iconfont icon-aixin_line"></i>
    </el-table-column>
    <el-table-column
      width="35">
    <i class="iconfont icon-download"></i>
    </el-table-column>
    <el-table-column
      prop="name"
      label="音乐标题"
      width="540">
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      label="歌手"
      width="200">
    </el-table-column>
    <el-table-column
      prop="al.name"
      width="250"
      label="专辑">
    </el-table-column>
    <el-table-column
      prop="dt"
      label="时长">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
    data() {
      return {
        currentPage: 1,
        songList:[]
      }
    },
    methods:{
      //请求搜索单曲
      async getSearchSong(){
        // let id = this.$route.params.id
        // let res = await this.$request('/cloudsearch',{
        //   keywords:id,
        //   // offset:30*(this.currentPage - 1)
        // })

        let res = await this.$request(`/cloudsearch?keywords=${this.$route.params.id}&&offset=${30*(this.currentPage - 1)}`)
        this.songList = res.data.result.songs
        console.log(this.songList);
      }
    },
    created(){
      this.getSearchSong()
    },
}
</script>

<style scoped lang="less">
.all{
  padding: 0 25px;
  padding-bottom: 120px;
}
.top{
  height: 130px;
  line-height: 130px;
  background-color: aquamarine;
  position: relative;
  .title{
    background-color: white;
    height: 30px;
    line-height: 30px;
    text-align: left;
    font-size: 20px;
    font-weight: 600;
  }
  .top{
    position:absolute;
    top: 35px;
    left: 0;
    // background-color: white;
    height: 10px;
    line-height: 10px;
    font-size: 12px;
    color:#666;
  }
  .item{
    background-color: blue;
    position: absolute;
    bottom: 0;
    left:0;
    height:90px;
  }
}
</style>
<style>
    el-table_1_column_2  ,.el-main[data-v-3dd2e005],   is-leaf el-table__cell{
    line-height: 0;
  }
</style>