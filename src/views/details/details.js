import { markdown } from "markdown";
export default {
  data() {
    return {
      // 文章数据
      article: [],
      html: "",
      id: ""
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      this.id = +this.$route.query.id;
      let res = await this.$axios.get(
        `http://localhost:8080/blogs/article/selActicle.php?id=${this.id}`
      );
      console.log(res);
      this.article = res.data;
      this.html = markdown.toHTML(res.data[0].contents);
    }
  }
};
