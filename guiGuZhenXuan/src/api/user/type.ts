export interface loginForm {
  username: string;
  password: string;
}

interface dataType {
  token: string;
}

export interface loginResponseForm {
  code: number;
  data: dataType;
}

interface userInfo {
  userId: number;
  avatar: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
}

interface user {
  checkUser: userInfo;
}

export interface userResponseData {
  code: number;
  data: user;
}
