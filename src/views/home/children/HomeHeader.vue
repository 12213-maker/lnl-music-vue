<template>
  <div class="HomeHeader">
    <!-- 暂时使用一下在线链接,等有空了在使用项目包 -->
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/font_2971215_7pxuveb59xg.css"
    />

    <div class="ul">
      <div class="title">
        <img src="../../../assets/img/wyy.png" @click="" class="img" />
      </div>

      <div class="jump">
        <el-button circle type="primary" size="mini" @click="go(-1)">
          <i class="iconfont icon-arrow-left"></i>
        </el-button>
        <el-button circle type="primary" size="mini" @click="go(1)">
          <i class="iconfont icon-arrow-right"></i>
        </el-button>
      </div>
      <!-- 搜索框 -->
      <el-input
        size="mini"
        placeholder="输入搜索的音乐"
        clearable
        v-model="input"
      ></el-input>
      <el-row>
        <el-button
          circle
          size="mini"
          type="primary"
          @click="dialogVisible = true"
        >
          <i class="iconfont icon-listing-content"></i>
        </el-button>
      </el-row>

      <!-- 登录的部分 -->
      <div @click="loginClick" class="li2">
        <span style="color: white"> 登录/注册</span>
      </div>
    </div>

    <!-- 这里是对话框的区域 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="500px">
      <span>听歌识曲的功能没有实现</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      isSearchPopShow: false,
      input: "",
      dialogVisible: false,
    };
  },
  methods: {
    go(index) {
      window.history.go(index);
    },
    //手机号登录
    async loginClick() {
      let timestamp = Date.parse(new Date());

      //自定义配置新建一个axios实例
      // const instance = this.$http.create({
      //   baseURL:'http://localhost:3000',
      //   timeout:30000,//请求超过了三秒就会被中断
      //   withCredentials:true//表示跨域请求时是否需要使用凭证
      // })

      // const { data: res } = await instance.get('/login/cellphone',
      //   {
      //     params: {
      //       phone: "18980530858",
      //       password: "2822592790.lnl",
      //       withCredentials: true,
      //       timestamp,
      //     },
      //   }
      // );
      // if ((res.code == 200)) console.log(res);
      // console.log(res.profile);

      const result = await this.$request("/login/cellphone", {
        params: {
          phone: "18980530858",
          password: "2822592790.lnl",
          withCredentials: true,
          withCredentials:true,
          timestamp,
        },
      });
      console.log(result);
    },
  },
};
</script>

<style>
.HomeHeader {
  min-width: 1366px;
  width: 100%;
  height: 100%;
  background-color: rgb(236, 65, 65);
}
.el-input {
  width: 13%;
  padding: 0 10px;
}
.el-button {
  background-color: rgb(225, 62, 62);
  border: rgb(57, 175, 234);
}
.el-input__inner {
  background-color: rgb(225, 62, 62);
  border: rgb(57, 175, 234);
}
.ul {
  padding: 0;
  padding-left: 10px;
  margin: 0;
  display: flex;
  flex-direction: row;
  list-style: none;
}
.li2 {
  width: 8%;
  padding-left: 700px;
}
.title {
  margin-right: 10px;
  font-size: 20px;
  color: white;
  font-weight: 700;
  padding: 0 10px;
  width: 8%;
}
.jump {
  width: 6%;
  padding-left: 100px;
}
.el-icon-search {
  width: 1%;
}
.img {
  padding-top: 5px;
}
</style>