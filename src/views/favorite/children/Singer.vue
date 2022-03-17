<template>
  <div v-if="count!=0">
      <ListCard :musicListData="list" @bottomLoad="bottomLoad" type='album'/>
  </div>
  <div v-else>暂无收藏歌手</div>
</template>

<script>
import ListCard from '../../../components/listCard/ListCard'
export default {
  name:'Singer',
  components:{ListCard},
  data() {
    return {
      
      list:[],
      count:0
    
    }
  },
  methods:{
    async getFavoriteSingerList(){
      let res = await this.$request('/artist/sublist')
      this.list = res.data.data
      this.count = res.data.count
      console.log(res);
    },
    bottomLoad(){
      console.log('我触底了');
    }
  },
  created(){
    this.getFavoriteSingerList()
  }
}
</script>

<style>

</style>