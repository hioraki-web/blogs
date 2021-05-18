export default {
  data() {
    return {
      admTable: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      total: "",
      pageNum: 1
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle(page = 1) {
      let res = await this.$axios.get(
        `http://localhost:8080/blogs/article/getArticle.php?page=${page}`
      );
      console.log(res);
      if (res.data[0].status == 200) {
        res.data[1].forEach(v => {
          v.date = v.date.substring(0, 10);
          v.contents = v.contents.substring(0, 12) + "....";
        });
        this.admTable = res.data[1];
        this.total = res.data[2][0].total;
      }
    },
    // 分页功能
    getArticlePage(num) {
      this.getArticle(num);
    },
    // 删除
    async delArticle(row) {
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        const { id } = row;
        // console.log(id);
        // 请求删除数据
        let res = await this.$axios.get(
          `http://localhost:8080/blogs/article/delAritcle.php?id=${id}`
        );
        // console.log(res);
        if (res.data[0].status == 200) {
          // 提示
          this.$message({
            type: "success",
            message: "删除成功",
            duration: 1000
          });
          // 刷新页面
          this.pageNum = 1;
          this.getArticle();
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    },
    // 修改
    alters(row) {
      const { id } = row;
      console.log(id);
      this.$router.push(`/selArticle?id=${id}`);
    }
  }
};
