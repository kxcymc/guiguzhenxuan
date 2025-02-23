import { createApp } from "vue";
import App from "@/App.vue";
//清除默认样式
import "@/styles/reset.scss";
//配置svg
import "virtual:svg-icons-register";
//配置全局组件
import globalComponent from "@/components";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 如果打包zhcn失败，加上注释： //@ts-ignore
import zhCn from "element-plus/es/locale/lang/zh-cn";
// import router from "@/router";
import pinia from "@/store";
import router from '@/router'

const app = createApp(App);
//配置element-plus
app.use(ElementPlus, {
  locale: zhCn,
});

//获取环境变量
// console.log(import.meta.env);

app.use(globalComponent);
app.use(router);
app.use(pinia);
app.mount("#app");
