<template>
  <div class="bottomPlayMusic">
    <audio
      ref="audioPlayer"
      @ended="changeMusic('next')"
      :src="musicUrl"
      autoplay
      @timeupdate="timeupdata"
    ></audio>

    <!-- 左边 -->
    <div class="left">
      <div 
      class="avatar"
      @click="$store.commit('changeMusicDetailCardState')"
      >
        <img
          class="img1"
          :src="currentmusic.al.picUrl"
          alt=""
          v-if="currentmusic"
        />
        <img class="img1" v-else src="@/assets/img/test.jpg" alt="" />
      </div>

      <!-- 歌名和歌手 -->
      <div class="content">
        <div class="name" v-if="currentmusic">{{ currentmusic.name }}</div>
        <div class="singer" v-if="currentmusic">
          {{ currentmusic.ar[0].name }}
        </div>
        <div v-if="currentmusic" class="down">
          <i class="iconfont icon-download"></i>
        </div>
      </div>

      <!-- 下载的标识 -->
      <!-- <div v-if="currentmusic" class="down">
        <i class="iconfont icon-download"></i>
      </div> -->
    </div>

    <!-- 中间 -->
    <div class="middle">
      <!-- 上面的图标 -->
      <div class="buttons">
        <!-- 播放模式 -->
        <div
          class="btn"
          @click="playType = playType == 'order' ? 'radom' : 'order'"
        >
          <i
            style="fontsize: 23px"
            class="btni iconfont icon-24gl-shuffle"
            v-if="playType == 'radom'"
          ></i>
          <i class="btni iconfont icon-shunxubofang" v-else></i>
        </div>

        <!-- 上一曲 -->
        <div
          class="btn"
          @click="musicList.length != 0 ? changeMusic('pre') : ''"
        >
          <i class="btni iconfont icon-shangyigeshangyiqu"></i>
        </div>

        <!-- 播放暂停 -->
        <div class="btn" @click="changeisplay">
          <i v-if="!isplaybtn" class="btni iconfont icon-bofang"></i>
          <i v-else class="btni iconfont icon-zanting"></i>
        </div>

        <!-- 下一曲 -->
        <div
          class="btn"
          @click="musicList.length != 0 ? changeMusic('next') : ''"
        >
          <i class="btni iconfont icon-xiayigexiayiqu"></i>
        </div>

        <!-- 喜欢 -->
        <div class="btn">
          <i class="btni iconfont icon-favorites-fill"></i>
        </div>
      </div>
      <!-- 下面的进度 -->
      <div class="speed">
        <span class="init">{{ currentTime | hanleMusicTime }}</span>
        <el-slider
          class="progressSlider"
          :show-tooltip="false"
          v-model="timeProgress"
          @change="changeProgress"
          :disabled="musicList.length == 0"
        ></el-slider>
        <span class="all">{{ duration | hanleMusicTime }}</span>
      </div>
    </div>

    <!-- 右边 -->
    <div class="right">
      <div @click="isMuted = true" style="cursion: pointer">
        <i class="r iconfont icon-sound-filling"></i>
      </div>
      <div>
        <el-slider
          class="d2"
          :show-tooltip="false"
          v-model="volume"
          @input="changeVolume"
          style="width: 60px"
        ></el-slider>
      </div>
      <div class="i2"><i class="r iconfont icon-category"></i></div>
    </div>

    <!-- 抽屉 -->
    <div class="drawer">
      <el-drawer
        :visible.sync="drawer"
        :with-header="false" 
        direction="btt"
        :modal="false"
      >
      
      <!-- <el-table
        class="inshow"
        :data="currentmusic"
        stripe
        style="width: 100%"
        :show-header="false"
        @row-dblclick="clickRow"
        highlight-current-row
        lazy
      >

        <el-table-column prop="name" width="150px"> </el-table-column>
        <el-table-column prop="ar[0].name" width="80px"> </el-table-column>
        <el-table-column prop="dt" width="70px"> </el-table-column>
      </el-table> -->
      
      <!-- <div class="drawerHeader">总{{ musicList.length }}首</div>
      <el-table
        :data="musicList"
        stripe
        style="width: 100%"
        :show-header="false"
        @row-dblclick="clickRow"
        highlight-current-row
        lazy
      >
        <el-table-column prop="name" width="150px"> </el-table-column>
        <el-table-column prop="ar[0].name" width="80px"> </el-table-column>
        <el-table-column prop="dt" width="70px"> </el-table-column>
      </el-table> -->


      </el-drawer>
    </div>
  </div>
</template>

<script>
import { hanleMusicTime, returnSecond } from "@/plugins/utils";
let lastSecond = 0;
// 总时长的秒数
let durationNum = 0;
// 保存当前音量
let volumeSave = 0;
// 当前音乐类型，用于下载
let musicType = "";

export default {
  name: "BottomPlayMusic",
  data() {
    return {
      //音乐详情
      musicDetail: {},
      musicList: [],
      // 播放音乐的链接
      musicUrl: "",
      //当前播放的音乐的全部信息(里面的al是专辑信息)
      currentmusic: "",
      //当前播放音乐的index
      currentMusicIndex: 0,

      //表示播放状态
      isplaybtn: false,
      //时间进度条的进度
      timeProgress: 0,
      //当前播放时间位置
      currentTime: 0,
      // 音乐总时长
      duration: "00:00",

      //抽屉是否可见
      drawer: false,

      //音量
      volume: 40,
      // 是否静音
      isMuted: false,

      //播放模式(顺序和随机)order和radom
      playType: "order",
    };
  },
  methods: {
    //请求歌曲的url
    async getMusicDetail(id) {
      let result = await this.$request(`/song/url?id=${id}`);

      this.musicUrl = result.data.data[0].url;
    },

    //点击了播放键
    changeisplay() {
      // //改变播放的状态
      this.isplaybtn = !this.isplaybtn;
      //还要修改对应vuex中音乐的播放状态
      this.$store.commit("updataisPlay", this.isplaybtn);

      //修改audio的播放状态
      this.$store.state.isPlay
        ? this.$refs.audioPlayer.play()
        : this.$refs.audioPlayer.pause();
    },

    //切歌函数
    changeMusic(type) {
      if (type == "pre") {
        //要在这里进行顺序播放还是随机播放的设置

        if (this.playType == "order") {
          let findid = this.$store.state.musicList[--this.currentMusicIndex].id;
          this.$store.commit("updateMusicId", findid);
          //改变vuex中的currentmusic.
          this.$store.commit(
            "setcurrentmusic",
            this.$store.state.musicList[this.currentMusicIndex]
          );
        } else if (this.playType == "radom") {
          var preIndex = 0;
          //如果歌单只有一首歌那么就不行
          if (this.musicList.length == 1) {
            preIndex = currentMusicIndex;
          } else {
            //获取到一个随机数,要在歌单的数量之内this.$store.state.musicList.length
            let len = this.$store.state.musicList.length + 1;
            //设置一个随机数
            preIndex = parseInt(Math.random() * len, 10);
          }

          //改变歌曲的id
          this.$store.commit(
            "updateMusicId",
            this.$store.state.musicList[preIndex].id
          );
          //改变currentmusic
          this.$store.commit(
            "setcurrentmusic",
            this.$store.state.musicList[preIndex]
          );
        }
      } else if (type == "next") {
        if (this.playType == "order") {
          let findid = this.$store.state.musicList[++this.currentMusicIndex].id;

          //改变歌曲的id
          this.$store.commit("updateMusicId", findid);

          //改变vuex中的currentmusic
          this.$store.commit(
            "setcurrentmusic",
            this.$store.state.musicList[this.currentMusicIndex]
          );
        } else if (this.playType == "radom") {
          var preIndex = 0;
          //如果歌单只有一首歌那么就不行
          if (this.musicList.length == 1) {
            preIndex = currentMusicIndex;
          } else {
            //获取到一个随机数,要在歌单的数量之内this.$store.state.musicList.length
            let len = this.$store.state.musicList.length + 1;
            //设置一个随机数
            preIndex = parseInt(Math.random() * len, 10);
          }

          //改变歌曲的id
          this.$store.commit(
            "updateMusicId",
            this.$store.state.musicList[preIndex].id
          );
          //改变currentmusic
          this.$store.commit(
            "setcurrentmusic",
            this.$store.state.musicList[preIndex]
          );
        }
      }
    },

    //根据音乐的id找到musicList中对应的currentMusic
    getcurrentMusicFromMusicList() {
      let id = this.$store.state.musicId;
      // console.log(id);
      let musiclist = this.$store.state.musicList;
      // console.log(musiclist);
      //遍历歌单
      musiclist.forEach((item, index) => {
        if (item.id == id) {
          this.currentMusicIndex = index;
          // console.log('我是遍历的index',index);
          this.duration = this.musicList[index].dt;
        }
      });
    },

    //当前播放时间的位置
    timeupdata() {
      //这里为什么会涉及到节流

      //当前播放时间
      let currentTime = this.$refs.audioPlayer.currentTime;
      //全部播放时间
      let allTime = this.$refs.audioPlayer.duration;

      //将当前播放时间传到vuex
      // this.$store.commit("updateCurrentTime", currentTime);

      currentTime = Math.floor(currentTime); //向下取整
      allTime = Math.floor(allTime);

      // console.log(currentTime,"sd",allTime);

      if (currentTime != lastSecond) {
        lastSecond = currentTime;
        this.currentTime = currentTime;
        //计算进度条的位置
        this.timeProgress = Math.floor((currentTime / allTime) * 100);
        // console.log(this.timeProgress);
      }
    },

    //拖动歌词
    changeProgress(e) {
      // 修改当前播放时间
      this.currentTime = Math.floor((e / 100) * durationNum);
      // 改变audio的实际当前播放时间
      this.$refs.audioPlayer.currentTime = this.currentTime;
    },

    //改变音量(使用input随着拖动一直都在改变)
    changeVolume(e) {
      this.volume = e;
      this.$refs.audioPlayer.volume = e / 100;

      //判断是否是静音
      if (this.isMuted && e > 0) {
        this.isMuted = false;
      } else if (e == 0 && this.isMuted == false) {
        this.isMuted = true;
      }
    },


    //
    clickRow(){
      console.log('我还没有做好');
    }
  },
  created() {},
  watch: {
    isMuted(newvalue) {
      if (newvalue) {
        this.changeVolume(0);
      }
    },
    //监听vuex中的musicId发送变化
    "$store.state.musicId"(id) {
      // console.log('vuex中的id发生了变化');

      this.getMusicDetail(id);
      this.musicList = this.$store.state.musicList;

      //暂时测试
      this.getcurrentMusicFromMusicList();
    },
    //监听当前播放的歌曲
    "$store.state.currentmusic"(newvalue) {
      this.currentmusic = newvalue;
      // console.log(this.currentmusic);
    },
    //监听播放状态
    "$store.state.isPlay"(newvalue) {
      //当前有歌曲正在播放就修改
      //修改but的状态
      this.isplaybtn = newvalue;
    },
  },
  filters: {
    hanleMusicTime,
  },
};
</script>

<style scoped>
.BottomPlayMusic {
  position: absolute;
  /* width: 100%; */
  z-index: 9999;
  display: flex;
  justify-content: space-between;
}
.left {
  /* background-color: rgb(176, 204, 150); */
  position: relative;
  width: 100px;
  top: 0;
  position: absolute;
  top: 8px;
  height: 45px;
  left: 2%;
  display: flex;
}
.avatar {
  width: 45px;
  cursor: pointer;
}
.name,.singer{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 15px;
  /* background-color: bisque; */
}
.img1 {
  width: 100%;
  border-radius: 10px;
}
.content {
  /* background-color: rgb(168, 108, 108); */
  width: 82px;
  position: absolute;
  top: 10px;
  left: 55px;
  font-size: 13px;
  color: rgb(0, 0, 87);
}
.singer {
  font-size: 12px;
  margin-top: 2px;
  /* background-color: blue; */
}
.down {
  position: absolute;
  top: 15px;
  /* background-color: blue; */
  left: 80px;
  color: rgb(169, 169, 169);
}
.middle {
  /* background-color: rgb(150, 150, 221); */
  width: 450px;
  height: 60px;
  left: 33%;
  position: relative;
}
.buttons {
  /* background-color: rgb(83, 45, 45); */
  height: 40px;
  display: flex;
  flex-direction: row;
  padding-left: 100px;
  padding-top: 6px;
}
.btni {
  font-size: 28px;
  padding: 0 10px;
  color: rgb(102, 99, 99);
}
.speed {
  /* background-color: white; */
  height: 20px;
  padding-left: 50px;
  /* width: 402px; */
}
.init {
  position: absolute;
  left: 15px;
  top: 41px;
  font-size: 12px;
  color: rgb(159, 159, 159);
}
.all {
  position: absolute;
  left: 405px;
  top: 41px;
  font-size: 12px;
  color: rgb(159, 159, 159);
}
.right {
  /* background-color: rgb(117, 49, 49); */
  width: 200px;
  height: 60px;
  position: absolute;
  top: 20px;
  left: 85%;
  display: flex;
}
.r {
  color: rgb(102, 99, 99);
  font-size: 22px;
  margin: 0 40px;
}
.i2 {
  position: absolute;
  top: -1px;
  left: 100px;
}

</style>
<style>
.d2 {
  /* background-color: cornflowerblue; */
  position: relative;
  top: -7px !important;
  left: -30px !important;
  /* margin-bottom: 30px; */
}
.iconfont {
  cursor: pointer;
}
.drawer{
  position: absolute;
  height: 100%;
}
.el-drawer , .btt{
  position: absolute;
  top: 0;
  bottom: 60px !important;
  background-color: rgb(182, 104, 104);
  height:91.6% !important;
  z-index: 998;
  box-shadow:none;
}
el-drawer__body{
  height: 100% !important;
}
.inshow{
  background-color: blueviolet;
  /* border: 5px solid black; */
  box-sizing: border-box;
  width: 60% !important;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

}
</style>