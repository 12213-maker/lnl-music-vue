<template>
  <div>
    <el-row
      class="infiniteList"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-distance="200"
      :infinite-scroll-immediate="false"
      :gutter="20"
    >
      <el-col
        @click="clickListCardItem1(item.id)"
        v-for="item in musicListData"
        :key="item.id"
        :span="4"
      >
        <div class="grid-content bg-purple">
          <img :src="item.picUrl" alt="" />
        </div>
        <!-- <div class="title">{{item.name}}</div> -->
        <span class="span1">{{ item.name }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ListCard",
  props: ["musicListData"],
  data() {
    return {
      // 无线滚动是否禁用
      disabled: true,
    };
  },
  methods: {
    //
    clickListCardItem1(id) {
      this.$bus.$emit('getdata',id)
    },
    //无限滚动的方法
    load() {
      // this.$message.info('我到底了')
    },
  },
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  cursor: pointer;
  border-radius: 4px;
  margin: 10px 3px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.infiniteList {
  overflow: hidden;
}
img {
  width: 100%;
  border-radius: 10px;
}
.span1 {
  font-size: 15px;
  display: inline-block;
  height: 15px;
  line-height: 15px;

  /* 有一行出去了 */
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>