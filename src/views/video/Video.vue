<template>
  <div class="container">
      <NavBar @clickBarItem="clickBarItem" :navBarItem='navBarItem'> </NavBar>
      <router-view class="content"></router-view>
  </div>
</template>

<script>
import NavBar from '../../components/navBar/NavBar'
export default {
  name:'Video',
  components:{NavBar},
  data() {
    return {
      navBarItem:[
        {name:'视频',path:"/home/video/videolist"},
        {name:'MV',path:"/home/video/mvlist"}
      ]
    }
  },
  methods: {
    clickBarItem(path){
      //在这里进行跳转
      this.$router.push(path);
    }
  },
}
</script>

<style>
</style>