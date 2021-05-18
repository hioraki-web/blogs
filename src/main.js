import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "../src/assets/css/base.less";
import "../src/assets/css/animate.min.css";
import axios from "axios";

import qs from "qs";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
// use
Vue.use(mavonEditor);

// 设置 axios，把请求数据在这里转换一下，参考官方文档： https://github.com/axios/axios
// axios.defaults.withCredentials = true
axios.defaults.transformRequest = [
  data => {
    return qs.stringify(data);
  }
];
// 往Vue原型上加axios
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App),
  data: {
    id: ""
  }
}).$mount("#app");
