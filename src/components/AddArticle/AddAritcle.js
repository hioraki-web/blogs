export default {
  data() {
    return {
      // 照片
      dialogImageUrl: "../../assets/img/2538772349388939.jpg",
      dialogVisible: false,
      // tab
      tabPosition: "left",
      // 表单内容
      aritcleForm: {
        title: "",
        intro: "",
        region: "",
        date1: "",
        path: "",
        id: ""
      },
      // 文章内容
      value: "",
      fileList: [],
      classIfy: [],
      id: ""
    };
  },
  created() {
    this.getClassIfy();
  },
  methods: {
    // 表单重置
    resetForm() {
      // this.$refs[formName].resetFields();
      this.$refs.aritcleForm.resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传成功的钩子
    upload(res) {
      this.aritcleForm.path = res[0].path;
    },
    async getClassIfy() {
      let res = await this.$axios.post(
        "http://localhost:8080/blogs/classIfy/classIfy.php"
      );
      // console.log(res);
      this.classIfy = res.data;
    },
    async subpost() {
      let res = await this.$axios.post(
        `http://localhost:8080/blogs/article/articleAdd.php`,
        {
          title: this.aritcleForm.title,
          intro: this.aritcleForm.intro,
          region: this.aritcleForm.region,
          date1: this.aritcleForm.date1,
          path: this.aritcleForm.path,
          content: this.value
        }
      );
      console.log(res);
      if (res.data[0].status == 200) {
        this.$message({
          message: "上传成功",
          type: "success",
          duration: 1000
        });
        // 重置
        this.value = "";
        this.resetForm("aritcleForm");
        this.$router.push("/adminHome");
      }
    }
    // 修改任务
  }
};
