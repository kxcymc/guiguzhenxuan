import { createRouter, createWebHistory } from "vue-router";
import constantRoutes from "./routes";
import pinia from "@/store";
import useUserStore from "@/store/modules/user";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

// 路由鉴权：用守卫设置路由被访问的各种条件
// 1. 用户未登录时，只能访问/login，其余路由重定向
// 2. 用户登录后，不能访问/login，其余路由重定向到当前路由

NProgress.configure({ showSpinner: false });

const userStore = useUserStore(pinia); // 组件外要带上大仓库

// 全局前置守卫
router.beforeEach(async (to, from) => {
  NProgress.start();
  const token = userStore.token;
  if (token) {
    if (to.path === "/login") {
      return { path: "/" };
    } else {
      if (userStore.username) return true; // 继续导航
      else {
        // console.log(userStore.username);
        try {
          await userStore.getInfo();
          return true; // 继续导航
        } catch (error) {
          userStore.logout();
          return { path: "/login", query: { redirect: to.path } };
        }
      }
    }
  } else {
    if (to.path === "/login" || to.path === "/404") return true; // 继续导航
    else return { path: "/login", query: { redirect: to.path } };
  }
});

// 全局后置守卫
router.afterEach((to, from) => {
  if (to.meta.title === '登录') document.title = '后台管理系统';
  else document.title = "后台系统-" + to.meta.title;
  NProgress.done();
});

export default router;
