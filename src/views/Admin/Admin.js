export default {
  data() {
    return {
      adminUserData: [
        {
          date: "2016-05-02",
          username: "王小虎",
          password: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {
    // 发送请求像后台取数据
    this.getAdminUser();
  },
  methods: {
    // 请求管理用户数据
    async getAdminUser() {
      let res = await this.$axios.get(
        "http://127.0.0.1:8080/blogs/admin/adUser.php"
      );
      // this.data = res.
      if (res.data[0].status == 200) {
        this.adminUserData = res.data[1];
      }
    },
    //删除用户
    async delUser(row) {
      // console.log(row);
      try {
        await this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        // console.log("确定", row);
        const { id } = row;
        let res = await this.$axios.get(
          `http://127.0.0.1:8080/blogs/admin/delUser.php?id=${id}`
        );
        console.log(res);
        if (res.data[0].status == 200) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        }
        this.getAdminUser();
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    }
  }
};
