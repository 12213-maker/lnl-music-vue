<template>
<!-- 创建这个组件是为了体现组件的复用 -->

  <div class="navBarContainer">
      <div 
      class="barItem"
      :class="activeIndex==index?'active':''"
      v-for="(item,index) in navBarItem"
      :key="index"
      @click="clickBarItem(item.path,index)"
      >
        {{item.name}}
      </div>
  </div>
</template>

<script>
export default {
    name:"NavBar",
    // 子组件通过props接收父组件传过来的数据
    props:['navBarItem'],
    data(){
        return {
            // 现在激活的子页面
            activeIndex:0,
        }
    },
    created(){
        
    },
    methods:{
        clickBarItem(path,index){
            // 本来就是在这个页面,不用再进行什么操作了
            if(this.activeIndex==index)
            return;

            // 要实现点击之后跳到相应的页面/discover/children/Person
            this.$emit('clickBarItem',path)
            //修改激活的子页面
            this.activeIndex=index

        }
    }
}
</script>

<style>
.navBarContainer{
    padding-left: 15px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 40px;
}
.barItem{
    height: 35px;
    margin: 0 10px;
    font-size: 14px;
    cursor: pointer;
    line-height: 35px;
}
.active{
    font-weight: 600;
    border-bottom: rgb(236, 65, 65) 3px solid;
    box-sizing: border-box;
    transform: translateY(-4px);
}
</style>