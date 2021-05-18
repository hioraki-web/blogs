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
        path: ""
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
    this.getAritcle();
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
      console.log(res);
      this.aritcleForm.path = res[0].path;
    },
    async getClassIfy() {
      let res = await this.$axios.post(
        "http://localhost:8080/blogs/classIfy/classIfy.php"
      );
      console.log(res);
      this.classIfy = res.data;
    },
    async subpost() {
      let res = await this.$axios.post(
        `http://127.0.0.1:8080/blogs/article/updArticle.php`,
        {
          title: this.aritcleForm.title,
          intro: this.aritcleForm.intro,
          region: this.aritcleForm.region,
          date1: this.aritcleForm.date1,
          path: this.aritcleForm.path,
          content: this.value,
          id: this.id
        }
      );
      console.log(res);
      if (res.data[0].status == 200) {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000
        });
        // 重置
        this.value = "";
        this.resetForm("aritcleForm");
        this.$router.push("/adminHome");
      }
    },
    // 修改
    async getAritcle() {
      // console.log(1);
      // console.log(this.value);
      // console.log(this.$route.query.id);
      if (!this.$route.query.id) {
        return;
      }
      this.id = +this.$route.query.id;
      let res = await this.$axios.get(
        `http://127.0.0.1:8080/blogs/article/selActicle.php?id=${this.id}`
      );
      console.log(res, 1111);
      this.aritcleForm.title = res.data[0].title;
      this.aritcleForm.intro = res.data[0].intro;
      this.aritcleForm.region = res.data[0].name;
      this.aritcleForm.date1 = res.data[0].date;
      this.fileList = [{ name: "", url: res.data[0].photo }];
      this.value = res.data[0].contents;
    }
  }
};
