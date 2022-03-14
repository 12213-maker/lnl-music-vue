<template>

  <!-- 这个组件没有作用,因为参数的问题,太失败了 -->
  <div class="login">
    <el-form
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item class="item" label="账号 :">
        <el-input 
        class="input1"
         placeholder="请输入账号" 
         clearable
         v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item class="item" label="密码 :">
        <el-input
        class="input1" 
          placeholder="请输入密码"
          v-model="userInfo.password"
          clearable
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userInfo: {
        username: "18980530858",
        password: "2822592790.lnl"
      },

      //为了不报错暂时写上去
      ruleForm:''
    };
  },
  methods:{
    clicklogin(){
      this.$emit('clicklogin',this.userInfo.username,this.userInfo.password)
    }
  },
  beforeDestroy() {
    console.log(this.userInfo.username,this.userInfo.password);
    // this.clicklogin()
  },
};
</script>

<style scoped>

</style>