<template>
  <div class="div2">
    <el-container class="home-class">
      <!-- 头部区域 -->
      <el-header style="padding: 0">
        <HomeHeader />
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="160px">
          <!-- 左侧菜单/要开启路由模式才可以使用(可以再设置一个折叠的效果) -->
          <el-menu
            mode:vertical
            router
            background-color
            active-text-color="rgb(236, 65, 65)"
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
          >
            <!-- 在item项里面使用index才可以跳转 -->
            <el-menu-item index="/home/discover">
              <i class="iconfont icon-listing-content"></i>
              <span slot="title">发现音乐</span>
            </el-menu-item>
            <el-menu-item index="/home/video">
              <i class="iconfont icon-play"></i>
              <span slot="title">观看视频</span>
            </el-menu-item>
            <el-menu-item index="/home/favorite">
              <i class="iconfont icon-add-account"></i>
              <span slot="title">我的收藏</span>
            </el-menu-item>
            <el-menu-item index="/home/recommend">
              <i class="iconfont icon-good"></i>
              <span slot="title">每日推荐</span>
            </el-menu-item>

            <!-- 登录之后才会有的选项 -->
            <!-- 创建的歌单 -->
            <el-menu-item-group v-if="createdMusicList.length != 0">
              <!-- 这个是标题 -->
              <template slot="title" class="groupTitle">创建的歌单</template>

              <!-- 这个是标题下的子类 -->
              <el-menu-item
                v-for="(item, index) in createdMusicList"
                :key="index"
                :index="'/home/musiclistdetail/' + item.id"
              >
                <i class="iconfont icon-category"></i> {{ item.name }}
              </el-menu-item>
            </el-menu-item-group>

            <!-- 收藏的歌单 v-if="collectedMusicList.length!=0" -->
            <el-menu-item-group v-if="collectedMusicList.length != 0">
              <template slot="title" class="groupTitle">收藏的歌单</template>

              <el-menu-item
                v-for="(item, index) in collectedMusicList"
                :key="index"
                :index="'/home/musiclistdetail/' + item.id"
              >
                <i class="iconfont icon-category"></i> {{ item.name }}
              </el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-aside>
        <!-- 右边内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- 下面的播放器 -->
    <div class="div3">
      <BottomPlayMusic />
    </div>

    <!-- 音乐详情 -->
    <music-detail-card class="musicDetailCard"></music-detail-card>
  </div>
</template>

<script>
import HomeTop from "./children/HomeTopNavBar";
import HomeHeader from "./children/HomeHeader";
import BottomPlayMusic from "../../components/BottomPlayMusic/BottomPlayMusic";
import MusicDetailCard from "../musicDetailCard/MusicDetailCard.vue";
export default {
  name: "Home",
  components: {
    HomeTop,
    HomeHeader,
    BottomPlayMusic,
    MusicDetailCard,
  },
  data() {
    return {
      //收藏的歌单
      collectedMusicList: [],
      //创建的歌单
      createdMusicList: [],
      //激活的菜单
      defaultActive: "",
    };
  },
  methods: {
    //请求用户歌单
    async getUserMusicList() {
      //没有登录就直接退出
      if (!this.$store.state.isLogin) {
        this.$message.error("请先进行登陆操作");
        return;
      }

      //接下来就可以进行登录操作
      let uid = window.localStorage.getItem("userId");
      let res = await this.$request(`/user/playlist?uid=${uid}`);
      let playList = res.data.playlist;

      //根据创建者的id是不是该用户来区分是创建歌单还是收藏歌单
      this.createdMusicList = playList.filter((item) => {
        // console.log('wozai',item.userId,uid);
        if (item.userId == uid) return item;
      });
      //收藏的歌单
      this.collectedMusicList = playList.splice(
        this.createdMusicList.length,
        playList.length
      );
      //把第一个名字改了
      this.collectedMusicList[0].name = "我喜欢的音乐";

      //歌单保存到vuex中
      this.$store.commit("setcollectMusicList", this.collectedMusicList);
      this.$store.commit("setcreatedMusicList", this.createdMusicList);
    },
  },
  watch: {
    //监听vuex中登录状态
    "$store.state.isLogin"(current) {
      if (current) {
        this.getUserMusicList();
      } else {
        this.collectedMusicList = [];
        this.createdMusicList = [];
      }
    },
  },
  created(){
    // console.log(this.$route.path);
    if (this.$route.path.search("/musiclistdetail") == -1) {
      this.defaultActive = "/" + this.$route.path.split("/")[1];
    } else {
      this.defaultActive = this.$route.path;
    }
    //这样写也可以
    this.defaultActive = this.$route.path;
  },
};
</script>

<style scoped>
.div2 {
  height: 100%;
}
.home-class {
  height: 100%;
}
.el-header {
  padding: 0;
  margin: 0;
  /* height: 30px; */
  box-sizing: border-box;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: left;
  line-height: 200px;
  background-color: white;
  border-right: 1px solid #ccc;
}

.el-main {
  background-color: white;
  color: #333;
  padding: 0;
  text-align: center;
  line-height: 160px;
  height: 100%;
}
.el-container {
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.div3 {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 60px;
  background-color: rgb(255, 255, 255);
  border-top: 1px solid rgb(224, 224, 224);
  padding: 0 20px;
  box-sizing: border-box;
}
.el-menu-vertical-demo {
  background-color: white;
}
</style>
<style>
.el-menu-item {
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 10px;
}
</style>