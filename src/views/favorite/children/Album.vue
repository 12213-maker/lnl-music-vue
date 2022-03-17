<template>
  <div v-if="count!=0">
      <ListCard :musicListData="list" @bottomLoad="bottomLoad" type='album'/>
  </div>
  <div v-else>暂无收藏专辑</div>
</template>

<script>
import ListCard from '../../../components/listCard/ListCard'
export default {
  name:'Album',
  components:{ListCard},
  data() {
    return {
      list:[],
      count:0
    }
  },
  methods:{
    async getFavoriteAlbumnList(){
      let res = await this.$request('/album/sublist')
      this.list = res.data.data
      this.count = res.data.count
      console.log(res);
    },
    bottomLoad(){
      console.log('我触底了');
    }
  },
  created(){
    this.getFavoriteAlbumnList()
  }
}
</script>

<style>

</style>