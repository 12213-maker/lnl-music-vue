<template>
  <div class="div2">
    <el-container class="home-class">
      <!-- 头部区域 -->
      <el-header>
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
            default-active="/home/discover"
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
          </el-menu>
        </el-aside>
        <!-- 右边内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>


      </el-container>
    </el-container>

    <div class="div3">
      <BottomPlayMusic/>
    </div>
  </div>
</template>

<script>
import HomeTop from "./children/HomeTopNavBar";
import HomeHeader from "./children/HomeHeader";

import BottomPlayMusic from "../../components/BottomPlayMusic/BottomPlayMusic";
export default {
  name: "Home",
  components: { HomeTop, HomeHeader, BottomPlayMusic },
};
</script>

<style>
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
.div3{
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 60px;
  background-color: rgb(217, 195, 236);
  padding: 0 20px;
  box-sizing: border-box;
}
.el-menu-vertical-demo{
  background-color: white;
}
</style>