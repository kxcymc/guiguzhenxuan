import myAxios from "@/utils/myAxios";
import type { loginForm, loginResponseForm, userResponseData } from "./type.ts";

// mock接口
enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
}

// 暴露接口函数
export const reqLogin = (data: loginForm) =>
  myAxios.post<unknown, loginResponseForm>(API.LOGIN_URL, data);
export const reqUserInfo = () =>
  myAxios.get<unknown, userResponseData>(API.USERINFO_URL);
