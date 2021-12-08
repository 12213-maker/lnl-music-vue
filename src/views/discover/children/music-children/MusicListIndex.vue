<template>
  <div class="musicListIndex">
    <SortBox/>
  </div>
</template>

<script>
import ListCard from "../../../../components/listCard/ListCard";
import SortBox from '../../../../components/sortBox/SortBox'
export default {
  name: "MusicListIndex",
  components: [ListCard,SortBox],
  data() {
    return {
      //歌单列表的数据
      listCardData: [],
    };
  },
  methods: {
    async getlistcarddata() {
      //获取歌单列表的数据
      let result = await this.$request("/top/playlist");
      // this.listCardData = result
      console.log(result);
    },
  },
};
</script>

<style scoped>
</style>