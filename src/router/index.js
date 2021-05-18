import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home/Home.vue";
import Login from "../views/Login/Login.vue";
// 引入管理员组件
import Admin from "../views/Admin/Admin.vue";
import AdminHome from "../components/Home-admin/AdminHome.vue";
// 照片上传组件
import Photo from "../components/Photo/Photo.vue";
import delPhoto from "../components/DelPhoto/delPhoto.vue";
//  文章组件
import AddAritcle from "../components/AddArticle/AddAritcle.vue";
import admArticle from "../components/admArticle/admArticle.vue";
import selArticle from "../components/selArticle/selAritcle.vue";
// 主页组件
import Index from "../views/Index/Index.vue";
// 云相册组件
import photoYun from "../views/photoYun/photoYun.vue";
// Vue分类组件
import ItemVue from "../views/Vue/Vue.vue";
// js分类组件
import Js from "../views/js/js.vue";
// 项目分类组件
import Items from "../views/items/items.vue";
// 详情页组件
import Details from "../views/details/details.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/index",
        name: "index",
        component: Index
      },
      {
        path: "/photoYun",
        name: "photoYun",
        component: photoYun
      },
      {
        path: "/vue",
        name: "Vue",
        component: ItemVue
      },
      {
        path: "/js",
        name: "js",
        component: Js
      },
      {
        path: "/items",
        name: "items",
        component: Items
      },
      {
        path: "/details",
        name: "details",
        component: Details
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },

  //后台管理
  {
    path: "/adminHome",
    name: "AdminHome",
    component: AdminHome,
    children: [
      { path: "/admin", name: "Admin", component: Admin },
      { path: "/photo", name: "Photo", component: Photo },
      { path: "/delPhoto", name: "Photo", component: delPhoto },
      { path: "/addAritcle", name: "AddAritcle", component: AddAritcle },
      { path: "/admArticle", name: "admArticle", component: admArticle },
      { path: "/selArticle", name: "selArticle", component: selArticle }
    ]
  }
];

// 导航守卫

const router = new VueRouter({
  routes
});
// 导航守卫
router.beforeEach((to, from, next) => {
  // ...
  console.log(to);
  if (
    to.path == "/login" ||
    to.path == "/home" ||
    to.path == "/index" ||
    to.path == "/index" ||
    to.path == "/photoYun" ||
    to.path == "/vue" ||
    to.path == "/js" ||
    to.path == "/items" ||
    to.path == "/details"
  ) {
    next();
  } else {
    const key = localStorage.getItem("session");
    // 如果key不存在 说明没登陆 去登录
    if (!key) {
      next({ name: "Login" });
    }
    next();
  }
});
export default router;
