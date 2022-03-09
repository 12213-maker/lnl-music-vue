<template>
  <div class="sortBox">
    <el-popover
      placement="bottom-start"
      title="全部歌单"
      width="297"
      trigger="click"
      v-model="isSortPopShow"
      @show="showSortPop"
    >
      <div class="SortBox1" slot="reference">
        {{ currentTag.name }}
        <i class="iconfont icon-arrow-right"></i>
      </div>

      <div class="tips" v-if="sortList.length == 0">正在加载分类数据</div>
      <div class="sortList" v-else>
        <div
          v-for="(item, index) in sortList"
          :key="index"
          class="sortItem"
          :class="currentTag.name == item.name ? 'currentItem' : ''"
          @click="clickItem(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "SortBox",
  props: ["sortList", "currentTag"],
  data() {
    return {
      // 是否显示分类选择框
      isSortPopShow: false,
    };
  },
  methods: {
    //左边改变了--正在激活的十个歌单中的其中一个
    clickItem(item) {
      this.$emit("clickSortBoxItem", item);
      this.isSortPopShow = false;
    },
    //点击之后刷新数据
    showSortPop() {
      //判断是否有sortList数据
      if(this.sortList.length===0)
      this.$emit("getSortList");
    },
  },
};
</script>

<style scoped>
.sortBox {
  margin-top: 10px;
  line-height: 0px;
  text-align: start;
  width: 117px;
  overflow: hidden;
  text-align: center;
}
.sortBox:hover {
  background-color: rgb(242, 242, 242);
  border-radius: 20px;
}
.btn1 {
  padding: 3px 3px 3px 9px;
  background-color: white;
  border-radius: 20px;
  border: 1px solid rgb(221, 221, 221);
}
.el-button:focus,
.el-button:hover {
  color: rgb(236, 65, 65);
}
.SortBox1 {
  height: 23px;
  line-height: 20px;
  box-sizing: border-box;
  border: 1px solid rgb(216, 216, 216);
  color: rgb(100, 98, 98);
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  padding: 0 11px;
}
.sortList {
  /* background-color: rgb(130, 130, 194); */
  height: 200px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  border-top: rgb(216, 216, 216) 1px solid;
}
.el-popover {
  padding: 0;
}
.sortItem {
  /* background-color: burlywood; */
  width: 70px;
  text-align: center;
  font-size: 13px;
  margin-top: 10px;
  cursor: pointer;
  padding: 2px 0;
}
.currentItem {
  color: #eb4f4f;
  background-color: #fcebeb;
  border-radius: 20px;
}
</style>