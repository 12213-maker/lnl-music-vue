<template>
  <div>
      <NavBar 
      :navBarItem="list"
      @clickBarItem="clickBarItem"
      />
      <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '../../components/navBar/NavBar'
export default {
    components:{NavBar},
    data() {
        return {
            list:[
                {name:'单曲',path:'searchsong'},
                {name:'歌手',path:'searchsinger'},
                {name:'专辑',path:'searchalbum'},
                {name:'视频',path:'searchvideo'},
                {name:'歌单',path:'searchmusiclist'},
            ]
        }
    },
    methods:{
        //点击的回调事件
        clickBarItem(path){
            this.$router.push({
                name:path,
                id:this.$route.params.id
            })
        }
    }
}
</script>

<style>

</style>