// @ is an alias to /src
import "../../assets/font/iconfont.css";
export default {
  name: "Home",
  data() {
    return {
      input3: "",
      //控制音频的播放
      playing: false,
      playIocn: true,
      playPaues: false,
      // 控制logo 旋转
      isroter: false,
    };
  },
  methods: {
    // 切换
    startPlayOrPause() {
      return this.playing ? this.pause() : this.play();
    },
    // 视频播放
    play() {
      this.$refs.audio.play();
      this.playing = true;
      this.playIocn = !this.playIocn;
      this.playPaues = !this.playPaues;
      this.isroter = !this.isroter;
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
      this.playing = false;
      this.playIocn = !this.playIocn;
      this.playPaues = !this.playPaues;
      this.isroter = !this.isroter;
    },
    // 音频结束
    overAudio() {
      // console.log('结束了');
      this.playIocn = !this.playIocn;
      this.playPaues = !this.playPaues;
      this.isroter = !this.isroter;
      this.playing = false;
      this.$refs.audio.load();
    },
    // 用户退出功能
    async userEsc() {
      // 1.给个提示框
      try {
        await this.$confirm("此操作将退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        // 退出
        // 1.提示
        this.$message({
          type: "success",
          message: "退出成功",
        });
        // 2 清楚本地存储库
        localStorage.removeItem("session");
        // 3返回login页面
        this.$router.push("/login");
      } catch (error) {
        this.$message({
          type: "info",
          message: "取消成功",
        });
      }
    },
  },
};