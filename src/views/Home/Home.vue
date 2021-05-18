<template>
  <el-row type="flex" justify="center" class="contener">
    <el-col :span="22">
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- 名字 -->
          <el-row>
            <el-col :span="6">
              <h1>smile</h1>
            </el-col>

            <!-- 搜索框 -->
            <el-col :span="5" class="input">
              <el-input
                placeholder="请输入内容"
                v-model="input3"
                class="input-with-select"
              >
                <el-button slot="append" icon="el-icon-search" class="btn"></el-button>
              </el-input>
            </el-col>

            <!-- 音乐 -->
            <el-col :span="0">
              <audio
                src="http://127.0.0.1:8080/blogs/media/HITA - 眉间雪.5c6929f4.mp3"
                ref="audio"
                @ended="overAudio"
              ></audio>
            </el-col>

            <!-- 控件 -->
            <el-col :span="6" :push="4">
              <el-row>
                <!-- 图片 -->
                <el-col :span="4">
                  <div class="demo-type">
                    <el-avatar :size="40" src="../../assets/img/2538772349388939.jpg">
                      <img
                        src="../../assets/img/2538772349388939.jpg"
                        :class="{ roter: isroter }"
                      />
                    </el-avatar>
                  </div>
                </el-col>
                <!-- 播放 -->
                <el-col :span="6" class="play">
                  <span>眉间雪</span>
                  <div>
                    <span class="iconfont icon-tushujiemianshangyiqu40"></span>
                    <span
                      :class="{
                        'el-icon-video-play': playIocn,
                        'el-icon-video-pause': playPaues,
                      }"
                      @click="startPlayOrPause"
                    ></span>
                    <span class="iconfont icon-tushujiemianxiayiqu40"></span>
                  </div>
                </el-col>
              </el-row>
            </el-col>

            <!-- 个人信息 -->
            <el-col :span="3" :push="4">
              <span class="esc" @click="userEsc">退出</span>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <!-- 侧边栏 -->
          <el-aside width="250px">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="transparent"
              text-color="#fff"
              active-text-color="#FAEBD7"
              :router="true"
            >
              <!-- 首页 -->
              <el-menu-item index="/index">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <!-- 云相册 -->
              <el-menu-item index="/photoYun">
                <i class="el-icon-picture-outline"></i>
                <span slot="title">云相册</span>
              </el-menu-item>
              <!-- 文章分类页 -->
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>文章分类</span>
                </template>
                <!-- vue分类 -->
                <el-menu-item index="/vue">
                  <span slot="title">Vue</span>
                </el-menu-item>
                <!-- js分类 -->
                <el-menu-item index="/js">
                  <span slot="title">js</span>
                </el-menu-item>
                <!-- 项目总结 -->
                <el-menu-item index="/items">
                  <span slot="title">项目总结</span>
                </el-menu-item>
              </el-submenu>
              <!-- 跳转后台 -->
              <el-menu-item index="/adminHome">
                <i class="el-icon-setting"></i>
                <span slot="title">后台管理</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <!-- 预留一个出口 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
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
</script>

<style lang="less">
//  头部样式
.el-header {
  background-color: rgba(65, 71, 83, 0.9);
  border-bottom: 1px solid #fff;
  h1 {
    font-size: 28px;
    line-height: 59px;
    color: #d4d4d4;
  }
  .input {
    line-height: 59px;
    input {
      background-color: transparent;
      color: #fff;
    }
    input:focus {
      border: 1px solid #fff;
    }
    .btn,
    .el-input-group__append {
      background-color: transparent;
    }
    .el-icon-search {
      color: #000;
    }
  }
  //  music
  .demo-type {
    margin-top: 10px;
  }
  // 播放样式
  .play {
    margin-top: 5px;
    font-size: 18px;
    color: #a6a8b1;
    text-align: center;
    span {
      padding: 0 3px;
      cursor: pointer;
    }
  }
  // 退出样式
  .esc {
    line-height: 59px;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }
}
//  侧边栏样式
.el-aside {
  background-color: rgba(0, 0, 0, 0.5);
  //  background-color:#F0F8FF;
  border-right: 1px solid #fff;
  .el-menu {
    border: none;
  }
}
.home,
.el-container {
  height: 100%;
}
.el-main {
  background-color: rgba(255, 255, 255, 0.6);
}
@keyframes roter {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.roter {
  // animation: rorter 5s linear infinite;
  animation: roter 5s linear infinite;
}
</style>
