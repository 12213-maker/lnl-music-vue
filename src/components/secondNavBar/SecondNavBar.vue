<template>
  <div class="SecondNavBar">
    <div 
    class="barItem"
    :class="index==activeNum?'active2':''"
    v-for="(item,index) in hotTags"
    :key="index"
    @click="clickSecondBarItem(index)"
    >
      {{item.name}}
    </div> 
  </div>
</template>

<script>
export default {
  name: "SecondNavBar",
  props:['hotTags','currentTag'],
  data(){
    return{
      activeNum:0
    }
  },
  methods:{
    //正在激活的十个歌单中的其中一个
    clickSecondBarItem(index){
      if(index==this.currentTag)
      return;
      this.$emit('clickSecondBarItem',index)
      this.activeNum = index

      
    }
  },
  watch:{
    currentTag(current){
      this.activeNum = this.hotTags.findIndex(
        (item)=>item.name==current.name
      )
    }
  },
};
</script>

<style scoped>
.SecondNavBar {
  display: flex;
  align-items: flex-start;
   min-width: 620px;
}
.barItem{
  color: rgb(96, 98, 102);
  font-size: 12px;
  border-radius: 20px;
  height: 20px;
  line-height: 20px;
  margin-top: 11px;
  padding: 1px 5px;
  text-align: center;
  box-sizing: content-box;
}
.active2{
  background-color: #fdf5f5;
  color: #ec4747;
  border-radius: 11px;
  box-sizing: border-box;
}
</style>