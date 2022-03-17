<template>
  <div>我是videoDetail</div>
</template>

<script>
export default {
  name: "VideoDetail",
  data() {
    return {};
  },
  methods: {
    // 根据传来的id查询mv详情
    async getMvDetail() {
      let res = await this.$request("/mv/detail", {
        mvid: this.$route.params.id,
      });
        console.log(res);
    //   this.videoInfo = res.data.data;
    },
    // 请求mv地址
    async getMvUrl() {
      let res = await this.$request("/mv/url", { id: this.$route.params.id });
    //   this.videoUrl = res.data.data.url;
     console.log(res);
    },
    // 请求相关视频
    async getRelatedVideo() {
      let res = await this.$request("/related/allvideo", {
        id: this.$route.params.id,
      });
      console.log(res);
    //   this.relatedVideo = res.data.data;
    },
  },
  created() {
    this.getMvDetail();
    this.getMvUrl()
    this.getRelatedVideo()
  },
};
</script>

<style>
</style>