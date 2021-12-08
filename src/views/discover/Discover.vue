<template>

<!-- 由于我们要实现组件的复用,所以把这个页面的数据传送到另一个组件里面去,
并从另一个组件里面获取点击的页面的地址,
在这个页面里面进行跳转(但是为什么不在另一个组件里面直接就进行跳转了呢) -->


  <div class="recommendContainer">
    <!-- 组件的自定义事件,一种子组件和父组件之间的联系方式 -->
    <navBar @clickBarItem="clickBarItem" :navBarItem="navBarData"/>
    <!-- 通过路由来展示不同的页面 -->
    <router-view class="discover"></router-view>
  </div>
</template>

<script>
import NavBar from "../../components/navBar/NavBar";

export default {
  name: "Discover",
  components: { NavBar },
  data() {
    return {
      // 发现音乐中头部导航的数据
      navBarData: [
        { name: "个性推荐", path: "/home/discover/person" },
        { name: "歌单", path: "musicList" },//这里使用name命名的路由
        { name: "排行榜", path: "/home/discover/ranking" },
        { name: "歌手", path: "/home/discover/singer" },
      ],
    };
  },
  methods: {
    // 接收navbar传来的点击事件
    clickBarItem(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style scoped>
.recommendContainer{
  height: 630px;
  /* background-color: chartreuse; */
}
</style>