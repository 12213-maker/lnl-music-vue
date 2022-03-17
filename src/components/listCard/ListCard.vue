<template>
  <div class="all">
    <div
      v-if="this.type === 'singer' || this.type === 'person'"
      class="container"
    >
      <div
        class="singeritem"
        v-for="(item, index) in musicListData"
        @click="clickListCardItem1(item.id)"
        :key="index"
      >
        <div class="singeritem_box">
          <div class="singerimg1">
            <img
              :src="(item.picUrl || item.coverImgUrl) + '?param=400y400'"
              alt=""
            />
          </div>
          <div class="singerplay_count">30万+</div>
        </div>
        <div class="singer_item_discribe">{{ item.name || description }}</div>
      </div>
    </div>

    <div
      v-else-if="type === 'video'"
      class="container"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-distance="300"
      :infinite-scroll-immediate="false"
    >
      <div
        class="item"
        v-for="(item, index) in musicListData"
        :key="index"
        @click="clickListCardItem1(item.vid || item.data.vid, index, item.type)"
      >
        <div class="item_box">
          <div class="img1"><img :src="item.data.coverUrl" alt="" /></div>
          <div class="play_count">30万+</div>
          <div class="play_time">4:32</div>
        </div>
        <div class="bottom">
          <div class="item_discribe">
            {{ item.data.description || item.data.title }}
          </div>
          <div class="author">by:{{ item.data.creator.nickname }}</div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="ablum"
      v-infinite-scroll="load"
      :infinite-scroll-disabled="disabled"
      :infinite-scroll-distance="300"
      :infinite-scroll-immediate="false"
      ref="listCard"
    >
      <div
        class="item2"
        v-for="(item, index) in musicListData"
        :key="index"
        @click="clickListCardItem(item.id)"
      >
        <div class="item_box2">
          <div class="img2">
            <img
              :src="(item.picUrl || item.coverImgUrl || item.coverUrl) + '?param=400y400'"
              alt=""
            />
          </div>
        </div>
        <div class="bottom">{{ item.name ||item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCard",
  props: ["musicListData", "type", "isLoad"],
  data() {
    return {
      // 无线滚动是否禁用
      disabled: true,
      description: "暂无介绍",
    };
  },
  methods: {
    //
    clickListCardItem1(id, index, type) {
      // let {data:{vid:id}} = item
      // 下面这个不知道有没有起作用
      this.$bus.$emit("getdata", id);
      // this.$emit("clickListCardItem", id);
      this.$emit("clickListCardItem", { id, index, type });
      // console.log(item);
    },
    //无限滚动的方法 上拉触底触发
    load() {
      setTimeout(() => {
        //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.$emit("bottomLoad");
      }, 500);
      // 触发load后加载数据 期间不允许再次触发load事件
      this.disabled = true;
    },
  },
  created() {
    // console.log(this.musicListData);
    // console.log(this.type);
  },
  watch: {
    //数据更新之后再次触发load事件
    musicListData() {
      if (this.isLoad) {
        if (this.musicListData.length != 0) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  padding-bottom: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .item {
    margin: 10px;
    height: 15vw;
    width: 20vw;
    overflow: hidden;
    border-radius: 10px;
    min-width: 157px;
    min-height: 115px;
    position: relative;
    .item_box {
      width: 100%;
      position: relative;
      .img1 {
        position: absolute;
        top: 0;
        width: 100%;
        img {
          border-radius: 10px;
          width: 100%;
        }
      }
      .play_count {
        color: white;
        padding: 0;
        margin: 0;
        width: 50px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 13px;
      }
      .play_time {
        padding: 0;
        margin: 0;
        width: 50px;
        height: 30px;
        line-height: 30px;
        position: absolute;
        top: 9vw;
        right: 0;
        color: white;
        font-size: 13px;
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      height: 26%;
      .item_discribe {
        width: 100%;
        height: 50%;
        line-height: 30px;
        text-align: left;
        color: rgb(55, 55, 55);
        font-size: 14px;
        // 单行省略
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .author {
        line-height: 20px;
        width: 100%;
        height: 50%;
        text-align: left;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgb(223, 207, 223);
      }
    }
  }
}

.singeritem {
  // background-color: aqua;
  width: 15vw;
  margin: 10px;
  border-radius: 10px;
  min-width: 157px;
  min-height: 115px;
  .singeritem_box {
    position: relative;
    .singerimg1 {
      line-height: 0;
      img {
        width: 100%;
        border-radius: 10px;
      }
    }

    .singerplay_count {
      color: white;
      padding: 0;
      margin: 0;
      width: 50px;
      height: 30px;
      line-height: 30px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 13px;
    }
  }

  .singer_item_discribe {
    width: 100%;
    height: 50%;
    line-height: 30px;
    text-align: left;
    color: rgb(55, 55, 55);
    font-size: 14px;
    // 多行省略
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.ablum {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 120px;
  justify-content: center;
  align-items: center;
  padding: 0 60px;
  padding-bottom: 120px;
  .item2 {
    margin: 10px;
    height: 15.7vw;
    width: 13vw;
    overflow: hidden;
    // border-radius: 10px;
    min-width: 155px;
    min-height: 175px;
    position: relative;
    // background-color: pink;
    display: flex;
    flex-direction: column;
    .item_box2 {
      height: 13vw;
      .img2 {
        height: 100%;
        img {
          height: 100%;
          border-radius: 10px;
          min-width: 155px;
          min-height: 155px;
        }
        
      }
    }
    .bottom {
      // background-color: aquamarine;
      line-height: 15px;
      font-size: 13px;
      text-align: left;
      padding-top: 10px;

      overflow: hidden;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
}
</style>