<template>
  <div class="HomeHeader">
    <!-- 暂时使用一下在线链接,等有空了在使用项目包 -->
    <link
      rel="stylesheet"
      href="//at.alicdn.com/t/font_2971215_gi5n5e63rb.css"
    />

    <div class="ul">
      <div class="title">
        <img src="../../../assets/img/wyy.png" class="img" />
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

      <el-row class="elrow">
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
      <div @click="loginVisible = true" class="li2">
        <div class="avatar">
          <img class="img33" 
          v-if="userInfo.avatarUrl" 
          :src="userInfo.avatarUrl"
          />
          <img 
          v-else 
          class="img2" 
          src="../../../assets/img/test.jpg"
          />
        </div>

        <div class="userName" v-if="userInfo.nickname">
          {{ userInfo.nickname }}
        </div>
        <div class="userName" v-else>点击头像登录</div>
      </div>
    </div>

    <!-- 这里是对话框的区域 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="400px">
      <span>听歌识曲的功能没有实现</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 登录的弹窗 -->
    <el-dialog title="手机号登录" :visible.sync="loginVisible" width="400px">
      <div>
        <div class="login">
          <el-form 
          ref="ruleForm" 
          label-width="100px" 
          class="demo-ruleForm">
            <el-form-item class="item" label="账号 :" prop="phone">
              <el-input
                class="input1"
                placeholder="请输入账号"
                clearable
                v-model="user.username"
                style="left:0;"
              ></el-input>
            </el-form-item>
            <el-form-item class="item" label="密码 :" prop="password2">
              <el-input
                class="input1"
                placeholder="请输入密码"
                v-model="user.password"
                clearable
                show-password
                style="left:0;"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="loginVisible = false">取 消</el-button>
          <el-button type="primary" @click="inputlogin">确 定</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 这个组件没有使用,因为数据传递的问题
import Login from "../../../components/login/Login";
export default {
  name: "HomeHeader",
  components: { Login },
  data() {
    return {
      isSearchPopShow: false,
      input: "",
      dialogVisible: false,
      //登录的弹窗是否可见
      loginVisible: false,

      user:{
        username: "",
        password: ""
      },

      //登录返回的所有数据
      loginData: {},
      //用户的信息
      userInfo:{}
    };
  },
  methods: {
    go(index) {
      window.history.go(index);
    },

    //登录
    async inputlogin() {
      let timestamp = Date.parse(new Date());
      const result = await this.$request("/login/cellphone", {
        params: {
          phone: this.user.username,
          password: this.user.password,
          withCredentials: true,
          timestamp,
        },
      });

      if (result.data.code == 200) {
        //把用户id报错到localStorage中
        window.localStorage.setItem("userId", result.data.profile.userId);
        this.$message.success("登录成功!");
        //修改vuex中的登录状态
        console.log(result);
        this.$store.commit("updataLoginState", true);
      } 
      else if (result.data.code == 400) {
        // 手机号错误
        this.$message.error("手机号错误!");
        return;
      } else if (result.data.code == 502) {
        // 密码错误
        this.$message.error("密码错误!");
        return;
      } else {
        // 登录失败，请稍后重试
        this.$message.error("登录失败，请稍后重试!");
        return;
      }

      // this.userInfo = result.data;
      this.loginData = result.data.profile
      this.userInfo = result.data.profile

      //重置表单
      this.user.username=''
      this.user.password=''

      this.loginVisible = false;
    },

    //获取当前用户的信息
    async getCurrentUserInfo(){
      var timestamp = Date.parse(new Date());
      let res = await this.$request("/user/account", {
        timestamp,
      });
      // console.log(res);

      if(res.data.profile!=null){
        this.userInfo = res.data.profile
        // console.log(this.userInfo);
        //更新登录状态
        this.$store.commit('updataLoginState',true)
        //将请求到的用户id存入localstorage
        window.localStorage.setItem('userId',res.data.profile.userId)

      }
      else{
        //未登录
        this.$store.commit("updataLoginState", false);
        // 如果localstorage存有userId就清除
        if (window.localStorage.getItem("userId")) {
          window.localStorage.removeItem("userId");
        }
      }
    },

  },
  created(){
    this.getCurrentUserInfo()
  }
};
</script>

<style scoped>
.HomeHeader {
  display: flex;
  align-items: center;
  min-width: 1366px;
  width: 100%;
  height: 100%;
  background-color: rgb(236, 65, 65);
}
.el-input {
  display: flex;
  align-items: center;
  height: 60px;
  position: absolute;
  top: 0;
  left: 280px;
  width: 200px;
}

.el-button {
  background-color: rgb(225, 62, 62);
  border: rgb(57, 175, 234);
}
.el-input__inner {
  background-color: rgb(225, 62, 62);
  border: rgb(234, 93, 57);
}
.ul {
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  position: relative;
  list-style: none;
  height: 60px;
  min-width: 780px;
}
.title {
  margin-right: 10px;
  font-size: 20px;
  color: white;
  font-weight: 700;
  padding: 5px 10px 0 10px;
  width: 120px;
  padding-bottom: 2px;
}
.jump {
  position: absolute;
  top: 0;
  left: 200px;
}
.el-icon-search {
  width: 1%;
}

.li2 {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  height: 60px;
  right: 50px;
  font-size: 13px;
  cursor: pointer;
}
.avatar {
  width: 30px;
  height: 60px;
  position: fixed;
  top: 0;
  right: 145px;
  padding-top: 10px;
}
.img33 {
  width: 100%;
  border-radius: 20px;
}
.img2 {
    width: 100%;
}
.userName {
  position: fixed;
  top: 0;
  right: 60px;
  color: white;
}
.elrow {
  position: absolute;
  top: 0;
  left: 500px;
}
.input1{
  display: block;
}
</style>