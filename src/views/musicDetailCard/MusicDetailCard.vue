<template>
  <div class="musicDetailCard" :class="[isMusicDetailCardShow ? '' : 'hide']">
    <!-- 关闭详情歌单的左上标 -->
    <div class="closeCard" @click="closeCard">
      <i class="iconfont icon-close"></i>
    </div>

    <div
      class="musicDetailCardContainer"
      v-if="!cleanCard && musicInfo.name"
    ></div>

    <div v-else class="tip">暂无播放音乐</div>
  </div>
</template>

<script>
import Comment from "components/comment/Comment";
import LyricsScroll from "components/lyricsScroll/LyricsScroll";
import GoTop from "components/goTop/GoTop";

// 定时器名称
let timer;

export default {
  name: "MusicDetailCard",
  components: { LyricsScroll, Comment, GoTop },
  data() {
    return {
      //是否显示歌曲详情卡片
      isMusicDetailCardShow: false,
      // 当前歌曲信息
      musicInfo: {},
      // 是否删除卡片渲染的内容
      cleanCard: true,
      // 歌词
      lyric: [[0, "正在加载歌词"]],
      //当前评论页数
      currentCommentPage: 1,
      // 评论数据
      comment: {},
      // 评论是否在加载中
      isCommentLoading: false,
      // 热门评论
      hotComments: [],
    };
  },
  watch: {
    "$store.state.isMusicDetailCardShow"(isMusicDetailCardShow) {
      this.isMusicDetailCardShow = isMusicDetailCardShow;
    },
    // 当vuex中的歌曲id发生变化时,需要重新获取评论和歌词
    "$store.state.musicId"(musicId) {
        //清空歌词
        this.lyric = [[0,'正在加载歌词']]
        //重置评论页数
        this.currentCommentPage = 1
        //更新当前歌曲信息
        this.musicInfo = this.$store.state.currentmusic
        this.comment = {}

        //只有在卡片展示的时候才发送请求
        if (this.isMusicDetailCardShow) {
        this.getLyric(musicId);
        this.getMusicComment(musicId);
      }
    },
  },
  methods: {
      async getLyric(id){
          let res = await this.$request(`/lyric?id=${id}`);
          console.log(res);
      },
      async getMusicComment(){

      },
    closeCard() {
      this.$store.commit("changeMusicDetailCardState");
    },
  },
};
</script>

<style scoped>
.musicDetailCard {
  position: fixed;
  width: 100%;
  height: calc(100vh - 55px);
  bottom: 55px;
  left: 0;
  z-index: 998;
  transition: bottom 0.5s ease;
  background-color: white;
  background-image: linear-gradient(to bottom, #e3e2e3, white);
}
.hide {
  bottom: calc(-100vh + 55px);
}
.closeCard {
  position: absolute;
  top: 15px;
  left: 25px;
}
</style>