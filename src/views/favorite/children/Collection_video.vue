<template>
  <div v-if="count!=0">
      <ListCard :musicListData="list" @bottomLoad="bottomLoad" type='album'/>
  </div>
  <div v-else>暂无收藏视频</div>
</template>

<script>
import ListCard from '../../../components/listCard/ListCard'
export default {
  components:{ListCard},
  data() {
    return {
      
      list:[],
      count:0,
      currentPage: 1,
    
    }
  },
  methods:{
    async getFavoriteMvList(){
      let res = await this.$request('/mv/sublist')
      this.list = res.data.data
      this.count = res.data.count
      console.log(res);
    },
    bottomLoad(){
      console.log('我触底了');
    }
  },
  created(){
    this.getFavoriteMvList()
  }
}
</script>

<style>

</style>