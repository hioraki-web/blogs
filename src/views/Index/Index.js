export default {
  data() {
    return {
      article: [
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
    this.getArticle();
  },
  methods: {
    async getArticle(page = 1) {
      let res = await this.$axios.get(
        `http://127.0.0.1:8080/blogs/article/getArticle.php?page=${page}`
      );
      console.log(res);
      if (res.data[0].status == 200) {
        this.article = res.data[1];
        this.total = +res.data[2][0].total;
      }
    },
    getPage(page) {
      //   console.log(page);
      this.getArticle(page);
    },
    detaile(id) {
      this.$router.push(`/details?id=${id}`);
    }
  }
};
