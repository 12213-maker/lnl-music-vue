<template>
  <div>
      <NavBar 
      :navBarItem="navBarItem"
      @clickBarItem="clickBarItem"
      />
      <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '../../components/navBar/NavBar'
export default {
  name:'Favorite',
  components:{NavBar},
  data() {
    return {
      navBarItem:[
        { name: "专辑", path: "/home/favorite/album" },
        { name: "歌手", path: "/home/favorite/Singer" },
        { name: "视频", path: "/home/favorite/Collection_video" },
        { name: "专栏", path: "/home/favorite/Column" },
      ]
    }
  },
  methods:{
    clickBarItem(value){
      if(this.$route.path === value)return 
      this.$router.push(value)
    }
  }
}
</script>

<style>

</style>