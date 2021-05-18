  // 上传图片的方法

  export default {
    data() {
      return {
        // 控制图片的
        dialogImageUrl: '',
        dialogVisible: false,
        photoForm: {
          name: '',
          path:''
        }
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传成功的钩子
      upload(res) {
        this.photoForm.path=res[0].path
      },
     async upPhoto () {
      let res = await  this.$axios.post('http://127.0.0.1:8080/blogs/photo/addPhoto.php', {
          title: this.photoForm.name,
          path: this.photoForm.path,         
      })
       console.log(res);
       if (res.data[0].status == 200) {
         this.$message({
          message: res.data[0].msg,
          type: "success",
          duration: 1000,
         })
        //跳转刷新一下
         this.$router.push('/adminHome');
       }
      }
    }
  }