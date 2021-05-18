export default {
  data() {
    return {
      photo: [
        {
          id: "",
          path: "",
          title: ""
        }
      ],
      total: 5
    };
  },
  created() {
    this.getphoto();
  },
  methods: {
    async getphoto(page = 1) {
      let res = await this.$axios.get(
        `http://127.0.0.1:8080/blogs/photo/getPhoto.php?page=${page}`
      );
      console.log(res);
      if (res.data[0].status == 200) {
        this.photo = res.data[1];
        this.total = +res.data[2][0].total;
      }
    },
    getPage(page) {
      //   console.log(page);
      this.getphoto(page);
    }
  }
};
