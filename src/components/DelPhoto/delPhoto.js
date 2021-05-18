export default {
  data() {
    return {
      delPhotoData: [
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
    this.getPhotos();
  },
  methods: {
    async getPhotos(page = 1) {
      let res = await this.$axios.get(
        `http://127.0.0.1:8080/blogs/photo/qyPhoto.php?page=${page}`
      );
      console.log(res);
      if (res.data[0].status == 200) {
        res.data[1][0].path
          ? (res.data[1][0].path = res.data[1][0].path.substr(29, 19))
          : "";
        res.data[1][1]
          ? (res.data[1][1].path = res.data[1][1].path.substr(29, 19))
          : "";
        this.delPhotoData = res.data[1];
        // console.log(res1);
        this.total = res.data[2][0].total;
      }
    },
    // 改变页码
    setPage(num) {
      this.getPhotos(num);
      this.pageNum = num;
    },
    //删除照片
    async delPhoto(row) {
      try {
        await this.$confirm("此操作将永久删除该照片, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });

        const { id } = row;
        console.log(id);
        let res = await this.$axios.get(
          `http://127.0.0.1:8080/blogs/photo/delPhoto.php?id=${id}`
        );
        // console.log(res);
        if (res.data[0].status == 200) {
          // 消息提示
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.pageNum = 1;
          this.getPhotos();
          // 跳回首页
          //   this.getPhotos(this.num);
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      }
    }
  }
};
