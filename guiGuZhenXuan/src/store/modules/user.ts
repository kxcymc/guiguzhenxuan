import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user";
import type {
  loginForm,
  loginResponseForm,
  userResponseData,
} from "@/api/user/type";
import constantRoutes from "@/router/routes";
import type { RouteRecordRaw } from "vue-router";

type fail = {
  message: string;
};

type loginFailForm = {
  code: number;
  data: fail;
};

// 存储用户相关信息的仓库
const useUserStore = defineStore(
  "User",
  () => {
    const menuRoutes: RouteRecordRaw[] = ref<RouteRecordRaw[]>(constantRoutes);
    const token: Ref = ref<string>("");
    const username: Ref = ref<string>("");
    const avatar: Ref = ref<string>("");

    async function login(data: loginForm) {
      const res: loginResponseForm | loginFailForm = await reqLogin(data);
      if (res.code === 200) {
        token.value = res.data.token as string;
        return "ok";
      } else {
        return Promise.reject(new Error(res.data.message));
      }
    }
    async function getInfo() {
      const res: userResponseData = await reqUserInfo();
      // console.log(res);
      if (res.code === 200)
        [username.value, avatar.value] = [
          res.data.checkUser.username,
          res.data.checkUser.avatar,
        ];
      else {
        return Promise.reject(new Error(res.data.message));
      }
    }
    function logout() {
      token.value = "";
      username.value = "";
      avatar.value = "";
    }

    return { menuRoutes, token, username, avatar, login, getInfo, logout };
  },
  {
    // 配置持久化选项
    persist: {
      key: "User",
      storage: sessionStorage,
      pick: ["menuRoutes", "token", "username", "avatar"], // 持久化的变量
    },
  }
);

export default useUserStore;
