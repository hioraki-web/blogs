<template>
  <el-row justify="center" type="flex" align="middle" v-if="true">
    <el-col :span="10">
      <el-form
        :model="userFrom"
        :rules="rules"
        ref="userForm"
        label-width="100px"
        class="demo-ruleForm backg animate__animated animate__fadeInDown"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userFrom.userName"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="userFrom.password"></el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="success" @click="submitForm">登录</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      userFrom: {
        userName: "",
        password: "",
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 6, message: "长度在 4 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      //  console.log( this.$refs.userForm);
      this.$refs.userForm.validate(async (valid) => {
        if (!valid) {
          return;
        }
        //  如果通过表单检测
        // 发送请求到后台
        let res = await this.$axios.post("http://127.0.0.1:8080/blogs/admin/login.php", {
          userName: this.userFrom.userName,
          password: this.userFrom.password,
        });
        // console.log(this.$axios);
        console.log(res);
        // 登录成功
        if (res.data[0].status == 200) {
          // 给个消息提示并跳转
          this.$message({
            message: res.data[0].message,
            type: "success",
            duration: 1000,
          });
          // 存储session
          localStorage.setItem("session", res.data[0].session);
          // localStorage.setItem("lastname", "Smith");
          // 跳转home页
          this.$router.push("/adminHome");
        } else {
          // 提示错误信息
          this.$message({
            message: res.data[0].message,
            type: "success",
            duration: 1000,
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="less">
.el-row {
  height: 100%;
  form {
    padding: 50px 30px 50px 10px;
    input {
      background: none;
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
.backg {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
